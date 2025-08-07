import React from "react";
import { ErrorDetails, ErrorHandlerConfig, ErrorRecoveryAction } from "./types";
import { createErrorDetails } from "./errorCategorization";
import { getLocalizedErrorMessage } from "./errorMessages";
import {
  createRecoveryActions,
  executeRecoveryAction,
  RecoveryContext,
} from "./errorRecovery";
import { ErrorPage } from "./ErrorPage";
import { InfoPage, InfoPageType } from "./InfoPage";
import { MaintenancePage } from "./MaintenancePage";
import { useThemeConfig } from "@/lib/use-theme-config";

export interface ErrorHandlerProps {
  /** The error to handle */
  error?: Error | string | ErrorDetails;
  /** Error code if available */
  errorCode?: string;
  /** HTTP status code if available */
  httpStatus?: number;
  /** Additional context for error handling */
  context?: Record<string, any>;
  /** Configuration for error handling */
  config?: Partial<ErrorHandlerConfig>;
  /** Current locale for error messages */
  locale?: string;
  /** Custom recovery actions */
  customRecoveryActions?: ErrorRecoveryAction[];
  /** Callback when an error is handled */
  onErrorHandled?: (errorDetails: ErrorDetails) => void;
  /** Whether to show as info page instead of error page */
  showAsInfo?: boolean;
  /** Info page type if showing as info */
  infoPageType?: InfoPageType;
  /** Whether to show as maintenance page */
  showAsMaintenance?: boolean;
  /** i18n instance for translations */
  i18n?: any;
}

/**
 * Comprehensive error handler component for the FOODMISSION Keycloak theme
 * Handles error categorization, localization, and recovery actions
 */
export const ErrorHandler: React.FC<ErrorHandlerProps> = ({
  error,
  errorCode,
  httpStatus,
  context = {},
  config = {},
  locale = "en",
  customRecoveryActions = [],
  onErrorHandled,
  showAsInfo = false,
  infoPageType,
  showAsMaintenance = false,
  i18n,
}) => {
  const themeConfig = useThemeConfig();
  const [retryCount, setRetryCount] = React.useState(0);

  // Default configuration
  const defaultConfig: ErrorHandlerConfig = {
    defaultLocale: "en",
    showTechnicalDetails: false,
    maxRetryAttempts: 3,
    supportEmail: themeConfig.content.supportEmail,
    ...config,
  };

  // Create error details from the provided error
  const errorDetails = React.useMemo(() => {
    if (error && typeof error === "object" && "code" in error) {
      // Already an ErrorDetails object
      return error as ErrorDetails;
    }

    let errorMessage: string;
    let technicalDetails: string | undefined;

    if (error instanceof Error) {
      errorMessage = error.message;
      technicalDetails = error.stack;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else {
      errorMessage = "An unexpected error occurred";
    }

    const code = errorCode || "UNKNOWN_ERROR";

    return createErrorDetails(code, errorMessage, {
      technicalDetails,
      httpStatus,
      context,
    });
  }, [error, errorCode, httpStatus, context]);

  // Get localized error message
  const localizedMessage = React.useMemo(() => {
    return getLocalizedErrorMessage(
      errorDetails.code,
      locale || defaultConfig.defaultLocale,
      errorDetails.message
    );
  }, [
    errorDetails.code,
    errorDetails.message,
    locale,
    defaultConfig.defaultLocale,
  ]);

  // Create recovery context
  const recoveryContext: RecoveryContext = React.useMemo(
    () => ({
      currentPage: context.currentPage,
      supportEmail: defaultConfig.supportEmail,
      baseUrl: context.baseUrl || "",
      isAuthenticated: context.isAuthenticated,
      customHandlers: context.customHandlers,
    }),
    [context, defaultConfig.supportEmail]
  );

  // Create recovery actions
  const recoveryActions = React.useMemo(() => {
    const defaultActions = createRecoveryActions(errorDetails, recoveryContext);
    return [...customRecoveryActions, ...defaultActions];
  }, [errorDetails, recoveryContext, customRecoveryActions]);

  // Handle recovery action execution
  const handleRecoveryAction = React.useCallback(
    async (action: ErrorRecoveryAction) => {
      try {
        if (action.type === "retry") {
          if (retryCount >= defaultConfig.maxRetryAttempts) {
            // Max retries reached, show support contact
            const supportAction = recoveryActions.find(
              (a) => a.id === "contact-support"
            );
            if (supportAction) {
              await executeRecoveryAction(supportAction);
            }
            return;
          }
          setRetryCount((prev) => prev + 1);
        }

        await executeRecoveryAction(action);
      } catch (actionError) {
        console.error("Failed to execute recovery action:", actionError);
      }
    },
    [retryCount, defaultConfig.maxRetryAttempts, recoveryActions]
  );

  // Notify parent component that error was handled
  React.useEffect(() => {
    if (onErrorHandled) {
      onErrorHandled(errorDetails);
    }
  }, [errorDetails, onErrorHandled]);

  // Determine which component to render based on error type and props
  if (showAsMaintenance || errorDetails.code === "SERVICE_MAINTENANCE") {
    return (
      <MaintenancePage
        title={
          errorDetails.code === "SERVICE_MAINTENANCE"
            ? undefined
            : "Service Error"
        }
        message={localizedMessage}
        isEmergency={errorDetails.severity === "critical"}
        details={
          defaultConfig.showTechnicalDetails
            ? errorDetails.technicalDetails
            : undefined
        }
        onRetry={() => {
          const retryAction = recoveryActions.find((a) => a.type === "retry");
          if (retryAction) {
            handleRecoveryAction(retryAction);
          }
        }}
      />
    );
  }

  if (showAsInfo && infoPageType) {
    return (
      <InfoPage
        type={infoPageType}
        message={localizedMessage}
        details={
          defaultConfig.showTechnicalDetails
            ? errorDetails.technicalDetails
            : undefined
        }
        onContinue={() => {
          const primaryAction = recoveryActions.find((a) => a.primary);
          if (primaryAction) {
            handleRecoveryAction(primaryAction);
          }
        }}
      />
    );
  }

  // Default to error page
  return (
    <ErrorPage
      title={`Error: ${
        errorDetails.category.charAt(0).toUpperCase() +
        errorDetails.category.slice(1)
      }`}
      errorMessage={localizedMessage}
      showHome={true}
      showBack={context.currentPage !== "home"}
      onHome={() => {
        const homeAction = recoveryActions.find((a) => a.id === "go-home");
        if (homeAction) {
          handleRecoveryAction(homeAction);
        }
      }}
      onBack={() => {
        const backAction = recoveryActions.find((a) => a.id === "go-back");
        if (backAction) {
          handleRecoveryAction(backAction);
        }
      }}
      i18n={i18n}
    />
  );
};

/**
 * Hook for handling errors in components
 */
export function useErrorHandler(config?: Partial<ErrorHandlerConfig>) {
  const [error, setError] = React.useState<ErrorDetails | null>(null);

  const handleError = React.useCallback(
    (
      error: Error | string,
      errorCode?: string,
      context?: Record<string, any>
    ) => {
      const errorDetails = createErrorDetails(
        errorCode || "UNKNOWN_ERROR",
        error instanceof Error ? error.message : error,
        {
          technicalDetails: error instanceof Error ? error.stack : undefined,
          context,
        }
      );

      setError(errorDetails);
    },
    []
  );

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError,
    ErrorComponent: error ? (
      <ErrorHandler
        error={error}
        config={config}
        onErrorHandled={() => setError(null)}
      />
    ) : null,
  };
}
