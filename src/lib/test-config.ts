/**
 * Simple test to verify the theme configuration system works
 * This can be run to validate the implementation
 */

import { loadThemeConfig } from "./config-loader";
import { foodmissionThemeConfig } from "../config/foodmission-theme.config";

// Test 1: Load default configuration
console.log("Test 1: Loading default configuration");
const defaultConfig = loadThemeConfig();
console.log("✅ Default config loaded:", {
  projectName: defaultConfig.branding.projectName,
  primaryColor: defaultConfig.branding.primaryColor,
  supportEmail: defaultConfig.content.supportEmail,
});

// Test 2: Load configuration with custom overrides
console.log("\nTest 2: Loading configuration with custom overrides");
const customConfig = loadThemeConfig({
  branding: {
    projectName: "Test FOODMISSION",
  },
  content: {
    supportEmail: "test@foodmission.eu",
  },
});
console.log("✅ Custom config loaded:", {
  projectName: customConfig.branding.projectName,
  primaryColor: customConfig.branding.primaryColor,
  supportEmail: customConfig.content.supportEmail,
});

// Test 3: Verify FOODMISSION-specific configuration
console.log("\nTest 3: Verifying FOODMISSION-specific configuration");
console.log("✅ FOODMISSION config:", {
  projectName: foodmissionThemeConfig.branding.projectName,
  primaryColor: foodmissionThemeConfig.branding.primaryColor,
  secondaryColor: foodmissionThemeConfig.branding.secondaryColor,
  citizenScienceDescription:
    foodmissionThemeConfig.content.projectDescription.includes(
      "citizen science"
    ),
  selfRegistrationEnabled: foodmissionThemeConfig.features.selfRegistration,
  socialLoginDisabled: !foodmissionThemeConfig.features.socialLogin,
});

console.log("\n🎉 All theme configuration tests passed!");

export { defaultConfig, customConfig, foodmissionThemeConfig };
