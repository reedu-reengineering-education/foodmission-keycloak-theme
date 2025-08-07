import {
  FoodmissionThemeConfig,
  defaultFoodmissionConfig,
} from "./theme-config";
import { DeepPartial } from "./types";

/**
 * Configuration loader utility for FOODMISSION theme
 * Handles loading, merging, and applying theme configurations at runtime
 */

/**
 * Deep merge utility for configuration objects
 */
function deepMerge<T extends Record<string, any>>(
  target: T,
  source: DeepPartial<T>
): T {
  const result = { ...target };

  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(result[key] || ({} as any), source[key] as any);
    } else if (source[key] !== undefined) {
      result[key] = source[key] as any;
    }
  }

  return result;
}

/**
 * Load theme configuration from various sources
 * Priority: Environment variables > Custom config > Default config
 */
export function loadThemeConfig(
  customConfig?: DeepPartial<FoodmissionThemeConfig>
): FoodmissionThemeConfig {
  let config = { ...defaultFoodmissionConfig };

  // Merge custom configuration if provided
  if (customConfig) {
    config = deepMerge(config, customConfig);
  }

  // Override with environment variables if available (only in Node.js environment)
  if (typeof process !== "undefined" && process.env) {
    const envConfig: DeepPartial<FoodmissionThemeConfig> = {};

    // Branding overrides from environment
    if (
      process.env.FOODMISSION_LOGO_URL ||
      process.env.FOODMISSION_PRIMARY_COLOR ||
      process.env.FOODMISSION_SECONDARY_COLOR ||
      process.env.FOODMISSION_PROJECT_NAME
    ) {
      envConfig.branding = {};

      if (process.env.FOODMISSION_LOGO_URL) {
        envConfig.branding.logoUrl = process.env.FOODMISSION_LOGO_URL;
      }
      if (process.env.FOODMISSION_PRIMARY_COLOR) {
        envConfig.branding.primaryColor = process.env.FOODMISSION_PRIMARY_COLOR;
      }
      if (process.env.FOODMISSION_SECONDARY_COLOR) {
        envConfig.branding.secondaryColor =
          process.env.FOODMISSION_SECONDARY_COLOR;
      }
      if (process.env.FOODMISSION_PROJECT_NAME) {
        envConfig.branding.projectName = process.env.FOODMISSION_PROJECT_NAME;
      }
    }

    // Content overrides from environment
    if (
      process.env.FOODMISSION_SUPPORT_EMAIL ||
      process.env.FOODMISSION_PRIVACY_URL ||
      process.env.FOODMISSION_TERMS_URL
    ) {
      envConfig.content = {};

      if (process.env.FOODMISSION_SUPPORT_EMAIL) {
        envConfig.content.supportEmail = process.env.FOODMISSION_SUPPORT_EMAIL;
      }
      if (process.env.FOODMISSION_PRIVACY_URL) {
        envConfig.content.privacyPolicyUrl =
          process.env.FOODMISSION_PRIVACY_URL;
      }
      if (process.env.FOODMISSION_TERMS_URL) {
        envConfig.content.termsOfServiceUrl = process.env.FOODMISSION_TERMS_URL;
      }
    }

    // Feature toggles from environment
    if (
      process.env.FOODMISSION_SOCIAL_LOGIN !== undefined ||
      process.env.FOODMISSION_SELF_REGISTRATION !== undefined ||
      process.env.FOODMISSION_PASSWORD_RESET !== undefined
    ) {
      envConfig.features = {};

      if (process.env.FOODMISSION_SOCIAL_LOGIN !== undefined) {
        envConfig.features.socialLogin =
          process.env.FOODMISSION_SOCIAL_LOGIN === "true";
      }
      if (process.env.FOODMISSION_SELF_REGISTRATION !== undefined) {
        envConfig.features.selfRegistration =
          process.env.FOODMISSION_SELF_REGISTRATION === "true";
      }
      if (process.env.FOODMISSION_PASSWORD_RESET !== undefined) {
        envConfig.features.passwordReset =
          process.env.FOODMISSION_PASSWORD_RESET === "true";
      }
    }

    // Apply environment overrides
    if (Object.keys(envConfig).length > 0) {
      config = deepMerge(config, envConfig);
    }
  }

  return config;
}

/**
 * Apply theme configuration to CSS custom properties
 * This allows runtime customization of colors and other CSS variables
 */
export function applyThemeConfig(config: FoodmissionThemeConfig): void {
  if (typeof document === "undefined") return; // Skip in non-browser environments

  const root = document.documentElement;

  // Apply color variables
  root.style.setProperty("--foodmission-primary", config.branding.primaryColor);
  root.style.setProperty(
    "--foodmission-secondary",
    config.branding.secondaryColor
  );

  // Apply branding variables
  root.style.setProperty(
    "--foodmission-logo-url",
    `url(${config.branding.logoUrl})`
  );

  // Store configuration in global scope for component access
  (window as any).__FOODMISSION_CONFIG__ = config;
}

/**
 * Get the current theme configuration
 * Returns the configuration stored in global scope or loads default
 */
export function getThemeConfig(): FoodmissionThemeConfig {
  if (typeof window !== "undefined" && (window as any).__FOODMISSION_CONFIG__) {
    return (window as any).__FOODMISSION_CONFIG__;
  }
  return loadThemeConfig();
}

/**
 * Initialize theme configuration system
 * Should be called early in the application lifecycle
 */
export function initializeThemeConfig(
  customConfig?: DeepPartial<FoodmissionThemeConfig>
): FoodmissionThemeConfig {
  const config = loadThemeConfig(customConfig);
  applyThemeConfig(config);
  return config;
}
