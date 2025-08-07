import { defineConfig } from "keycloakify/bin/keycloakify";

export default defineConfig({
  themeName: "foodmission",
  bundler: "vite",
  accountThemeImplementation: "Single-Page",
  keycloakVersionTargets: {
    "21-and-below": false,
    "22": false,
    "23": false,
    "24": false,
    "25": true,
  },
  extraThemeProperties: [
    "projectName=FOODMISSION",
    "projectDescription=EU-funded citizen science project for healthy food consumption and food waste reduction",
    "supportEmail=support@foodmission.eu",
    "privacyPolicyUrl=https://foodmission.eu/privacy",
    "termsOfServiceUrl=https://foodmission.eu/terms",
    "logoUrl=/logo-foodmission.png",
  ],
  environmentVariables: [
    { name: "MY_ENV_VARIABLE", default: "default value" },
    { name: "MY_OTHER_ENV_VARIABLE", default: "default value" },
  ],
  buildOptions: {
    bundleSize: {
      limit: "3MB",
    },
    assetInlining: {
      disable: false,
    },
  },
});
