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

export function ResetPasswordForm({ kcContext, i18n, className = "" }: Props) {
  const { url } = kcContext;
  const { msgStr, msg } = i18n;

  return (
    <div className={className}>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {msgStr("emailForgotTitle")}
        </h2>
        <p className="text-gray-600">{msgStr("emailInstruction")}</p>
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

      {/* Reset Password Form */}
      <form
        method="POST"
        action={url?.loginAction || "#"}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="username">{msgStr("usernameOrEmail")}</Label>
          <Input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            placeholder={msgStr("usernameOrEmail")}
          />
        </div>

        <Button type="submit" className="w-full">
          {msgStr("doSubmit")}
        </Button>
      </form>

      {/* Links */}
      <div className="mt-6 text-center">
        <div className="text-sm text-muted-foreground">
          Remember your password?{" "}
          <a href={url.loginUrl} className="text-primary hover:underline">
            {msg("backToLogin")}
          </a>
        </div>
      </div>
    </div>
  );
}
