/**
 * Error types and interfaces for the FOODMISSION Keycloak theme
 */

export type ErrorCategory =
  | "authentication"
  | "validation"
  | "network"
  | "configuration"
  | "authorization"
  | "session"
  | "server"
  | "unknown";

export type ErrorSeverity = "low" | "medium" | "high" | "critical";

export interface ErrorDetails {
  /** Unique error code for identification */
  code: string;
  /** Error category for classification */
  category: ErrorCategory;
  /** Severity level of the error */
  severity: ErrorSeverity;
  /** User-friendly error message */
  message: string;
  /** Technical error details for debugging */
  technicalDetails?: string;
  /** Suggested recovery actions */
  recoveryActions?: string[];
  /** Whether the error is recoverable */
  recoverable: boolean;
  /** Timestamp when the error occurred */
  timestamp: Date;
  /** Additional context data */
  context?: Record<string, any>;
}

export interface ErrorRecoveryAction {
  /** Action identifier */
  id: string;
  /** Display label for the action */
  label: string;
  /** Action type */
  type: "retry" | "navigate" | "contact" | "refresh" | "custom";
  /** Action handler function */
  handler: () => void | Promise<void>;
  /** Whether this is the primary action */
  primary?: boolean;
  /** Icon to display with the action */
  icon?: React.ReactNode;
}

export interface LocalizedErrorMessages {
  [key: string]: {
    [locale: string]: string;
  };
}

export interface ErrorHandlerConfig {
  /** Default locale for error messages */
  defaultLocale: string;
  /** Whether to show technical details to users */
  showTechnicalDetails: boolean;
  /** Maximum number of retry attempts */
  maxRetryAttempts: number;
  /** Support email for contact actions */
  supportEmail?: string;
  /** Custom error message overrides */
  customMessages?: LocalizedErrorMessages;
}
