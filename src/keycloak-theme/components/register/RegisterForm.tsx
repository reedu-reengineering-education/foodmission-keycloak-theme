import type { KcContext } from "../../kcContext";
import type { I18n } from "../../i18n";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";

type Props = {
  kcContext: KcContext;
  i18n: I18n;
  className?: string;
};

export function RegisterForm({ kcContext, i18n, className = "" }: Props) {
  const { url, messagesPerField, realm } = kcContext;
  const { msgStr } = i18n;

  // Check if email should be used as username
  const useEmailAsUsername = realm?.registrationEmailAsUsername;

  return (
    <div className={className}>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {msgStr("registerTitle")}
        </h2>
        {/* <p className="text-gray-600">{msgStr("foodmission.welcome")}</p> */}
      </div>

      {/* Error Message */}
      {kcContext.message?.type === "error" && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{kcContext.message.summary}</p>
        </div>
      )}

      {/* Registration Form */}
      <form
        method="POST"
        action={url?.loginAction || "#"}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">{msgStr("firstName")}</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              placeholder={msgStr("firstName")}
            />
            {messagesPerField?.existsError("firstName") && (
              <p className="text-red-600 text-sm">
                {messagesPerField.get("firstName")}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">{msgStr("lastName")}</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              placeholder={msgStr("lastName")}
            />
            {messagesPerField?.existsError("lastName") && (
              <p className="text-red-600 text-sm">
                {messagesPerField.get("lastName")}
              </p>
            )}
          </div>
        </div>

        {!useEmailAsUsername && (
          <div className="space-y-2">
            <Label htmlFor="username">{msgStr("username")}</Label>
            <Input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              placeholder={msgStr("username")}
            />
            {messagesPerField?.existsError("username") && (
              <p className="text-red-600 text-sm">
                {messagesPerField.get("username")}
              </p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">{msgStr("email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={msgStr("email")}
          />
          {messagesPerField?.existsError("email") && (
            <p className="text-red-600 text-sm">
              {messagesPerField.get("email")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{msgStr("password")}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder={msgStr("password")}
          />
          {messagesPerField?.existsError("password") && (
            <p className="text-red-600 text-sm">
              {messagesPerField.get("password")}
            </p>
          )}
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
          {messagesPerField?.existsError("password-confirm") && (
            <p className="text-red-600 text-sm">
              {messagesPerField.get("password-confirm")}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          {msgStr("doRegister")}
        </Button>
      </form>

      {/* Links */}
      <div className="mt-6 text-center">
        <div className="text-sm text-muted-foreground">
          {msgStr("loginAccountTitle")}{" "}
          <a href={url.loginUrl} className="text-primary hover:underline">
            {msgStr("doLogIn")}
          </a>
        </div>
      </div>
    </div>
  );
}
