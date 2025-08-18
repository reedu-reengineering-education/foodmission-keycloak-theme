import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { TwoColumnLayout } from "../components/layout/TwoColumnLayout";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Info as InfoIcon, AlertCircle } from "lucide-react";

// Extract the Info page context specifically
type InfoKcContext = Extract<KcContext, { pageId: "info.ftl" }>;

type Props = {
  kcContext: InfoKcContext;
  i18n: I18n;
};

export function Info({ kcContext, i18n }: Props) {
  const { msg } = i18n;
  const { message, pageRedirectUri, actionUri, client } = kcContext;

  // Determine the redirect URL
  const getRedirectUrl = () => {
    if (pageRedirectUri) return pageRedirectUri;
    if (actionUri) return actionUri;
    if (client?.baseUrl) return client.baseUrl;
    return null;
  };

  const redirectUrl = getRedirectUrl();

  // Determine message type and corresponding styles
  const getMessageConfig = () => {
    switch (message?.type) {
      case "success":
        return {
          variant: "default" as const,
          icon: <CheckCircle className="h-4 w-4" />,
        };
      case "info":
        return {
          variant: "default" as const,
          icon: <InfoIcon className="h-4 w-4" />,
        };
      case "error":
        return {
          variant: "destructive" as const,
          icon: <AlertCircle className="h-4 w-4" />,
        };
      default:
        return {
          variant: "default" as const,
          icon: <InfoIcon className="h-4 w-4" />,
        };
    }
  };

  const messageConfig = getMessageConfig();

  return (
    <TwoColumnLayout kcContext={kcContext} i18n={i18n}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Information
          </h1>
        </div>

        {/* Message Display */}
        {message?.summary && (
          <Alert variant={messageConfig.variant}>
            {messageConfig.icon}
            <AlertDescription>
              <div dangerouslySetInnerHTML={{ __html: message.summary }} />
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          {redirectUrl && (
            <Button asChild className="w-full sm:w-auto">
              <a href={redirectUrl}>
                {pageRedirectUri || actionUri
                  ? msg("proceedWithAction")
                  : msg("backToApplication")}
              </a>
            </Button>
          )}
        </div>
      </div>
    </TwoColumnLayout>
  );
}
