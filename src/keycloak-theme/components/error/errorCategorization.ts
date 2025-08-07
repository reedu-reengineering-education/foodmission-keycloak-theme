import { ErrorCategory, ErrorSeverity, ErrorDetails } from "./types";

/**
 * Error categorization system for FOODMISSION Keycloak theme
 * Categorizes errors based on error codes, messages, and context
 */

// Common error patterns and their categories
const ERROR_PATTERNS: Record<
  string,
  { category: ErrorCategory; severity: ErrorSeverity }
> = {
  // Authentication errors
  INVALID_CREDENTIALS: { category: "authentication", severity: "medium" },
  INVALID_USER_CREDENTIALS: { category: "authentication", severity: "medium" },
  ACCOUNT_DISABLED: { category: "authentication", severity: "high" },
  ACCOUNT_TEMPORARILY_DISABLED: {
    category: "authentication",
    severity: "high",
  },
  USER_NOT_FOUND: { category: "authentication", severity: "medium" },
  LOGIN_TIMEOUT: { category: "session", severity: "medium" },

  // Validation errors
  INVALID_EMAIL: { category: "validation", severity: "low" },
  PASSWORD_TOO_WEAK: { category: "validation", severity: "medium" },
  REQUIRED_FIELD_MISSING: { category: "validation", severity: "low" },
  INVALID_PASSWORD_FORMAT: { category: "validation", severity: "low" },
  EMAIL_ALREADY_EXISTS: { category: "validation", severity: "medium" },
  USERNAME_ALREADY_EXISTS: { category: "validation", severity: "medium" },

  // Network errors
  NETWORK_ERROR: { category: "network", severity: "medium" },
  CONNECTION_TIMEOUT: { category: "network", severity: "medium" },
  SERVICE_UNAVAILABLE: { category: "network", severity: "high" },
  REQUEST_TIMEOUT: { category: "network", severity: "medium" },

  // Configuration errors
  INVALID_CLIENT: { category: "configuration", severity: "critical" },
  INVALID_REDIRECT_URI: { category: "configuration", severity: "high" },
  UNSUPPORTED_RESPONSE_TYPE: { category: "configuration", severity: "high" },
  INVALID_SCOPE: { category: "configuration", severity: "medium" },

  // Authorization errors
  ACCESS_DENIED: { category: "authorization", severity: "high" },
  INSUFFICIENT_PERMISSIONS: { category: "authorization", severity: "high" },
  TOKEN_EXPIRED: { category: "session", severity: "medium" },
  INVALID_TOKEN: { category: "session", severity: "medium" },

  // Session errors
  SESSION_EXPIRED: { category: "session", severity: "medium" },
  SESSION_NOT_FOUND: { category: "session", severity: "medium" },
  CONCURRENT_SESSION_LIMIT: { category: "session", severity: "medium" },

  // Server errors
  INTERNAL_SERVER_ERROR: { category: "server", severity: "critical" },
  DATABASE_ERROR: { category: "server", severity: "critical" },
  SERVICE_MAINTENANCE: { category: "server", severity: "high" },
};

// HTTP status code mappings
const HTTP_STATUS_CATEGORIES: Record<
  number,
  { category: ErrorCategory; severity: ErrorSeverity }
> = {
  400: { category: "validation", severity: "low" },
  401: { category: "authentication", severity: "medium" },
  403: { category: "authorization", severity: "high" },
  404: { category: "configuration", severity: "medium" },
  408: { category: "network", severity: "medium" },
  429: { category: "server", severity: "medium" },
  500: { category: "server", severity: "critical" },
  502: { category: "network", severity: "high" },
  503: { category: "server", severity: "high" },
  504: { category: "network", severity: "high" },
};

/**
 * Categorizes an error based on various inputs
 */
export function categorizeError(
  errorCode?: string,
  errorMessage?: string,
  httpStatus?: number,
  context?: Record<string, any>
): { category: ErrorCategory; severity: ErrorSeverity } {
  // First, try to match by error code
  if (errorCode && ERROR_PATTERNS[errorCode]) {
    return ERROR_PATTERNS[errorCode];
  }

  // Try to match by HTTP status code
  if (httpStatus && HTTP_STATUS_CATEGORIES[httpStatus]) {
    return HTTP_STATUS_CATEGORIES[httpStatus];
  }

  // Try to match by error message patterns
  if (errorMessage) {
    const message = errorMessage.toLowerCase();

    // Authentication patterns
    if (
      message.includes("invalid credentials") ||
      message.includes("wrong password")
    ) {
      return { category: "authentication", severity: "medium" };
    }
    if (
      message.includes("account locked") ||
      message.includes("account disabled")
    ) {
      return { category: "authentication", severity: "high" };
    }
    if (
      message.includes("user not found") ||
      message.includes("unknown user")
    ) {
      return { category: "authentication", severity: "medium" };
    }

    // Validation patterns
    if (message.includes("invalid email") || message.includes("email format")) {
      return { category: "validation", severity: "low" };
    }
    if (
      message.includes("password") &&
      (message.includes("weak") || message.includes("requirements"))
    ) {
      return { category: "validation", severity: "medium" };
    }
    if (
      message.includes("required field") ||
      message.includes("missing field")
    ) {
      return { category: "validation", severity: "low" };
    }

    // Network patterns
    if (message.includes("network") || message.includes("connection")) {
      return { category: "network", severity: "medium" };
    }
    if (message.includes("timeout")) {
      return { category: "network", severity: "medium" };
    }
    if (
      message.includes("service unavailable") ||
      message.includes("server unavailable")
    ) {
      return { category: "server", severity: "high" };
    }

    // Session patterns
    if (
      message.includes("session expired") ||
      message.includes("session timeout")
    ) {
      return { category: "session", severity: "medium" };
    }
    if (
      message.includes("token expired") ||
      message.includes("invalid token")
    ) {
      return { category: "session", severity: "medium" };
    }

    // Authorization patterns
    if (message.includes("access denied") || message.includes("forbidden")) {
      return { category: "authorization", severity: "high" };
    }
    if (
      message.includes("insufficient permissions") ||
      message.includes("not authorized")
    ) {
      return { category: "authorization", severity: "high" };
    }
  }

  // Check context for additional clues
  if (context) {
    if (context.isNetworkError) {
      return { category: "network", severity: "medium" };
    }
    if (context.isValidationError) {
      return { category: "validation", severity: "low" };
    }
    if (context.isAuthenticationError) {
      return { category: "authentication", severity: "medium" };
    }
  }

  // Default to unknown with medium severity
  return { category: "unknown", severity: "medium" };
}

/**
 * Creates a standardized error details object
 */
export function createErrorDetails(
  code: string,
  message: string,
  options: {
    technicalDetails?: string;
    httpStatus?: number;
    context?: Record<string, any>;
    recoveryActions?: string[];
  } = {}
): ErrorDetails {
  const { category, severity } = categorizeError(
    code,
    message,
    options.httpStatus,
    options.context
  );

  return {
    code,
    category,
    severity,
    message,
    technicalDetails: options.technicalDetails,
    recoveryActions:
      options.recoveryActions || getDefaultRecoveryActions(category),
    recoverable: isRecoverable(category, severity),
    timestamp: new Date(),
    context: options.context,
  };
}

/**
 * Determines if an error is recoverable based on category and severity
 */
function isRecoverable(
  category: ErrorCategory,
  severity: ErrorSeverity
): boolean {
  // Critical errors are generally not recoverable
  if (severity === "critical") {
    return false;
  }

  // Some categories are more likely to be recoverable
  switch (category) {
    case "network":
    case "session":
      return true;
    case "validation":
      return true;
    case "authentication":
      return severity !== "high"; // Account locked/disabled is not immediately recoverable
    case "server":
      return severity === "medium"; // Temporary server issues might be recoverable
    case "configuration":
    case "authorization":
      return false; // Usually require admin intervention
    default:
      return severity === "low" || severity === "medium";
  }
}

/**
 * Gets default recovery actions for an error category
 */
function getDefaultRecoveryActions(category: ErrorCategory): string[] {
  switch (category) {
    case "authentication":
      return [
        "Check your credentials and try again",
        "Reset your password if needed",
      ];
    case "validation":
      return [
        "Review the form fields and correct any errors",
        "Ensure all required fields are filled",
      ];
    case "network":
      return ["Check your internet connection", "Try again in a few moments"];
    case "session":
      return ["Log in again", "Clear your browser cache and cookies"];
    case "server":
      return ["Try again later", "Contact support if the problem persists"];
    case "configuration":
      return ["Contact your system administrator"];
    case "authorization":
      return ["Contact support for access permissions"];
    default:
      return ["Try again", "Contact support if the problem continues"];
  }
}
