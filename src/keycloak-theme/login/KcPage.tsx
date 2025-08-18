import type { KcContext } from "../kcContext";
import { Login } from "../pages/Login";
import { ResetPassword } from "../pages/ResetPassword";
import { Register } from "../pages/Register";
import { Terms } from "../pages/Terms";
import { UpdatePassword } from "../pages/UpdatePassword";
import { UpdateProfile } from "../pages/UpdateProfile";
import { Error } from "../pages/Error";
import { DeleteAccountConfirm } from "../pages/DeleteAccountConfirm";
import { Info } from "../pages/Info";
import { useI18n } from "../i18n";

interface Props {
  kcContext: KcContext;
}

export default function KcPage({ kcContext }: Props) {
  const { i18n } = useI18n({ kcContext });

  // Route to the appropriate page component based on pageId
  switch (kcContext.pageId) {
    case "login.ftl":
      return <Login kcContext={kcContext} i18n={i18n} />;

    case "login-reset-password.ftl":
      return <ResetPassword kcContext={kcContext} i18n={i18n} />;

    case "login-update-password.ftl":
      return <UpdatePassword kcContext={kcContext} i18n={i18n} />;

    case "login-update-profile.ftl":
      return <UpdateProfile kcContext={kcContext} i18n={i18n} />;

    case "register.ftl":
      return <Register kcContext={kcContext} i18n={i18n} />;

    case "terms.ftl":
      return <Terms kcContext={kcContext} i18n={i18n} />;

    case "error.ftl":
      return <Error kcContext={kcContext} i18n={i18n} />;

    case "delete-account-confirm.ftl":
      return <DeleteAccountConfirm kcContext={kcContext} i18n={i18n} />;

    case "info.ftl":
      return <Info kcContext={kcContext} i18n={i18n} />;

    default:
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              FOODMISSION Keycloak Theme
            </h1>
            <p>Page ID: {kcContext.pageId}</p>
            <p className="text-sm text-gray-600 mt-2">
              This page is not yet implemented.
            </p>
          </div>
        </div>
      );
  }
}
