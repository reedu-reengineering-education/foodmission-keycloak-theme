import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { KcApp, KcAppDev } from "./keycloak-theme/KcApp";
import { kcContext } from "./keycloak-theme/kcContext";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";

import "./globals.css";

// Check if we're in a Keycloak environment or development
const isKeycloakEnvironment = (window as any).kcContext !== undefined;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isKeycloakEnvironment && kcContext ? (
      <KcApp kcContext={kcContext} />
    ) : (
      <KcAppDev />
    )}
  </StrictMode>
);
