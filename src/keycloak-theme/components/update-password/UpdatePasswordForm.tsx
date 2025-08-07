import type { KcContext } from "../../kcContext";
import type { I18n } from "../../i18n";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

type Props = {
  kcContext: KcContext;
  i18n: I18n;
  className?: string;
};

export function UpdatePasswordForm({ kcContext, i18n, className = "" }: Props) {
  const { url } = kcContext;
  const { msgStr } = i18n;

  return (
    <div className={className}>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {msgStr("updatePasswordTitle")}
        </h2>
        {/* <p className="text-gray-600">Please enter your new password</p> */}
      </div>

      {/* Error Message */}
      {kcContext.message?.type === "error" && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{kcContext.message.summary}</p>
        </div>
      )}

      {/* Success Message */}
      {kcContext.message?.type === "success" && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-600 text-sm">{kcContext.message.summary}</p>
        </div>
      )}

      {/* Update Password Form */}
      <form
        method="POST"
        action={url?.loginAction || "#"}
        className="space-y-4"
      >
        {/* Hidden fields for security */}
        <input
          type="text"
          name="username"
          value={kcContext.auth?.attemptedUsername || ""}
          autoComplete="username"
          readOnly
          style={{ display: "none" }}
        />
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          style={{ display: "none" }}
        />

        <div className="space-y-2">
          <Label htmlFor="password-new">{msgStr("passwordNew")}</Label>
          <Input
            id="password-new"
            name="password-new"
            type="password"
            autoComplete="new-password"
            autoFocus
            required
            placeholder={msgStr("passwordNew")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password-confirm">{msgStr("passwordConfirm")}</Label>
          <Input
            id="password-confirm"
            name="password-confirm"
            type="password"
            autoComplete="new-password"
            required
            placeholder={msgStr("passwordConfirm")}
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="flex-1">
            {msgStr("doSubmit")}
          </Button>
          {kcContext.isAppInitiatedAction && (
            <Button
              type="submit"
              name="cancel-aia"
              value="true"
              variant="outline"
              className="flex-1"
              formNoValidate
            >
              {msgStr("doCancel")}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
