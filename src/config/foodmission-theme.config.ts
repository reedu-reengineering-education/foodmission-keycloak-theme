import { FoodmissionThemeConfig } from "../lib/theme-config";
import { DeepPartial } from "../lib/types";

/**
 * FOODMISSION Project Theme Configuration
 *
 * This file contains the specific branding and configuration settings
 * for the FOODMISSION citizen science project Keycloak theme.
 *
 * Customize these values to match your deployment environment
 * or override them using environment variables.
 */

export const foodmissionThemeConfig: FoodmissionThemeConfig = {
  branding: {
    logoUrl: "/foodmission-logo.png",
    primaryColor: "hsl(142 76% 36%)", // FOODMISSION green for sustainability/food
    secondaryColor: "hsl(24 100% 50%)", // FOODMISSION orange for energy/nutrition
    projectName: "FOODMISSION",
  },
  content: {
    welcomeMessage: "Welcome to FOODMISSION",
    projectDescription:
      "Join our citizen science initiative to promote healthy food consumption and reduce food waste across Europe. Together, we can make a difference for our planet and our health.",
    supportEmail: "support@foodmission.eu",
    privacyPolicyUrl: "https://foodmission.eu/privacy-policy",
    termsOfServiceUrl: "https://foodmission.eu/terms-of-service",
  },
  features: {
    socialLogin: false, // Disabled by default for security in citizen science context
    selfRegistration: true, // Allow citizens to register themselves
    passwordReset: true, // Enable password recovery for user convenience
  },
};

/**
 * Environment-specific configuration overrides
 * These can be used to customize the theme for different deployment environments
 */

export const developmentConfig: DeepPartial<FoodmissionThemeConfig> = {
  branding: {
    projectName: "FOODMISSION (Development)",
  },
  content: {
    supportEmail: "dev-support@foodmission.eu",
  },
};

export const stagingConfig: DeepPartial<FoodmissionThemeConfig> = {
  branding: {
    projectName: "FOODMISSION (Staging)",
  },
  content: {
    supportEmail: "staging-support@foodmission.eu",
  },
};

export const productionConfig: DeepPartial<FoodmissionThemeConfig> = {
  // Production uses the base configuration
  // Add any production-specific overrides here if needed
};
