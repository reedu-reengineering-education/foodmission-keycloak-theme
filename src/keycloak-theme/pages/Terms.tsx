import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { TermsForm } from "../components/terms/TermsForm";
import { TwoColumnLayout } from "../components/layout/TwoColumnLayout";
// import "../../globals.css";

// Extract the Terms page context specifically
type TermsKcContext = Extract<KcContext, { pageId: "terms.ftl" }>;

type Props = {
  kcContext: TermsKcContext;
  i18n: I18n;
};

export function Terms({ kcContext, i18n }: Props) {
  return (
    <TwoColumnLayout kcContext={kcContext} i18n={i18n}>
      <TermsForm kcContext={kcContext} i18n={i18n} />
    </TwoColumnLayout>
  );
}
