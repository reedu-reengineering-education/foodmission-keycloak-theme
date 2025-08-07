import { useEffect, useState } from "react";
import { FoodmissionThemeConfig } from "./theme-config";
import { DeepPartial } from "./types";
import { getThemeConfig, initializeThemeConfig } from "./config-loader";

/**
 * React hook for accessing FOODMISSION theme configuration
 * Provides reactive access to theme settings and ensures configuration is loaded
 */
export function useThemeConfig(
  customConfig?: DeepPartial<FoodmissionThemeConfig>
): FoodmissionThemeConfig {
  const [config, setConfig] = useState<FoodmissionThemeConfig | null>(null);

  useEffect(() => {
    try {
      // Initialize or get existing configuration
      const themeConfig = customConfig
        ? initializeThemeConfig(customConfig)
        : getThemeConfig();

      setConfig(themeConfig);
    } catch (error) {
      console.error("Failed to load theme configuration:", error);
      // Fallback to default configuration
      const fallbackConfig = initializeThemeConfig();
      setConfig(fallbackConfig);
    }
  }, [customConfig]);

  // Return the config or a default fallback
  return (
    config || {
      branding: {
        logoUrl: "/foodmission-logo.png",
        primaryColor: "hsl(142 76% 36%)",
        secondaryColor: "hsl(24 100% 50%)",
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
    }
  );
}

/**
 * Hook with loading state and reload functionality
 */
export function useThemeConfigWithState(
  customConfig?: DeepPartial<FoodmissionThemeConfig>
) {
  const [config, setConfig] = useState<FoodmissionThemeConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Initialize or get existing configuration
      const themeConfig = customConfig
        ? initializeThemeConfig(customConfig)
        : getThemeConfig();

      setConfig(themeConfig);
    } catch (error) {
      console.error("Failed to load theme configuration:", error);
      // Fallback to default configuration
      const fallbackConfig = initializeThemeConfig();
      setConfig(fallbackConfig);
    } finally {
      setIsLoading(false);
    }
  }, [customConfig]);

  return {
    config,
    isLoading,
    /**
     * Reload configuration with new custom settings
     */
    reloadConfig: (newCustomConfig?: DeepPartial<FoodmissionThemeConfig>) => {
      setIsLoading(true);
      try {
        const newConfig = initializeThemeConfig(newCustomConfig);
        setConfig(newConfig);
      } catch (error) {
        console.error("Failed to reload theme configuration:", error);
      } finally {
        setIsLoading(false);
      }
    },
  };
}

/**
 * Hook for accessing specific theme values with fallbacks
 */
export function useThemeValue<K extends keyof FoodmissionThemeConfig>(
  section: K
): FoodmissionThemeConfig[K] | null {
  const config = useThemeConfig();
  return config ? config[section] : null;
}

/**
 * Hook for accessing branding configuration specifically
 */
export function useBranding() {
  return useThemeValue("branding");
}

/**
 * Hook for accessing content configuration specifically
 */
export function useContent() {
  return useThemeValue("content");
}

/**
 * Hook for accessing feature flags specifically
 */
export function useFeatures() {
  return useThemeValue("features");
}
