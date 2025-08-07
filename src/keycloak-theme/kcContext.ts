import { createGetKcContextMock } from "keycloakify/login/KcContext";
import type { KcContext as KcContextBase } from "keycloakify/login/KcContext";

// Extend the base KcContext with custom properties
export type KcContext = KcContextBase & {
  properties?: {
    projectName?: string;
    projectDescription?: string;
    supportEmail?: string;
    privacyPolicyUrl?: string;
    termsOfServiceUrl?: string;
    logoUrl?: string;
  };
};

// Check if we're in a Keycloak environment (production)
const kcContextFromWindow = (window as any).kcContext as KcContext | undefined;

// Create the mock context function
const { getKcContextMock } = createGetKcContextMock({
  kcContextExtension: {} as KcContext,
  overrides: {
    realm: {
      name: "foodmission-dev",
      displayName: "FOODMISSION Development",
      displayNameHtml: "FOODMISSION Development",
      internationalizationEnabled: true,
      registrationEmailAsUsername: true,
    },
    locale: {
      currentLanguageTag: "en",
      supported: [
        { languageTag: "cs", label: "Čeština", url: "#" },
        { languageTag: "da", label: "Dansk", url: "#" },
        { languageTag: "de", label: "Deutsch", url: "#" },
        { languageTag: "en", label: "English", url: "#" },
        { languageTag: "es", label: "Español", url: "#" },
        { languageTag: "fi", label: "Suomi", url: "#" },
        { languageTag: "fr", label: "Français", url: "#" },
        { languageTag: "hu", label: "Magyar", url: "#" },
        { languageTag: "it", label: "Italiano", url: "#" },
        { languageTag: "nl", label: "Nederlands", url: "#" },
        { languageTag: "no", label: "Norsk", url: "#" },
        { languageTag: "pl", label: "Polski", url: "#" },
        { languageTag: "pt", label: "Português", url: "#" },
        { languageTag: "sv", label: "Svenska", url: "#" },
      ],
    },
    client: {
      clientId: "foodmission-app",
      name: "FOODMISSION Application",
      attributes: {},
    },
    properties: {
      projectName: "FOODMISSION",
      projectDescription:
        "EU-funded citizen science project for healthy food consumption and food waste reduction",
      supportEmail: "support@foodmission.eu",
      privacyPolicyUrl: "https://foodmission.eu/privacy",
      termsOfServiceUrl: "https://foodmission.eu/terms",
      logoUrl: "/logo-foodmission.png",
    },
  },
  kcContextExtensionPerPage: {} as KcContext,
});

// Use the actual Keycloak context if available, otherwise use mock for development
export const kcContext =
  kcContextFromWindow ||
  getKcContextMock({
    pageId: "login.ftl",
  });
