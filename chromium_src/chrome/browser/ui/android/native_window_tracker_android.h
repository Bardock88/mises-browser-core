

// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef CHROME_BROWSER_UI_ANDROID_NATIVE_WINDOW_TRACKER_ANDROID_H_
#define CHROME_BROWSER_UI_ANDROID_NATIVE_WINDOW_TRACKER_ANDROID_H_

#include "base/memory/raw_ptr.h"
#include "chrome/browser/ui/native_window_tracker.h"
#include "ui/android/window_android.h"

class NativeWindowTrackerAndroid : public NativeWindowTracker {
 public:
  explicit NativeWindowTrackerAndroid(gfx::NativeWindow window);
  NativeWindowTrackerAndroid(const NativeWindowTrackerAndroid&) = delete;
  NativeWindowTrackerAndroid& operator=(const NativeWindowTrackerAndroid&) = delete;
  ~NativeWindowTrackerAndroid() override;

  bool WasNativeWindowClosed() const override;

 private:

  gfx::NativeWindow window_;

};

#endif
