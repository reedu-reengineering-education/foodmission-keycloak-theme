import { describe, it, expect, vi, beforeEach } from "vitest";
import { createRecoveryActions, executeRecoveryAction } from "../errorRecovery";
import { createErrorDetails } from "../errorCategorization";

// Mock window methods
const mockReload = vi.fn();
const mockBack = vi.fn();
Object.defineProperty(window, "location", {
  value: {
    reload: mockReload,
    href: "",
  },
  writable: true,
});

Object.defineProperty(window, "history", {
  value: {
    back: mockBack,
    length: 2,
  },
  writable: true,
});

// Mock document methods
Object.defineProperty(document, "querySelector", {
  value: vi.fn(),
  writable: true,
});

// Mock localStorage and sessionStorage
Object.defineProperty(window, "localStorage", {
  value: {
    removeItem: vi.fn(),
  },
  writable: true,
});

Object.defineProperty(window, "sessionStorage", {
  value: {
    clear: vi.fn(),
  },
  writable: true,
});

describe("errorRecovery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.location.href = "";
  });

  describe("createRecoveryActions", () => {
    it("creates authentication-specific recovery actions", () => {
      const errorDetails = createErrorDetails(
        "INVALID_CREDENTIALS",
        "Invalid credentials"
      );
      const actions = createRecoveryActions(errorDetails, {
        baseUrl: "https://example.com",
        supportEmail: "support@example.com",
      });

      const resetPasswordAction = actions.find(
        (a) => a.id === "reset-password"
      );
      expect(resetPasswordAction).toBeDefined();
      expect(resetPasswordAction?.label).toBe("Reset Password");
      expect(resetPasswordAction?.type).toBe("navigate");
    });

    it("creates registration action for user not found errors", () => {
      const errorDetails = createErrorDetails(
        "USER_NOT_FOUND",
        "User not found"
      );
      const actions = createRecoveryActions(errorDetails, {
        baseUrl: "https://example.com",
      });

      const registerAction = actions.find((a) => a.id === "register");
      expect(registerAction).toBeDefined();
      expect(registerAction?.label).toBe("Create Account");
      expect(registerAction?.primary).toBe(true);
    });

    it("creates validation-specific recovery actions", () => {
      const errorDetails = createErrorDetails(
        "INVALID_EMAIL",
        "Invalid email format"
      );
      const actions = createRecoveryActions(errorDetails);

      const correctFormAction = actions.find((a) => a.id === "correct-form");
      expect(correctFormAction).toBeDefined();
      expect(correctFormAction?.label).toBe("Correct Form");
      expect(correctFormAction?.primary).toBe(true);
    });

    it("creates network-specific recovery actions", () => {
      const errorDetails = createErrorDetails(
        "NETWORK_ERROR",
        "Network connection failed"
      );
      const actions = createRecoveryActions(errorDetails);

      const retryAction = actions.find((a) => a.id === "retry-connection");
      expect(retryAction).toBeDefined();
      expect(retryAction?.label).toBe("Check Connection & Retry");
      expect(retryAction?.type).toBe("retry");
      expect(retryAction?.primary).toBe(true);
    });

    it("creates session-specific recovery actions", () => {
      const errorDetails = createErrorDetails(
        "SESSION_EXPIRED",
        "Session expired"
      );
      const actions = createRecoveryActions(errorDetails, {
        baseUrl: "https://example.com",
      });

      const loginAction = actions.find((a) => a.id === "login-again");
      expect(loginAction).toBeDefined();
      expect(loginAction?.label).toBe("Log In Again");
      expect(loginAction?.primary).toBe(true);
    });

    it("creates server-specific recovery actions for high severity errors", () => {
      const errorDetails = createErrorDetails(
        "INTERNAL_SERVER_ERROR",
        "Internal server error"
      );
      const actions = createRecoveryActions(errorDetails);

      const waitAction = actions.find((a) => a.id === "wait-and-retry");
      expect(waitAction).toBeDefined();
      expect(waitAction?.label).toBe("Try Again Later");
      expect(waitAction?.primary).toBe(true);
    });

    it("creates configuration-specific recovery actions", () => {
      const errorDetails = createErrorDetails(
        "INVALID_CLIENT",
        "Invalid client configuration"
      );
      const actions = createRecoveryActions(errorDetails, {
        supportEmail: "admin@example.com",
      });

      const contactAdminAction = actions.find((a) => a.id === "contact-admin");
      expect(contactAdminAction).toBeDefined();
      expect(contactAdminAction?.label).toBe("Contact Administrator");
      expect(contactAdminAction?.primary).toBe(true);
    });

    it("includes retry action for recoverable errors", () => {
      const errorDetails = createErrorDetails("NETWORK_ERROR", "Network error");
      const actions = createRecoveryActions(errorDetails);

      const retryAction = actions.find((a) => a.id === "retry");
      expect(retryAction).toBeDefined();
      expect(retryAction?.type).toBe("retry");
    });

    it("includes navigation actions", () => {
      const errorDetails = createErrorDetails("UNKNOWN_ERROR", "Unknown error");
      const actions = createRecoveryActions(errorDetails, {
        baseUrl: "https://example.com",
        currentPage: "login",
      });

      const homeAction = actions.find((a) => a.id === "go-home");
      expect(homeAction).toBeDefined();
      expect(homeAction?.label).toBe("Go to Homepage");

      const backAction = actions.find((a) => a.id === "go-back");
      expect(backAction).toBeDefined();
      expect(backAction?.label).toBe("Go Back");
    });

    it("includes support contact action when email provided", () => {
      const errorDetails = createErrorDetails("UNKNOWN_ERROR", "Unknown error");
      const actions = createRecoveryActions(errorDetails, {
        supportEmail: "support@example.com",
      });

      const supportAction = actions.find((a) => a.id === "contact-support");
      expect(supportAction).toBeDefined();
      expect(supportAction?.label).toBe("Contact Support");
      expect(supportAction?.type).toBe("contact");
    });

    it("does not include back action for home page", () => {
      const errorDetails = createErrorDetails("UNKNOWN_ERROR", "Unknown error");
      const actions = createRecoveryActions(errorDetails, {
        currentPage: "home",
      });

      const backAction = actions.find((a) => a.id === "go-back");
      expect(backAction).toBeUndefined();
    });
  });

  describe("executeRecoveryAction", () => {
    it("executes retry action successfully", async () => {
      const action = {
        id: "retry",
        label: "Try Again",
        type: "retry" as const,
        handler: vi.fn(),
      };

      await executeRecoveryAction(action);
      expect(action.handler).toHaveBeenCalledTimes(1);
    });

    it("executes navigate action successfully", async () => {
      const action = {
        id: "go-home",
        label: "Go Home",
        type: "navigate" as const,
        handler: vi.fn(),
      };

      await executeRecoveryAction(action);
      expect(action.handler).toHaveBeenCalledTimes(1);
    });

    it("handles async action handlers", async () => {
      const asyncHandler = vi.fn().mockResolvedValue(undefined);
      const action = {
        id: "async-action",
        label: "Async Action",
        type: "custom" as const,
        handler: asyncHandler,
      };

      await executeRecoveryAction(action);
      expect(asyncHandler).toHaveBeenCalledTimes(1);
    });

    it("handles action execution errors gracefully", async () => {
      const failingHandler = vi
        .fn()
        .mockRejectedValue(new Error("Action failed"));
      const action = {
        id: "failing-action",
        label: "Failing Action",
        type: "custom" as const,
        handler: failingHandler,
      };

      // Should not throw
      await expect(executeRecoveryAction(action)).resolves.toBeUndefined();
      expect(failingHandler).toHaveBeenCalledTimes(1);
      expect(mockReload).toHaveBeenCalledTimes(1); // Fallback to reload
    });

    it("does not fallback to reload for retry actions that fail", async () => {
      const failingHandler = vi
        .fn()
        .mockRejectedValue(new Error("Retry failed"));
      const action = {
        id: "retry",
        label: "Try Again",
        type: "retry" as const,
        handler: failingHandler,
      };

      await executeRecoveryAction(action);
      expect(failingHandler).toHaveBeenCalledTimes(1);
      expect(mockReload).not.toHaveBeenCalled(); // No fallback for retry actions
    });
  });

  describe("specific recovery action handlers", () => {
    it("reset password action navigates correctly", () => {
      const errorDetails = createErrorDetails(
        "INVALID_CREDENTIALS",
        "Invalid credentials"
      );
      const actions = createRecoveryActions(errorDetails, {
        baseUrl: "https://example.com",
      });

      const resetAction = actions.find((a) => a.id === "reset-password");
      resetAction?.handler();

      expect(window.location.href).toBe("https://example.com/reset-password");
    });

    it("login again action clears storage and navigates", () => {
      const errorDetails = createErrorDetails(
        "SESSION_EXPIRED",
        "Session expired"
      );
      const actions = createRecoveryActions(errorDetails, {
        baseUrl: "https://example.com",
      });

      const loginAction = actions.find((a) => a.id === "login-again");
      loginAction?.handler();

      expect(window.localStorage.removeItem).toHaveBeenCalledWith(
        "access_token"
      );
      expect(window.sessionStorage.clear).toHaveBeenCalledTimes(1);
      expect(window.location.href).toBe("https://example.com/login");
    });

    it("correct form action focuses on invalid field", () => {
      const mockElement = { focus: vi.fn() };
      (document.querySelector as any).mockReturnValue(mockElement);

      const errorDetails = createErrorDetails("INVALID_EMAIL", "Invalid email");
      const actions = createRecoveryActions(errorDetails);

      const correctFormAction = actions.find((a) => a.id === "correct-form");
      correctFormAction?.handler();

      expect(document.querySelector).toHaveBeenCalledWith(
        '[aria-invalid="true"]'
      );
      expect(mockElement.focus).toHaveBeenCalledTimes(1);
    });

    it("go back action uses history when available", () => {
      const errorDetails = createErrorDetails("UNKNOWN_ERROR", "Unknown error");
      const actions = createRecoveryActions(errorDetails, {
        currentPage: "login",
      });

      const backAction = actions.find((a) => a.id === "go-back");
      backAction?.handler();

      expect(mockBack).toHaveBeenCalledTimes(1);
    });

    it("go back action navigates to base URL when no history", () => {
      Object.defineProperty(window, "history", {
        value: { length: 1 },
        writable: true,
      });

      const errorDetails = createErrorDetails("UNKNOWN_ERROR", "Unknown error");
      const actions = createRecoveryActions(errorDetails, {
        currentPage: "login",
        baseUrl: "https://example.com",
      });

      const backAction = actions.find((a) => a.id === "go-back");
      backAction?.handler();

      expect(window.location.href).toBe("https://example.com");
    });

    it("support contact action creates proper mailto link", () => {
      const errorDetails = createErrorDetails(
        "UNKNOWN_ERROR",
        "Unknown error",
        {
          technicalDetails: "Stack trace here",
        }
      );
      const actions = createRecoveryActions(errorDetails, {
        supportEmail: "support@example.com",
      });

      const supportAction = actions.find((a) => a.id === "contact-support");
      supportAction?.handler();

      expect(window.location.href).toContain("mailto:support@example.com");
      expect(window.location.href).toContain(
        "Error%20Report%3A%20UNKNOWN_ERROR"
      );
      expect(window.location.href).toContain("Unknown%20error");
    });
  });
});
