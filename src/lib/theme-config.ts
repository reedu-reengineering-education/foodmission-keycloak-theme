/**
 * FOODMISSION Theme Configuration Interface
 * Defines the structure for theme customization settings
 */

export interface FoodmissionThemeConfig {
  branding: {
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
    projectName: string;
  };
  content: {
    welcomeMessage: string;
    projectDescription: string;
    supportEmail: string;
    privacyPolicyUrl: string;
    termsOfServiceUrl: string;
  };
  features: {
    socialLogin: boolean;
    selfRegistration: boolean;
    passwordReset: boolean;
  };
}

/**
 * Default FOODMISSION theme configuration
 * Contains the base branding and content settings for the project
 */
export const defaultFoodmissionConfig: FoodmissionThemeConfig = {
  branding: {
    logoUrl: "/foodmission-logo.png",
    primaryColor: "hsl(142 76% 36%)", // FOODMISSION green for sustainability/food
    secondaryColor: "hsl(24 100% 50%)", // FOODMISSION orange for energy/nutrition
    projectName: "FOODMISSION",
  },
  content: {
    welcomeMessage: "Welcome to FOODMISSION",
    projectDescription:
      "Join our citizen science initiative to promote healthy food consumption and reduce food waste across Europe.",
    supportEmail: "support@foodmission.eu",
    privacyPolicyUrl: "https://foodmission.eu/privacy",
    termsOfServiceUrl: "https://foodmission.eu/terms",
  },
  features: {
    socialLogin: false,
    selfRegistration: true,
    passwordReset: true,
  },
};
