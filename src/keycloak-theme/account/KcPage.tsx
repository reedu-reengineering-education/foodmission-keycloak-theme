import type { KcContext } from "../kcContext";
import { useI18n } from "../i18n";

interface Props {
  kcContext: KcContext;
}

export default function KcPage({ kcContext }: Props) {
  const { i18n: _i18n } = useI18n({ kcContext });

  // Route to the appropriate account page component based on pageId
  switch (kcContext.pageId) {
    default:
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">FOODMISSION Account</h1>
            <p>Page ID: {kcContext.pageId}</p>
            <p className="text-sm text-gray-600 mt-2">
              Account pages will be implemented in future tasks.
            </p>
          </div>
        </div>
      );
  }
}
