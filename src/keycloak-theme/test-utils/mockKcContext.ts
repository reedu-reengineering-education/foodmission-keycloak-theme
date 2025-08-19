import type { KcContext } from "../kcContext";
import type { KcContext as BaseKcContext } from "keycloakify/login/KcContext";

/**
 * Creates a base mock KcContext with all required Common properties
 */
export function createBaseMockKcContext(): BaseKcContext.Common {
  return {
    themeVersion: "1.0.0",
    keycloakifyVersion: "10.0.0",
    themeType: "login" as const,
    themeName: "foodmission",
    url: {
      loginAction: "#",
      resourcesPath: "/keycloakify-dev-resources",
      resourcesCommonPath: "/keycloakify-dev-resources/resources-common",
      loginRestartFlowUrl: "#",
      loginUrl: "#",
      ssoLoginInOtherTabsUrl: "#",
    },
    realm: {
      name: "foodmission-dev",
      displayName: "FOODMISSION Development",
      displayNameHtml: "FOODMISSION Development",
      internationalizationEnabled: true,
      registrationEmailAsUsername: false,
    },
    client: {
      clientId: "foodmission-app",
      name: "FOODMISSION Application",
      attributes: {},
    },
    messagesPerField: {
      printIfExists: <T extends string>(_fieldName: string, _text: T) =>
        undefined as T | undefined,
      existsError: () => false,
      get: () => "",
      exists: () => false,
      getFirstError: () => "",
    },
    properties: {},
    "x-keycloakify": {
      messages: {},
    },
    locale: {
      supported: [
        { languageTag: "en", label: "English", url: "#en" },
        { languageTag: "de", label: "Deutsch", url: "#de" },
      ],
      currentLanguageTag: "en",
    },
  };
}

/**
 * Creates a mock KcContext for login page
 */
export function createLoginMockKcContext(
  overrides?: Partial<Extract<KcContext, { pageId: "login.ftl" }>>
): Extract<KcContext, { pageId: "login.ftl" }> {
  return {
    ...createBaseMockKcContext(),
    pageId: "login.ftl" as const,
    url: {
      ...createBaseMockKcContext().url,
      loginResetCredentialsUrl: "#",
      registrationUrl: "#",
    },
    realm: {
      ...createBaseMockKcContext().realm,
      loginWithEmailAllowed: true,
      rememberMe: true,
      password: true,
      resetPasswordAllowed: true,
      registrationAllowed: true,
    },
    auth: {
      selectedCredential: undefined,
    },
    registrationDisabled: false,
    login: {
      username: "",
      rememberMe: "",
      password: "",
    },
    usernameHidden: false,
    social: {
      displayInfo: false,
      providers: [],
    },
    ...overrides,
  };
}

/**
 * Creates a mock KcContext for update profile page
 */
export function createUpdateProfileMockKcContext(
  overrides?: Partial<
    Extract<KcContext, { pageId: "login-update-profile.ftl" }>
  >
): Extract<KcContext, { pageId: "login-update-profile.ftl" }> {
  return {
    ...createBaseMockKcContext(),
    pageId: "login-update-profile.ftl" as const,
    profile: {
      attributesByName: {
        firstName: {
          name: "firstName",
          value: "John",
          required: true,
          readOnly: false,
          validators: {},
          annotations: {},
        },
        lastName: {
          name: "lastName",
          value: "Doe",
          required: true,
          readOnly: false,
          validators: {},
          annotations: {},
        },
        email: {
          name: "email",
          value: "john.doe@foodmission.eu",
          required: true,
          readOnly: false,
          validators: {},
          annotations: {},
        },
        username: {
          name: "username",
          value: "johndoe",
          required: true,
          readOnly: false,
          validators: {},
          annotations: {},
        },
      },
    },
    isAppInitiatedAction: false,
    ...overrides,
  };
}

/**
 * Creates a mock KcContext for register page
 */
export function createRegisterMockKcContext(
  overrides?: Partial<Extract<KcContext, { pageId: "register.ftl" }>>
): Extract<KcContext, { pageId: "register.ftl" }> {
  return {
    ...createBaseMockKcContext(),
    pageId: "register.ftl" as const,
    profile: {
      attributesByName: {},
    },
    passwordRequired: true,
    url: {
      ...createBaseMockKcContext().url,
      registrationAction: "#",
    },
    recaptchaRequired: false,
    recaptchaVisible: false,
    termsAcceptanceRequired: false,
    ...overrides,
  };
}

/**
 * Creates a mock KcContext for reset password page
 */
export function createResetPasswordMockKcContext(
  overrides?: Partial<
    Extract<KcContext, { pageId: "login-reset-password.ftl" }>
  >
): Extract<KcContext, { pageId: "login-reset-password.ftl" }> {
  return {
    ...createBaseMockKcContext(),
    pageId: "login-reset-password.ftl" as const,
    realm: {
      ...createBaseMockKcContext().realm,
      loginWithEmailAllowed: true,
      duplicateEmailsAllowed: false,
    },
    url: {
      ...createBaseMockKcContext().url,
      loginResetCredentialsUrl: "#",
    },
    auth: {
      attemptedUsername: "",
    },
    ...overrides,
  };
}

/**
 * Creates a mock KcContext for terms page
 */
export function createTermsMockKcContext(
  overrides?: Partial<Extract<KcContext, { pageId: "terms.ftl" }>>
): Extract<KcContext, { pageId: "terms.ftl" }> {
  return {
    ...createBaseMockKcContext(),
    pageId: "terms.ftl" as const,
    ...overrides,
  };
}

/**
 * Creates a mock KcContext for update password page
 */
export function createUpdatePasswordMockKcContext(
  overrides?: Partial<
    Extract<KcContext, { pageId: "login-update-password.ftl" }>
  >
): Extract<KcContext, { pageId: "login-update-password.ftl" }> {
  return {
    ...createBaseMockKcContext(),
    pageId: "login-update-password.ftl" as const,
    ...overrides,
  };
}

// Mock Keycloak contexts for local development and storybook
export const mockContexts = {
  login: createLoginMockKcContext(),
  register: createRegisterMockKcContext(),
  loginUpdateProfile: createUpdateProfileMockKcContext(),
  loginResetPassword: createResetPasswordMockKcContext(),
  loginUpdatePassword: createUpdatePasswordMockKcContext(),
  terms: createTermsMockKcContext(),
};

// Default context for development
export const mockKcContext = mockContexts.login;

// Development utilities
export const devUtils = {
  withMessage: (
    context: any,
    message: { type: "success" | "warning" | "error" | "info"; summary: string }
  ) => ({
    ...context,
    message,
  }),

  withError: (context: any, summary: string) =>
    devUtils.withMessage(context, { type: "error", summary }),
  withSuccess: (context: any, summary: string) =>
    devUtils.withMessage(context, { type: "success", summary }),
  withWarning: (context: any, summary: string) =>
    devUtils.withMessage(context, { type: "warning", summary }),
  withInfo: (context: any, summary: string) =>
    devUtils.withMessage(context, { type: "info", summary }),
};
