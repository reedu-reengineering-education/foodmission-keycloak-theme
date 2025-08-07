export { ErrorPage } from "./ErrorPage";
export { InfoPage } from "./InfoPage";
export { MaintenancePage } from "./MaintenancePage";
export { ErrorHandler, useErrorHandler } from "./ErrorHandler";

export type { ErrorPageProps } from "./ErrorPage";
export type { InfoPageProps, InfoPageType } from "./InfoPage";
export type { MaintenancePageProps } from "./MaintenancePage";
export type {
  ErrorCategory,
  ErrorSeverity,
  ErrorDetails,
  ErrorRecoveryAction,
  ErrorHandlerConfig,
} from "./types";

export { categorizeError, createErrorDetails } from "./errorCategorization";
export { getLocalizedErrorMessage, getAvailableLocales } from "./errorMessages";
export { createRecoveryActions, executeRecoveryAction } from "./errorRecovery";
