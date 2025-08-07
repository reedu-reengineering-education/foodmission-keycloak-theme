import { KcPageStory } from "./KcPageStory";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
// import "../globals.css";

type Props = {
  kcContext: KcContext;
  i18n: I18n;
};

// This component is used for development/Storybook
// In production, Keycloakify uses the theme-specific KcPage components (login/KcPage.tsx, account/KcPage.tsx)
export default function KcPage(props: Props) {
  return <KcPageStory {...props} />;
}
