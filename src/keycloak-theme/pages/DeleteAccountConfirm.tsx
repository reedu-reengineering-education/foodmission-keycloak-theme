import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { TwoColumnLayout } from "../components/layout/TwoColumnLayout";
import { useState } from "react";
import { Button, Input, Label, Checkbox } from "@/components/ui";

// Extract the DeleteAccountConfirm page context specifically
type DeleteAccountConfirmKcContext = Extract<
  KcContext,
  { pageId: "delete-account-confirm.ftl" }
>;

type Props = {
  kcContext: DeleteAccountConfirmKcContext;
  i18n: I18n;
};

export function DeleteAccountConfirm({ kcContext, i18n }: Props) {
  const { msg } = i18n;
  const { url, messagesPerField } = kcContext;
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    if (!isConfirmed) {
      e.preventDefault();
      alert(msg("deleteAccountConfirm"));
    }
  };

  return (
    <TwoColumnLayout kcContext={kcContext} i18n={i18n}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {msg("deleteAccountConfirm")}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          action={url.loginAction}
          method="post"
          className="space-y-6"
        >
          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">{msg("password")}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={messagesPerField.existsError("password")}
            />
            {messagesPerField.existsError("password") && (
              <p className="text-sm text-destructive">
                {messagesPerField.getFirstError("password")}
              </p>
            )}
          </div>

          {/* Confirmation Checkbox */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="delete-account-confirm"
              name="delete-account-confirm"
              required
              checked={isConfirmed}
              onCheckedChange={(checked) => setIsConfirmed(checked === true)}
            />
            <Label
              htmlFor="delete-account-confirm"
              className="text-sm leading-5"
            >
              {msg("doConfirmDelete")}
            </Label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <Button
              type="submit"
              name="submitAction"
              variant="destructive"
              disabled={!isConfirmed || !password}
              className="w-full sm:w-auto"
            >
              {msg("doConfirmDelete")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto"
            >
              {msg("doCancel")}
            </Button>
          </div>
        </form>
      </div>
    </TwoColumnLayout>
  );
}
