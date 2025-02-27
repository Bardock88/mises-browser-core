/* Copyright (c) 2020 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef BRAVE_COMPONENTS_BRAVE_COMPONENT_UPDATER_BROWSER_BRAVE_ON_DEMAND_UPDATER_H_
#define BRAVE_COMPONENTS_BRAVE_COMPONENT_UPDATER_BROWSER_BRAVE_ON_DEMAND_UPDATER_H_

#include <string>

#include "base/functional/callback.h"

namespace base {
template <typename T>
struct DefaultSingletonTraits;
}  // namespace base

namespace mises_component_updater {

class MisesOnDemandUpdater {
 public:
  using Callback = base::RepeatingCallback<void(const std::string&)>;
  static MisesOnDemandUpdater* GetInstance();

  MisesOnDemandUpdater(const MisesOnDemandUpdater&) = delete;
  MisesOnDemandUpdater& operator=(const MisesOnDemandUpdater&) = delete;
  ~MisesOnDemandUpdater();
  void OnDemandUpdate(const std::string& id);

  void RegisterOnDemandUpdateCallback(Callback callback);

 private:
  friend struct base::DefaultSingletonTraits<MisesOnDemandUpdater>;
  MisesOnDemandUpdater();

  Callback on_demand_update_callback_;
};

}  // namespace brave_component_updater

#endif  // BRAVE_COMPONENTS_BRAVE_COMPONENT_UPDATER_BROWSER_BRAVE_ON_DEMAND_UPDATER_H_
