import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { ResetPasswordForm } from "../components/reset-password/ResetPasswordForm";
import { TwoColumnLayout } from "../components/layout/TwoColumnLayout";
// import "../../globals.css";

type Props = {
  kcContext: KcContext;
  i18n: I18n;
};

export function ResetPassword({ kcContext, i18n }: Props) {
  return (
    <TwoColumnLayout kcContext={kcContext} i18n={i18n}>
      <ResetPasswordForm kcContext={kcContext} i18n={i18n} />
    </TwoColumnLayout>
  );
}
