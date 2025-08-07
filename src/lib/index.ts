/**
 * FOODMISSION Theme Configuration System
 *
 * This module provides a complete theme configuration system for the FOODMISSION
 * Keycloak theme, including TypeScript interfaces, configuration loading,
 * and React hooks for theme customization.
 */

// Core configuration types and defaults
export type { FoodmissionThemeConfig } from "./theme-config";
export { defaultFoodmissionConfig } from "./theme-config";

// Configuration loading and management utilities
export {
  loadThemeConfig,
  applyThemeConfig,
  getThemeConfig,
  initializeThemeConfig,
} from "./config-loader";

// React hooks for theme configuration
export {
  useThemeConfig,
  useThemeValue,
  useBranding,
  useContent,
  useFeatures,
} from "./use-theme-config";

// Utility functions
export { cn } from "./utils";
