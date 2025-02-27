#ifndef CHROME_BROWSER_UI_VIEWS_FRAME_DESKTOP_BROWSER_FRAME_ANDROID_H_
#define CHROME_BROWSER_UI_VIEWS_FRAME_DESKTOP_BROWSER_FRAME_ANDROID_H_

#include <memory>

#include "base/memory/raw_ptr.h"
#include "chrome/browser/ui/views/frame/native_browser_frame.h"
#include "ui/views/context_menu_controller.h"

class BrowserDesktopWindowTreeHost;
class BrowserFrame;
class BrowserView;

namespace wm {
class VisibilityController;
}

////////////////////////////////////////////////////////////////////////////////
// DesktopBrowserFrameAndroid
//
//  DesktopBrowserFrameAndroid is a DesktopNativeWidgetAndroid subclass that provides
//  the window frame for the Chrome browser window.
//
class DesktopBrowserFrameAndroid : public NativeBrowserFrame {
 public:
  DesktopBrowserFrameAndroid(BrowserFrame* browser_frame,
                          BrowserView* browser_view);
 DesktopBrowserFrameAndroid(const DesktopBrowserFrameAndroid&) = delete;
  DesktopBrowserFrameAndroid& operator=(const DesktopBrowserFrameAndroid&) =
      delete;
  BrowserView* browser_view() const { return browser_view_; }
  BrowserFrame* browser_frame() const { return browser_frame_; }

 protected:
  ~DesktopBrowserFrameAndroid() override;

  // Overridden from NativeBrowserFrame:
  views::Widget::InitParams GetWidgetParams() override;
  bool UseCustomFrame() const override;
  bool UsesNativeSystemMenu() const override;
  int GetMinimizeButtonOffset() const override;
  bool ShouldSaveWindowPlacement() const override;
  void GetWindowPlacement(gfx::Rect* bounds,
                          ui::WindowShowState* show_state) const override;
  content::KeyboardEventProcessingResult PreHandleKeyboardEvent(
      const input::NativeWebKeyboardEvent& event) override;
  bool HandleKeyboardEvent(
      const input::NativeWebKeyboardEvent& event) override;
 bool ShouldRestorePreviousBrowserWidgetState() const override;
   bool ShouldUseInitialVisibleOnAllWorkspaces() const override;
 private:
  // The BrowserView is our ClientView. This is a pointer to it.
  raw_ptr<BrowserView> browser_view_;
  raw_ptr<BrowserFrame> browser_frame_;

  std::unique_ptr<wm::VisibilityController> visibility_controller_;

};

#endif  // CHROME_BROWSER_UI_VIEWS_FRAME_DESKTOP_BROWSER_FRAME_Android_H_


