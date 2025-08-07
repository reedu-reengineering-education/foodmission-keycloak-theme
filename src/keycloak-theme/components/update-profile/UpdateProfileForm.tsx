import type { KcContext } from "../../kcContext";
import type { I18n } from "../../i18n";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

// Extract the LoginUpdateProfile page context specifically
type UpdateProfileKcContext = Extract<
  KcContext,
  { pageId: "login-update-profile.ftl" }
>;

type Props = {
  kcContext: UpdateProfileKcContext;
  i18n: I18n;
  className?: string;
};

export function UpdateProfileForm({ kcContext, i18n, className = "" }: Props) {
  const { url, profile, messagesPerField, realm } = kcContext;
  const { msgStr } = i18n;

  return (
    <div className={className}>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {msgStr("loginProfileTitle")}
        </h2>
        {/* <p className="text-gray-600">{msgStr("updateProfileMessage")}</p> */}
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

      {/* Update Profile Form */}
      <form
        method="POST"
        action={url?.loginAction || "#"}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">{msgStr("firstName")} *</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              defaultValue={profile?.attributesByName?.firstName?.value || ""}
              placeholder={msgStr("firstName")}
              aria-invalid={
                messagesPerField?.existsError("firstName") ? "true" : "false"
              }
            />
            {messagesPerField?.existsError("firstName") && (
              <p className="text-red-600 text-sm">
                {messagesPerField.get("firstName")}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">{msgStr("lastName")} *</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              defaultValue={profile?.attributesByName?.lastName?.value || ""}
              placeholder={msgStr("lastName")}
              aria-invalid={
                messagesPerField?.existsError("lastName") ? "true" : "false"
              }
            />
            {messagesPerField?.existsError("lastName") && (
              <p className="text-red-600 text-sm">
                {messagesPerField.get("lastName")}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{msgStr("email")} *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={profile?.attributesByName?.email?.value || ""}
            placeholder={msgStr("email")}
            aria-invalid={
              messagesPerField?.existsError("email") ? "true" : "false"
            }
          />
          {messagesPerField?.existsError("email") && (
            <p className="text-red-600 text-sm">
              {messagesPerField.get("email")}
            </p>
          )}
        </div>

        {!realm.registrationEmailAsUsername && (
          <div className="space-y-2">
            <Label htmlFor="username">{msgStr("username")} *</Label>
            <Input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              defaultValue={profile?.attributesByName?.username?.value || ""}
              placeholder={msgStr("username")}
              aria-invalid={
                messagesPerField?.existsError("username") ? "true" : "false"
              }
            />
            {messagesPerField?.existsError("username") && (
              <p className="text-red-600 text-sm">
                {messagesPerField.get("username")}
              </p>
            )}
          </div>
        )}

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
