/* Copyright (c) 2020 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "mises/components/ipfs/mises_ipfs_client_updater.h"

#include "base/files/file_enumerator.h"
#include "base/files/file_path.h"
#include "base/files/file_util.h"
#include "base/logging.h"
#include "base/task/task_runner.h"
#include "base/task/thread_pool.h"
#include "mises/components/ipfs/ipfs_utils.h"
#include "components/component_updater/component_updater_service.h"

namespace ipfs {

std::string MisesIpfsClientUpdater::g_ipfs_client_component_id_(
    kIpfsClientComponentId);
std::string MisesIpfsClientUpdater::g_ipfs_client_component_base64_public_key_(
    kIpfsClientComponentBase64PublicKey);

MisesIpfsClientUpdater::MisesIpfsClientUpdater(
    MisesComponent::Delegate* delegate,
    const base::FilePath& user_data_dir)
    : MisesComponent(delegate),
      task_runner_(
          base::ThreadPool::CreateSequencedTaskRunner({base::MayBlock()})),
      registered_(false),
      user_data_dir_(user_data_dir),
      weak_ptr_factory_(this) {}

MisesIpfsClientUpdater::~MisesIpfsClientUpdater() = default;

void MisesIpfsClientUpdater::Register() {
  if (registered_)
    return;

  MisesComponent::Register(kIpfsClientComponentName,
                           g_ipfs_client_component_id_,
                           g_ipfs_client_component_base64_public_key_);
  if (!updater_observer_.IsObservingSource(this))
    updater_observer_.Observe(this);
  registered_ = true;
}

namespace {

base::FilePath InitExecutablePath(const base::FilePath& install_dir) {
  base::FilePath executable_path;
  base::FileEnumerator traversal(install_dir, false,
                                 base::FileEnumerator::FILES,
                                 FILE_PATH_LITERAL("go-ipfs_v*"));
  for (base::FilePath current = traversal.Next(); !current.empty();
       current = traversal.Next()) {
    base::FileEnumerator::FileInfo file_info = traversal.GetInfo();
    if (!ipfs::IsValidNodeFilename(file_info.GetName().MaybeAsASCII()))
      continue;
    executable_path = current;
    break;
  }

  if (executable_path.empty()) {
    LOG(ERROR) << "Failed to locate Ipfs client executable in "
               << install_dir.value().c_str();
    return base::FilePath();
  }

#if BUILDFLAG(IS_POSIX)
  // Ensure that Ipfs client executable has appropriate file
  // permissions, as CRX unzipping does not preserve them.
  // See https://crbug.com/555011
  if (!base::SetPosixFilePermissions(executable_path, 0755)) {
    LOG(ERROR) << "Failed to set executable permission on "
               << executable_path.value().c_str();
    return base::FilePath();
  }
#endif  // BUILDFLAG(IS_POSIX)

  return executable_path;
}

void DeleteDir(const base::FilePath& path) {
  base::DeletePathRecursively(path);
}

}  // namespace

void MisesIpfsClientUpdater::SetExecutablePath(const base::FilePath& path) {
  executable_path_ = path;
  for (Observer& observer : observers_)
    observer.OnExecutableReady(path);
}

base::FilePath MisesIpfsClientUpdater::GetExecutablePath() const {
  return executable_path_;
}

void MisesIpfsClientUpdater::OnEvent(Events event, const std::string& id) {
  if (id != kIpfsClientComponentId)
    return;
  if (event == Events::COMPONENT_UPDATE_ERROR) {
    registered_ = false;
  }
  for (Observer& observer : observers_)
    observer.OnInstallationEvent(event);
}

void MisesIpfsClientUpdater::OnComponentReady(const std::string& component_id,
                                              const base::FilePath& install_dir,
                                              const std::string& manifest) {
  GetTaskRunner()->PostTaskAndReplyWithResult(
      FROM_HERE,
      base::BindOnce(&InitExecutablePath, install_dir),
      base::BindOnce(&MisesIpfsClientUpdater::SetExecutablePath,
                     weak_ptr_factory_.GetWeakPtr()));
}

void MisesIpfsClientUpdater::AddObserver(Observer* observer) {
  observers_.AddObserver(observer);
}

void MisesIpfsClientUpdater::RemoveObserver(Observer* observer) {
  observers_.RemoveObserver(observer);
}

void MisesIpfsClientUpdater::Cleanup() {
  DCHECK(!user_data_dir_.empty());
  base::FilePath ipfs_component_dir =
      user_data_dir_.AppendASCII(kIpfsClientComponentId);
  task_runner_->PostTask(FROM_HERE,
                         base::BindOnce(&DeleteDir, ipfs_component_dir));
}

// static
void MisesIpfsClientUpdater::SetComponentIdAndBase64PublicKeyForTest(
    const std::string& component_id,
    const std::string& component_base64_public_key) {
  g_ipfs_client_component_id_ = component_id;
  g_ipfs_client_component_base64_public_key_ = component_base64_public_key;
}

///////////////////////////////////////////////////////////////////////////////

// The Brave Ipfs client extension factory.
std::unique_ptr<MisesIpfsClientUpdater> MisesIpfsClientUpdaterFactory(
    MisesComponent::Delegate* delegate,
    const base::FilePath& user_data_dir) {
  return std::make_unique<MisesIpfsClientUpdater>(delegate, user_data_dir);
}

}  // namespace ipfs
