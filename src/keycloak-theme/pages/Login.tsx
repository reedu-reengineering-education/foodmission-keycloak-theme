import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { LoginForm } from "../components/login/LoginForm";
import { TwoColumnLayout } from "../components/layout/TwoColumnLayout";
// import "../../globals.css";

// Extract the Login page context specifically
type LoginKcContext = Extract<KcContext, { pageId: "login.ftl" }>;

type Props = {
  kcContext: LoginKcContext;
  i18n: I18n;
};

export function Login({ kcContext, i18n }: Props) {
  return (
    <TwoColumnLayout kcContext={kcContext} i18n={i18n}>
      <LoginForm kcContext={kcContext} i18n={i18n} />
    </TwoColumnLayout>
  );
}
