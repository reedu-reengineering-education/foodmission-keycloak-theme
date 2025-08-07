import {
  createLoginMockKcContext,
  createRegisterMockKcContext,
  createUpdateProfileMockKcContext,
  createResetPasswordMockKcContext,
  createTermsMockKcContext,
  createUpdatePasswordMockKcContext,
} from "../keycloak-theme/test-utils/mockKcContext";

// Mock Keycloak contexts for local development
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
