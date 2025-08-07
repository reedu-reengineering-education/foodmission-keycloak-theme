import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import type { I18n } from "../../i18n";

export interface ErrorPageProps {
  /** The error message to display */
  errorMessage?: string;
  /** Whether to show the home button */
  showHome?: boolean;
  /** Whether to show the back button */
  showBack?: boolean;
  /** Callback for home navigation */
  onHome?: () => void;
  /** Callback for back navigation */
  onBack?: () => void;
  /** Custom error title */
  title?: string;
  /** i18n instance for translations */
  i18n: I18n;
}

/**
 * ErrorPage component for displaying authentication and system errors
 * with minimal styling and Keycloak i18n integration
 */
export const ErrorPage: React.FC<ErrorPageProps> = ({
  errorMessage,
  showHome = false,
  showBack = true,
  onHome,
  onBack,
  title,
  i18n,
}) => {
  const { msgStr, msg } = i18n;

  const handleHome = () => {
    if (onHome) {
      onHome();
    } else {
      window.location.href = "/";
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {title || msgStr("errorTitle")}
        </h2>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3">
        {showBack && (
          <Button variant="outline" onClick={handleBack} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {msgStr("doBack")}
          </Button>
        )}

        {showHome && (
          <Button onClick={handleHome} className="w-full">
            {msg("backToApplication")}
          </Button>
        )}
      </div>
    </div>
  );
};
