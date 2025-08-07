import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { RegisterForm } from "../components/register/RegisterForm";
import { TwoColumnLayout } from "../components/layout/TwoColumnLayout";
// import "../../globals.css";

type Props = {
  kcContext: KcContext;
  i18n: I18n;
};

export function Register({ kcContext, i18n }: Props) {
  return (
    <TwoColumnLayout kcContext={kcContext} i18n={i18n}>
      <RegisterForm kcContext={kcContext} i18n={i18n} />
    </TwoColumnLayout>
  );
}
