

// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "chrome/browser/download/drag_download_item.h"

#include <string>

#include "build/build_config.h"
#include "chrome/browser/profiles/profile.h"
#include "components/download/public/common/download_item.h"
#include "net/base/mime_util.h"
#include "ui/aura/client/drag_drop_client.h"
#include "ui/aura/window.h"
#include "ui/aura/window_event_dispatcher.h"
#include "ui/base/dragdrop/drag_drop_types.h"
#include "ui/base/dragdrop/os_exchange_data.h"
#include "ui/base/clipboard/file_info.h"
#include "ui/display/screen.h"
#include "ui/gfx/geometry/point.h"
#include "ui/gfx/image/image.h"
#include "ui/gfx/image/image_skia.h"
#include "ui/views/button_drag_utils.h"
#include "ui/views/widget/widget.h"
#include "url/gurl.h"

#if defined(OS_CHROMEOS)
#include "chrome/browser/chromeos/drive/download_handler.h"
#include "content/public/browser/download_item_utils.h"
#endif

void DragDownloadItem(const download::DownloadItem* download,
                      const gfx::Image* icon,
                      gfx::NativeView view) {
}

