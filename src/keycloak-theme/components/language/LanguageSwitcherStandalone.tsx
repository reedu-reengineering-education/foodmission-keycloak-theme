import type { I18n } from "../../i18n";
import type { KcContext } from "../../kcContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface Props {
  kcContext: KcContext;
  i18n: I18n;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export function LanguageSwitcherStandalone({
  kcContext,
  i18n,
  position = "top-right",
}: Props) {
  const positionClasses = {
    "top-right": "fixed top-4 right-4 z-50",
    "top-left": "fixed top-4 left-4 z-50",
    "bottom-right": "fixed bottom-4 right-4 z-50",
    "bottom-left": "fixed bottom-4 left-4 z-50",
  };

  return (
    <div className={positionClasses[position]}>
      <LanguageSwitcher
        kcContext={kcContext}
        i18n={i18n}
        className="bg-background/90 backdrop-blur-sm shadow-lg"
      />
    </div>
  );
}
