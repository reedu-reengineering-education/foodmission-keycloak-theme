/**
 * Type definitions for FOODMISSION theme configuration
 */

// Extend the global process interface for environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: "development" | "production" | "staging";
      FOODMISSION_LOGO_URL?: string;
      FOODMISSION_PRIMARY_COLOR?: string;
      FOODMISSION_SECONDARY_COLOR?: string;
      FOODMISSION_PROJECT_NAME?: string;
      FOODMISSION_SUPPORT_EMAIL?: string;
      FOODMISSION_PRIVACY_URL?: string;
      FOODMISSION_TERMS_URL?: string;
      FOODMISSION_SOCIAL_LOGIN?: string;
      FOODMISSION_SELF_REGISTRATION?: string;
      FOODMISSION_PASSWORD_RESET?: string;
    }
  }
}

// Deep partial type for configuration overrides
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export {};
