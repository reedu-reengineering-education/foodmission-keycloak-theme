import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import LoginKcPage from "./login/KcPage";
// import "../globals.css";

type Props = {
  kcContext: KcContext;
  i18n: I18n;
};

// This is a wrapper for Storybook that delegates to the appropriate theme-specific KcPage
// Following Keycloakify best practices: keep the main logic in theme-specific routers
export function KcPageStory(props: Props) {
  const { kcContext } = props;

  // For login theme pages, delegate to the login KcPage
  if (kcContext.themeType === "login") {
    return <LoginKcPage kcContext={kcContext} />;
  }

  // For account theme pages, you would add:
  // if (kcContext.themeType === "account") {
  //   return <AccountKcPage kcContext={kcContext} />;
  // }

  // Fallback for unknown theme types
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">FOODMISSION Keycloak Theme</h1>
        <p>Theme Type: {kcContext.themeType}</p>
        <p>Page ID: {kcContext.pageId}</p>
        <p className="text-sm text-gray-600 mt-2">
          This theme type is not yet implemented.
        </p>
      </div>
    </div>
  );
}
