import { lazy, Suspense } from "react";
import type { KcContext } from "./kcContext";
import { useI18n } from "./i18n";
import { kcContext as devKcContext } from "./kcContext";
import { Loader2 } from "lucide-react";
// import "../globals.css";

const KcPage = lazy(() => import("./KcPage"));

function KcAppInner(props: { kcContext: KcContext }) {
  const { kcContext } = props;
  const { i18n } = useI18n({ kcContext });

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <KcPage kcContext={kcContext} i18n={i18n} />
    </Suspense>
  );
}

// Main app component for Keycloak integration
export function KcApp(props: { kcContext: KcContext }) {
  return <KcAppInner {...props} />;
}

// For development with mock context
export function KcAppDev() {
  if (!devKcContext) {
    return <div>No Keycloak context available</div>;
  }
  return <KcAppInner kcContext={devKcContext} />;
}
