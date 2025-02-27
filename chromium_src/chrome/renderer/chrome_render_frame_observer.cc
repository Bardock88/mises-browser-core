#include "chrome/renderer/chrome_render_frame_observer.h"
#if BUILDFLAG(IS_ANDROID)
#include "components/content_settings/renderer/content_settings_agent_impl.h"
#include "chrome/renderer/chrome_content_settings_agent_delegate.h"
#include "components/safe_browsing/content/renderer/phishing_classifier/phishing_classifier_delegate.h"
#include "chrome/renderer/accessibility/read_anything_app_controller.h"
#include "chrome/renderer/searchbox/searchbox_extension.h"
#include "ui/accessibility/accessibility_features.h"
#include "components/safe_browsing/content/renderer/phishing_classifier/phishing_image_embedder_delegate.h"

#define DidCommitProvisionalLoad DidCommitProvisionalLoad_Chromium
#define DidClearWindowObject DidClearWindowObject_Chromium
#define ExecuteWebUIJavaScript ExecuteWebUIJavaScript_Chromium
#include "src/chrome/renderer/chrome_render_frame_observer.cc"
#undef DidCommitProvisionalLoad
#undef DidClearWindowObject
#undef ExecuteWebUIJavaScript


void ChromeRenderFrameObserver::DidCommitProvisionalLoad(
    ui::PageTransition transition) {
  DidCommitProvisionalLoad_Chromium(transition);

  if (render_frame()->GetEnabledBindings().HasAny(
          content::kWebUIBindingsPolicySet)) {
    for (const auto& script : webui_javascript_)
      render_frame()->ExecuteJavaScript(script);
    webui_javascript_.clear();
  }
}


void ChromeRenderFrameObserver::DidClearWindowObject() {
  DidClearWindowObject_Chromium();
  // const base::CommandLine& command_line =
  //     *base::CommandLine::ForCurrentProcess();
  // if (command_line.HasSwitch(switches::kInstantProcess))
  //   SearchBoxExtension::Install(render_frame()->GetWebFrame());

}


void ChromeRenderFrameObserver::ExecuteWebUIJavaScript(
    const std::u16string& javascript) {
  ExecuteWebUIJavaScript_Chromium(javascript);
  webui_javascript_.push_back(javascript);
}

#else
#include "src/chrome/renderer/chrome_render_frame_observer.cc"
#endif  // !BUILDFLAG(IS_ANDROID)
