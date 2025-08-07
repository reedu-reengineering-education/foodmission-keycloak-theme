import { describe, it, expect } from "vitest";
import {
  getLocalizedErrorMessage,
  getAvailableLocales,
  ERROR_MESSAGES,
} from "../errorMessages";

describe("errorMessages", () => {
  describe("getLocalizedErrorMessage", () => {
    it("returns correct message for valid error code and locale", () => {
      const message = getLocalizedErrorMessage("INVALID_CREDENTIALS", "en");
      expect(message).toBe(
        "Invalid username or password. Please check your credentials and try again."
      );
    });

    it("returns Spanish message when locale is es", () => {
      const message = getLocalizedErrorMessage("INVALID_CREDENTIALS", "es");
      expect(message).toBe(
        "Nombre de usuario o contraseña inválidos. Por favor, verifica tus credenciales e inténtalo de nuevo."
      );
    });

    it("returns French message when locale is fr", () => {
      const message = getLocalizedErrorMessage("ACCOUNT_DISABLED", "fr");
      expect(message).toBe(
        "Votre compte a été désactivé. Veuillez contacter le support pour obtenir de l'aide."
      );
    });

    it("returns German message when locale is de", () => {
      const message = getLocalizedErrorMessage("PASSWORD_TOO_WEAK", "de");
      expect(message).toBe(
        "Das Passwort erfüllt nicht die Sicherheitsanforderungen. Bitte wählen Sie ein stärkeres Passwort."
      );
    });

    it("returns Italian message when locale is it", () => {
      const message = getLocalizedErrorMessage("NETWORK_ERROR", "it");
      expect(message).toBe(
        "Errore di connessione di rete. Controlla la tua connessione internet e riprova."
      );
    });

    it("falls back to English when requested locale is not available", () => {
      const message = getLocalizedErrorMessage("INVALID_CREDENTIALS", "pt");
      expect(message).toBe(
        "Invalid username or password. Please check your credentials and try again."
      );
    });

    it("falls back to English when error code exists but locale does not", () => {
      const message = getLocalizedErrorMessage("SESSION_EXPIRED", "zh");
      expect(message).toBe(
        "Your session has expired for security reasons. Please log in again."
      );
    });

    it("uses fallback message when error code does not exist", () => {
      const fallback = "Custom fallback message";
      const message = getLocalizedErrorMessage(
        "NON_EXISTENT_CODE",
        "en",
        fallback
      );
      expect(message).toBe(fallback);
    });

    it("uses generic unknown error message when no fallback provided and code does not exist", () => {
      const message = getLocalizedErrorMessage("NON_EXISTENT_CODE", "en");
      expect(message).toBe(
        "An unexpected error occurred. Please try again or contact support if the problem persists."
      );
    });

    it("uses generic unknown error message in requested locale when available", () => {
      const message = getLocalizedErrorMessage("NON_EXISTENT_CODE", "es");
      expect(message).toBe(
        "Ocurrió un error inesperado. Por favor, inténtalo de nuevo o contacta con soporte si el problema persiste."
      );
    });

    it("defaults to English locale when not specified", () => {
      const message = getLocalizedErrorMessage("INVALID_EMAIL");
      expect(message).toBe("Please enter a valid email address.");
    });
  });

  describe("getAvailableLocales", () => {
    it("returns all available locales", () => {
      const locales = getAvailableLocales();
      expect(locales).toContain("en");
      expect(locales).toContain("es");
      expect(locales).toContain("fr");
      expect(locales).toContain("de");
      expect(locales).toContain("it");
    });

    it("returns locales in sorted order", () => {
      const locales = getAvailableLocales();
      const sortedLocales = [...locales].sort();
      expect(locales).toEqual(sortedLocales);
    });

    it("returns unique locales only", () => {
      const locales = getAvailableLocales();
      const uniqueLocales = [...new Set(locales)];
      expect(locales).toEqual(uniqueLocales);
    });
  });

  describe("ERROR_MESSAGES structure", () => {
    it("has consistent locale coverage for authentication errors", () => {
      const authErrors = [
        "INVALID_CREDENTIALS",
        "ACCOUNT_DISABLED",
        "USER_NOT_FOUND",
      ];
      const expectedLocales = ["en", "es", "fr", "de", "it"];

      authErrors.forEach((errorCode) => {
        expect(ERROR_MESSAGES[errorCode]).toBeDefined();
        expectedLocales.forEach((locale) => {
          expect(ERROR_MESSAGES[errorCode][locale]).toBeDefined();
          expect(ERROR_MESSAGES[errorCode][locale]).toBeTruthy();
        });
      });
    });

    it("has consistent locale coverage for validation errors", () => {
      const validationErrors = [
        "INVALID_EMAIL",
        "PASSWORD_TOO_WEAK",
        "REQUIRED_FIELD_MISSING",
      ];
      const expectedLocales = ["en", "es", "fr", "de", "it"];

      validationErrors.forEach((errorCode) => {
        expect(ERROR_MESSAGES[errorCode]).toBeDefined();
        expectedLocales.forEach((locale) => {
          expect(ERROR_MESSAGES[errorCode][locale]).toBeDefined();
          expect(ERROR_MESSAGES[errorCode][locale]).toBeTruthy();
        });
      });
    });

    it("has consistent locale coverage for network errors", () => {
      const networkErrors = [
        "NETWORK_ERROR",
        "CONNECTION_TIMEOUT",
        "SERVICE_UNAVAILABLE",
      ];
      const expectedLocales = ["en", "es", "fr", "de", "it"];

      networkErrors.forEach((errorCode) => {
        expect(ERROR_MESSAGES[errorCode]).toBeDefined();
        expectedLocales.forEach((locale) => {
          expect(ERROR_MESSAGES[errorCode][locale]).toBeDefined();
          expect(ERROR_MESSAGES[errorCode][locale]).toBeTruthy();
        });
      });
    });

    it("has UNKNOWN_ERROR message for all locales", () => {
      const expectedLocales = ["en", "es", "fr", "de", "it"];

      expect(ERROR_MESSAGES.UNKNOWN_ERROR).toBeDefined();
      expectedLocales.forEach((locale) => {
        expect(ERROR_MESSAGES.UNKNOWN_ERROR[locale]).toBeDefined();
        expect(ERROR_MESSAGES.UNKNOWN_ERROR[locale]).toBeTruthy();
      });
    });

    it("has meaningful error messages that are not empty", () => {
      Object.entries(ERROR_MESSAGES).forEach(([_errorCode, messages]) => {
        Object.entries(messages).forEach(([_locale, message]) => {
          expect(message.length).toBeGreaterThan(10); // Reasonable minimum length
          expect(message).not.toMatch(/^\s*$/); // Not just whitespace
        });
      });
    });
  });
});
