import type { KcContext } from "../../kcContext";
import type { I18n } from "../../i18n";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";

// Extract the Login page context specifically
type LoginKcContext = Extract<KcContext, { pageId: "login.ftl" }>;

type Props = {
  kcContext: LoginKcContext;
  i18n: I18n;
  className?: string;
};

export function LoginForm({ kcContext, i18n, className = "" }: Props) {
  const { url, realm } = kcContext;
  const { msgStr } = i18n;

  return (
    <div className={className}>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {msgStr("doLogIn")}
        </h2>
        <p className="text-gray-600">{msgStr("loginAccountTitle")}</p>
      </div>

      {/* Error Message */}
      {kcContext.message?.type === "error" && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{kcContext.message.summary}</p>
        </div>
      )}

      {/* Login Form */}
      <form
        method="POST"
        action={kcContext.url?.loginAction || "#"}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="username">
            {realm.registrationEmailAsUsername
              ? msgStr("email")
              : msgStr("usernameOrEmail")}
          </Label>
          <Input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            placeholder={
              realm.registrationEmailAsUsername
                ? msgStr("email")
                : msgStr("usernameOrEmail")
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{msgStr("password")}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder={msgStr("password")}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="rememberMe" name="rememberMe" />
          <Label htmlFor="rememberMe" className="text-sm">
            {msgStr("rememberMe")}
          </Label>
        </div>

        <Button type="submit" className="w-full">
          {msgStr("doLogIn")}
        </Button>
      </form>

      {/* Links */}
      <div className="mt-6 text-center space-y-2">
        {url.loginResetCredentialsUrl && (
          <a
            href={url.loginResetCredentialsUrl}
            className="text-sm text-primary hover:underline block"
          >
            {msgStr("doForgotPassword")}
          </a>
        )}
        {url.registrationUrl && (
          <div className="text-sm text-muted-foreground">
            {msgStr("noAccount")}{" "}
            <a
              href={url.registrationUrl}
              className="text-primary hover:underline"
            >
              {msgStr("doRegister")}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
