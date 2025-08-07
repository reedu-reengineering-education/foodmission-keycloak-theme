import { describe, it, expect } from "vitest";
import { categorizeError, createErrorDetails } from "../errorCategorization";

describe("errorCategorization", () => {
  describe("categorizeError", () => {
    it("categorizes authentication errors correctly", () => {
      expect(categorizeError("INVALID_CREDENTIALS")).toEqual({
        category: "authentication",
        severity: "medium",
      });

      expect(categorizeError("ACCOUNT_DISABLED")).toEqual({
        category: "authentication",
        severity: "high",
      });

      expect(categorizeError("USER_NOT_FOUND")).toEqual({
        category: "authentication",
        severity: "medium",
      });
    });

    it("categorizes validation errors correctly", () => {
      expect(categorizeError("INVALID_EMAIL")).toEqual({
        category: "validation",
        severity: "low",
      });

      expect(categorizeError("PASSWORD_TOO_WEAK")).toEqual({
        category: "validation",
        severity: "medium",
      });

      expect(categorizeError("REQUIRED_FIELD_MISSING")).toEqual({
        category: "validation",
        severity: "low",
      });
    });

    it("categorizes network errors correctly", () => {
      expect(categorizeError("NETWORK_ERROR")).toEqual({
        category: "network",
        severity: "medium",
      });

      expect(categorizeError("CONNECTION_TIMEOUT")).toEqual({
        category: "network",
        severity: "medium",
      });

      expect(categorizeError("SERVICE_UNAVAILABLE")).toEqual({
        category: "network",
        severity: "high",
      });
    });

    it("categorizes session errors correctly", () => {
      expect(categorizeError("SESSION_EXPIRED")).toEqual({
        category: "session",
        severity: "medium",
      });

      expect(categorizeError("TOKEN_EXPIRED")).toEqual({
        category: "session",
        severity: "medium",
      });
    });

    it("categorizes server errors correctly", () => {
      expect(categorizeError("INTERNAL_SERVER_ERROR")).toEqual({
        category: "server",
        severity: "critical",
      });

      expect(categorizeError("DATABASE_ERROR")).toEqual({
        category: "server",
        severity: "critical",
      });
    });

    it("categorizes by HTTP status code when error code is not found", () => {
      expect(categorizeError(undefined, undefined, 401)).toEqual({
        category: "authentication",
        severity: "medium",
      });

      expect(categorizeError(undefined, undefined, 403)).toEqual({
        category: "authorization",
        severity: "high",
      });

      expect(categorizeError(undefined, undefined, 500)).toEqual({
        category: "server",
        severity: "critical",
      });
    });

    it("categorizes by error message patterns", () => {
      expect(
        categorizeError(undefined, "Invalid credentials provided")
      ).toEqual({
        category: "authentication",
        severity: "medium",
      });

      expect(
        categorizeError(undefined, "Account locked due to failed attempts")
      ).toEqual({
        category: "authentication",
        severity: "high",
      });

      expect(categorizeError(undefined, "Invalid email format")).toEqual({
        category: "validation",
        severity: "low",
      });

      expect(categorizeError(undefined, "Network connection failed")).toEqual({
        category: "network",
        severity: "medium",
      });

      expect(
        categorizeError(undefined, "Session expired for security")
      ).toEqual({
        category: "session",
        severity: "medium",
      });
    });

    it("uses context clues for categorization", () => {
      expect(
        categorizeError(undefined, undefined, undefined, {
          isNetworkError: true,
        })
      ).toEqual({
        category: "network",
        severity: "medium",
      });

      expect(
        categorizeError(undefined, undefined, undefined, {
          isValidationError: true,
        })
      ).toEqual({
        category: "validation",
        severity: "low",
      });

      expect(
        categorizeError(undefined, undefined, undefined, {
          isAuthenticationError: true,
        })
      ).toEqual({
        category: "authentication",
        severity: "medium",
      });
    });

    it("defaults to unknown category when no patterns match", () => {
      expect(categorizeError("UNKNOWN_CODE", "Unknown error message")).toEqual({
        category: "unknown",
        severity: "medium",
      });
    });
  });

  describe("createErrorDetails", () => {
    it("creates error details with correct categorization", () => {
      const errorDetails = createErrorDetails(
        "INVALID_CREDENTIALS",
        "Invalid username or password"
      );

      expect(errorDetails.code).toBe("INVALID_CREDENTIALS");
      expect(errorDetails.message).toBe("Invalid username or password");
      expect(errorDetails.category).toBe("authentication");
      expect(errorDetails.severity).toBe("medium");
      expect(errorDetails.recoverable).toBe(true);
      expect(errorDetails.timestamp).toBeInstanceOf(Date);
    });

    it("includes technical details when provided", () => {
      const errorDetails = createErrorDetails(
        "NETWORK_ERROR",
        "Connection failed",
        {
          technicalDetails: "Stack trace here",
          httpStatus: 500,
        }
      );

      expect(errorDetails.technicalDetails).toBe("Stack trace here");
    });

    it("includes context when provided", () => {
      const context = { userId: "123", action: "login" };
      const errorDetails = createErrorDetails(
        "SESSION_EXPIRED",
        "Session expired",
        {
          context,
        }
      );

      expect(errorDetails.context).toEqual(context);
    });

    it("sets recoverable flag based on category and severity", () => {
      // Network errors are recoverable
      const networkError = createErrorDetails(
        "NETWORK_ERROR",
        "Network failed"
      );
      expect(networkError.recoverable).toBe(true);

      // Critical server errors are not recoverable
      const serverError = createErrorDetails(
        "INTERNAL_SERVER_ERROR",
        "Server error"
      );
      expect(serverError.recoverable).toBe(false);

      // High severity authentication errors (account locked) are not immediately recoverable
      const authError = createErrorDetails(
        "ACCOUNT_DISABLED",
        "Account disabled"
      );
      expect(authError.recoverable).toBe(false);
    });

    it("provides default recovery actions based on category", () => {
      const authError = createErrorDetails(
        "INVALID_CREDENTIALS",
        "Invalid credentials"
      );
      expect(authError.recoveryActions).toContain(
        "Check your credentials and try again"
      );
      expect(authError.recoveryActions).toContain(
        "Reset your password if needed"
      );

      const validationError = createErrorDetails(
        "INVALID_EMAIL",
        "Invalid email"
      );
      expect(validationError.recoveryActions).toContain(
        "Review the form fields and correct any errors"
      );

      const networkError = createErrorDetails("NETWORK_ERROR", "Network error");
      expect(networkError.recoveryActions).toContain(
        "Check your internet connection"
      );
    });
  });
});
