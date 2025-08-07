import { ErrorRecoveryAction, ErrorDetails } from "./types";
import {
  RefreshCw,
  Home,
  Mail,
  ArrowLeft,
  LogIn,
  AlertTriangle,
} from "lucide-react";
import React from "react";

/**
 * Error recovery mechanisms for the FOODMISSION Keycloak theme
 */

export interface RecoveryContext {
  /** Current page/route */
  currentPage?: string;
  /** Support email address */
  supportEmail?: string;
  /** Base URL for navigation */
  baseUrl?: string;
  /** Whether user is authenticated */
  isAuthenticated?: boolean;
  /** Custom recovery handlers */
  customHandlers?: Record<string, () => void | Promise<void>>;
}

/**
 * Creates recovery actions based on error details and context
 */
export function createRecoveryActions(
  errorDetails: ErrorDetails,
  context: RecoveryContext = {}
): ErrorRecoveryAction[] {
  const actions: ErrorRecoveryAction[] = [];

  // Add category-specific recovery actions
  switch (errorDetails.category) {
    case "authentication":
      actions.push(
        ...createAuthenticationRecoveryActions(errorDetails, context)
      );
      break;
    case "validation":
      actions.push(...createValidationRecoveryActions());
      break;
    case "network":
      actions.push(...createNetworkRecoveryActions());
      break;
    case "session":
      actions.push(...createSessionRecoveryActions(context));
      break;
    case "server":
      actions.push(...createServerRecoveryActions(errorDetails));
      break;
    case "configuration":
    case "authorization":
      actions.push(
        ...createConfigurationRecoveryActions(errorDetails, context)
      );
      break;
    default:
      actions.push(...createGenericRecoveryActions());
  }

  // Add common actions if appropriate
  if (errorDetails.recoverable) {
    actions.push(createRetryAction());
  }

  // Add navigation actions
  actions.push(...createNavigationActions(context));

  // Add support contact action
  if (context.supportEmail) {
    actions.push(createSupportAction(context.supportEmail, errorDetails));
  }

  return actions;
}

/**
 * Creates authentication-specific recovery actions
 */
function createAuthenticationRecoveryActions(
  errorDetails: ErrorDetails,
  context: RecoveryContext
): ErrorRecoveryAction[] {
  const actions: ErrorRecoveryAction[] = [];

  if (errorDetails.code === "INVALID_CREDENTIALS") {
    actions.push({
      id: "reset-password",
      label: "Reset Password",
      type: "navigate",
      handler: () => {
        window.location.href = `${context.baseUrl || ""}/reset-password`;
      },
      icon: React.createElement(RefreshCw, { className: "w-4 h-4" }),
    });
  }

  if (errorDetails.code === "USER_NOT_FOUND") {
    actions.push({
      id: "register",
      label: "Create Account",
      type: "navigate",
      handler: () => {
        window.location.href = `${context.baseUrl || ""}/register`;
      },
      primary: true,
    });
  }

  return actions;
}

/**
 * Creates validation-specific recovery actions
 */
function createValidationRecoveryActions(): ErrorRecoveryAction[] {
  const actions: ErrorRecoveryAction[] = [];

  // For validation errors, the primary action is usually to correct the form
  actions.push({
    id: "correct-form",
    label: "Correct Form",
    type: "custom",
    handler: () => {
      // Focus on the first invalid field if possible
      const firstInvalidField = document.querySelector(
        '[aria-invalid="true"]'
      ) as HTMLElement;
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
    },
    primary: true,
  });

  return actions;
}

/**
 * Creates network-specific recovery actions
 */
function createNetworkRecoveryActions(): ErrorRecoveryAction[] {
  const actions: ErrorRecoveryAction[] = [];

  // Network errors are usually recoverable with retry
  actions.push({
    id: "retry-connection",
    label: "Check Connection & Retry",
    type: "retry",
    handler: () => {
      // Wait a moment before retrying to allow network recovery
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    primary: true,
    icon: React.createElement(RefreshCw, { className: "w-4 h-4" }),
  });

  return actions;
}

/**
 * Creates session-specific recovery actions
 */
function createSessionRecoveryActions(
  context: RecoveryContext
): ErrorRecoveryAction[] {
  const actions: ErrorRecoveryAction[] = [];

  // Session errors usually require re-authentication
  actions.push({
    id: "login-again",
    label: "Log In Again",
    type: "navigate",
    handler: () => {
      // Clear any stored tokens/session data
      localStorage.removeItem("access_token");
      sessionStorage.clear();

      window.location.href = `${context.baseUrl || ""}/login`;
    },
    primary: true,
    icon: React.createElement(LogIn, { className: "w-4 h-4" }),
  });

  return actions;
}

/**
 * Creates server-specific recovery actions
 */
function createServerRecoveryActions(
  errorDetails: ErrorDetails
): ErrorRecoveryAction[] {
  const actions: ErrorRecoveryAction[] = [];

  if (
    errorDetails.severity === "high" ||
    errorDetails.severity === "critical"
  ) {
    // For serious server errors, suggest waiting and contacting support
    actions.push({
      id: "wait-and-retry",
      label: "Try Again Later",
      type: "custom",
      handler: () => {
        // Show a message about waiting
        alert(
          "Please wait a few minutes before trying again. The service may be temporarily unavailable."
        );
      },
      primary: true,
    });
  }

  return actions;
}

/**
 * Creates configuration/authorization recovery actions
 */
function createConfigurationRecoveryActions(
  errorDetails: ErrorDetails,
  context: RecoveryContext
): ErrorRecoveryAction[] {
  const actions: ErrorRecoveryAction[] = [];

  // These errors usually require admin intervention
  actions.push({
    id: "contact-admin",
    label: "Contact Administrator",
    type: "contact",
    handler: () => {
      if (context.supportEmail) {
        window.location.href = `mailto:${context.supportEmail}?subject=Configuration Error: ${errorDetails.code}&body=Error details: ${errorDetails.message}`;
      }
    },
    primary: true,
    icon: React.createElement(AlertTriangle, { className: "w-4 h-4" }),
  });

  return actions;
}

/**
 * Creates generic recovery actions
 */
function createGenericRecoveryActions(): ErrorRecoveryAction[] {
  const actions: ErrorRecoveryAction[] = [];

  // Generic refresh action
  actions.push({
    id: "refresh-page",
    label: "Refresh Page",
    type: "refresh",
    handler: () => {
      window.location.reload();
    },
    primary: true,
    icon: React.createElement(RefreshCw, { className: "w-4 h-4" }),
  });

  return actions;
}

/**
 * Creates a retry action
 */
function createRetryAction(): ErrorRecoveryAction {
  return {
    id: "retry",
    label: "Try Again",
    type: "retry",
    handler: () => {
      // Default retry behavior - reload the page
      window.location.reload();
    },
    primary: true,
    icon: React.createElement(RefreshCw, { className: "w-4 h-4" }),
  };
}

/**
 * Creates navigation actions
 */
function createNavigationActions(
  context: RecoveryContext
): ErrorRecoveryAction[] {
  const actions: ErrorRecoveryAction[] = [];

  // Home action
  actions.push({
    id: "go-home",
    label: "Go to Homepage",
    type: "navigate",
    handler: () => {
      window.location.href = context.baseUrl || "/";
    },
    icon: React.createElement(Home, { className: "w-4 h-4" }),
  });

  // Back action (if not on the main page)
  if (context.currentPage && context.currentPage !== "home") {
    actions.push({
      id: "go-back",
      label: "Go Back",
      type: "navigate",
      handler: () => {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = context.baseUrl || "/";
        }
      },
      icon: React.createElement(ArrowLeft, { className: "w-4 h-4" }),
    });
  }

  return actions;
}

/**
 * Creates a support contact action
 */
function createSupportAction(
  supportEmail: string,
  errorDetails: ErrorDetails
): ErrorRecoveryAction {
  return {
    id: "contact-support",
    label: "Contact Support",
    type: "contact",
    handler: () => {
      const subject = `Error Report: ${errorDetails.code}`;
      const body = `
Hello FOODMISSION Support,

I encountered an error while using the platform:

Error Code: ${errorDetails.code}
Error Message: ${errorDetails.message}
Time: ${errorDetails.timestamp.toISOString()}
Category: ${errorDetails.category}
Severity: ${errorDetails.severity}

${
  errorDetails.technicalDetails
    ? `Technical Details: ${errorDetails.technicalDetails}`
    : ""
}

Please help me resolve this issue.

Thank you,
FOODMISSION User
      `.trim();

      window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    },
    icon: React.createElement(Mail, { className: "w-4 h-4" }),
  };
}

/**
 * Executes a recovery action with error handling
 */
export async function executeRecoveryAction(
  action: ErrorRecoveryAction
): Promise<void> {
  try {
    await action.handler();
  } catch (error) {
    console.error(`Failed to execute recovery action ${action.id}:`, error);

    // Fallback to a basic retry if the action fails
    if (action.type !== "retry") {
      window.location.reload();
    }
  }
}
