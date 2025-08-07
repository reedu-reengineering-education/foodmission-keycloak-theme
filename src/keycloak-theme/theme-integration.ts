import { initializeThemeConfig } from "../lib/config-loader";
import {
  foodmissionThemeConfig,
  developmentConfig,
  stagingConfig,
  productionConfig,
} from "../config/foodmission-theme.config";
import { FoodmissionThemeConfig } from "../lib/theme-config";
import { DeepPartial } from "../lib/types";

/**
 * Keycloak Theme Integration for FOODMISSION
 *
 * This module handles the integration between the FOODMISSION theme configuration
 * and the Keycloak theme system, ensuring proper initialization and environment-specific
 * configuration loading.
 */

/**
 * Get environment-specific configuration
 */
function getEnvironmentConfig(): DeepPartial<FoodmissionThemeConfig> {
  const env =
    (typeof process !== "undefined" && process.env?.NODE_ENV) || "development";

  switch (env) {
    case "development":
      return developmentConfig;
    case "staging":
      return stagingConfig;
    case "production":
      return productionConfig;
    default:
      return {};
  }
}

/**
 * Initialize FOODMISSION theme for Keycloak
 * This should be called when the Keycloak theme is loaded
 */
export function initializeFoodmissionTheme(): FoodmissionThemeConfig {
  // Get environment-specific overrides
  const envConfig = getEnvironmentConfig();

  // Merge base configuration with environment overrides
  const mergedConfig = {
    ...foodmissionThemeConfig,
    ...envConfig,
  };

  // Initialize the theme configuration system
  const finalConfig = initializeThemeConfig(mergedConfig);

  // Add FOODMISSION-specific CSS classes to body for styling
  if (typeof document !== "undefined") {
    document.body.classList.add("foodmission-theme");
    document.body.classList.add(
      `foodmission-${
        (typeof process !== "undefined" && process.env?.NODE_ENV) ||
        "development"
      }`
    );
  }

  return finalConfig;
}

/**
 * CSS custom properties mapping for FOODMISSION theme
 * These will be applied to the document root for consistent styling
 */
export const cssCustomProperties = {
  "--foodmission-primary": "var(--foodmission-primary, 142 76% 36%)",
  "--foodmission-secondary": "var(--foodmission-secondary, 24 100% 50%)",
  "--foodmission-accent": "var(--foodmission-accent, 200 100% 40%)",
  "--foodmission-logo-url":
    "var(--foodmission-logo-url, url(/foodmission-logo.png))",

  // Semantic color mappings for shadcn/ui integration
  "--primary": "var(--foodmission-primary)",
  "--secondary": "var(--foodmission-secondary)",

  // Additional FOODMISSION brand colors (matching globals.css)
  "--foodmission-success": "120 100% 25%", // Dark green for success states
  "--foodmission-warning": "45 100% 51%", // Amber for warnings
  "--foodmission-error": "0 84% 60%", // Red for errors
  "--foodmission-info": "200 100% 40%", // Blue for information
};

/**
 * Apply FOODMISSION theme CSS custom properties
 */
export function applyFoodmissionCSSProperties(): void {
  const root = document.documentElement;

  Object.entries(cssCustomProperties).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}

/**
 * Theme initialization hook for React components
 * Call this in your main App component or theme root
 */
export function useFoodmissionThemeInitialization() {
  // This would need React import in the consuming component
  // Initialize theme on mount
  // React.useEffect(() => {
  //   initializeFoodmissionTheme();
  //   applyFoodmissionCSSProperties();
  // }, []);
}

// For non-React usage, export a simple initialization function
export function setupFoodmissionTheme(): void {
  initializeFoodmissionTheme();
  applyFoodmissionCSSProperties();
}
