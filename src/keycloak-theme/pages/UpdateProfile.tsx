import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { UpdateProfileForm } from "../components/update-profile/UpdateProfileForm";
import { TwoColumnLayout } from "../components/layout/TwoColumnLayout";
// import "../../globals.css";

// Extract the LoginUpdateProfile page context specifically
type UpdateProfileKcContext = Extract<
  KcContext,
  { pageId: "login-update-profile.ftl" }
>;

type Props = {
  kcContext: UpdateProfileKcContext;
  i18n: I18n;
};

export function UpdateProfile({ kcContext, i18n }: Props) {
  return (
    <TwoColumnLayout kcContext={kcContext} i18n={i18n}>
      <UpdateProfileForm kcContext={kcContext} i18n={i18n} />
    </TwoColumnLayout>
  );
}
