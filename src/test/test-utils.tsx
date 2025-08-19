import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { vi } from "vitest";

// Mock i18n messages for tests
export const mockI18nMessages: Record<string, string> = {
  "auth.login.title": "Sign in to FOODMISSION",
  "auth.login.subtitle": "Access your citizen science dashboard",
  "auth.register.title": "Join FOODMISSION",
  "auth.register.subtitle": "Become part of our citizen science community",
  "login.username": "Username or Email",
  "login.password": "Password",
  "login.rememberMe": "Remember me",
  "login.signIn": "Sign In",
  "login.forgotPassword": "Forgot password?",
  "login.noAccount": "Don't have an account?",
  "login.createAccount": "Create one here",
  "common.loading": "Loading...",
  "common.error": "Error",
  "common.success": "Success",
  "register.firstName": "First Name",
  "register.lastName": "Last Name",
  "register.email": "Email Address",
  "register.password": "Password",
  "register.confirmPassword": "Confirm Password",
  "register.joinProject": "Join FOODMISSION",
  "register.agreeTerms": "I agree to the Terms and Conditions",
  "error.general.title": "Something went wrong",
  "error.general.message": "An unexpected error occurred. Please try again.",
  "error.network.title": "Connection Error",
  "error.network.message":
    "Unable to connect to the server. Please check your internet connection.",
};

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div data-testid="test-wrapper">{children}</div>;
};

// Custom render function with common providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: TestWrapper, ...options });

// Setup function for common test mocks
export const setupTestMocks = () => {
  // Mock i18n hook
  vi.mock("../keycloak-theme/i18n", () => ({
    useI18n: () => ({
      i18n: {
        msgStr: (key: string) => mockI18nMessages[key] || key,
      },
    }),
  }));

  // Mock window.matchMedia
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock IntersectionObserver
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
};

// Utility functions for testing
export const createMockKcContext = (overrides = {}) => ({
  url: {
    loginAction: "#",
    registrationAction: "#",
    loginResetCredentialsUrl: "#",
    loginUrl: "#",
    registrationUrl: "#",
    logoutUrl: "#",
    resourcesPath: "/keycloakify-dev-resources",
    resourcesCommonPath: "/keycloakify-dev-resources/resources-common",
  },
  realm: {
    name: "foodmission-test",
    displayName: "FOODMISSION Test",
    displayNameHtml: "FOODMISSION Test",
    internationalizationEnabled: true,
    registrationAllowed: true,
    resetPasswordAllowed: true,
    rememberMe: true,
    loginWithEmailAllowed: true,
    duplicateEmailsAllowed: false,
  },
  client: {
    clientId: "foodmission-app",
    name: "FOODMISSION Application",
    baseUrl: "http://localhost:3000",
  },
  locale: {
    current: "en",
    supported: [
      { languageTag: "en", label: "English", href: "#" },
      { languageTag: "de", label: "Deutsch", href: "#" },
    ],
  },
  auth: {
    showUsername: false,
    showResetCredentials: true,
    showTryAnotherWayLink: false,
    attemptedUsername: "",
  },
  social: {
    providers: [],
  },
  message: undefined,
  messagesPerField: {},
  isAppInitiatedAction: false,
  pageId: "login.ftl" as const,
  ...overrides,
});

// Accessibility testing utilities
export const checkAccessibility = async () => {
  // Mock axe for testing
  return { violations: [] };
};

// Performance testing utilities
export const measureRenderTime = (renderFn: () => void) => {
  const start = performance.now();
  renderFn();
  const end = performance.now();
  return end - start;
};

// Export everything including the custom render
export * from "@testing-library/react";
export { customRender as render };
