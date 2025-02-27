#include "chrome/browser/download/download_target_determiner_delegate.h"

#include "chrome/browser/download/chrome_download_manager_delegate.h"

#if BUILDFLAG(IS_ANDROID)
#define RequestConfirmation  RequestConfirmation_Chromium
#include "src/chrome/browser/download/chrome_download_manager_delegate.cc"
#undef RequestConfirmation

void ChromeDownloadManagerDelegate::RequestConfirmation(
    DownloadItem* download,
    const base::FilePath& suggested_path,
    DownloadConfirmationReason reason,
    DownloadTargetDeterminerDelegate::ConfirmationCallback callback) {
  if (download && download_dialog_bridge_)
      download_dialog_bridge_->SetUrl(download->GetURL().spec());
  RequestConfirmation_Chromium(download, suggested_path, reason, std::move(callback));
}
#else
#include "src/chrome/browser/download/chrome_download_manager_delegate.cc"
#endif
