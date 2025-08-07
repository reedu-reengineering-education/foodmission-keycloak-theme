import type { I18n } from "../../i18n";
import type { KcContext } from "../../kcContext";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Globe, ChevronDown } from "lucide-react";

interface Props {
  kcContext: KcContext;
  i18n: I18n;
  className?: string;
}

export function LanguageSwitcher({ kcContext, i18n, className = "" }: Props) {
  // Get enabled languages from Keycloakify i18n
  const enabledLanguages = i18n.enabledLanguages;
  const currentLanguage = i18n.currentLanguage;

  // Don't render if only one language is available
  if (!enabledLanguages || enabledLanguages.length <= 1) {
    return null;
  }

  const handleLanguageChange = (href: string) => {
    window.location.href = href;
  };

  // Fallback to kcContext.locale.supported if Keycloakify doesn't provide enabledLanguages
  const fallbackLanguages = kcContext.locale?.supported || [];
  const languagesToShow =
    enabledLanguages && enabledLanguages.length > 0
      ? enabledLanguages
      : fallbackLanguages;

  // Sort languages alphabetically by language tag for consistent ordering
  const sortedLanguages = [...languagesToShow].sort((a, b) =>
    a.languageTag.localeCompare(b.languageTag)
  );

  const currentLang = currentLanguage || {
    languageTag: kcContext.locale?.currentLanguageTag || "en",
    label: "English",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          size="sm"
          className={`gap-2 ${className}`}
          aria-label="Select Language"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLang.label}</span>
          <span className="sm:hidden">
            {currentLang.languageTag.toUpperCase()}
          </span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={5}
        alignOffset={0}
        avoidCollisions={true}
        sticky="partial"
      >
        {sortedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.languageTag}
            onClick={() =>
              handleLanguageChange(
                "href" in lang ? lang.href : "url" in lang ? lang.url : "#"
              )
            }
            className={`cursor-pointer ${
              lang.languageTag === currentLang.languageTag
                ? "bg-accent text-accent-foreground"
                : ""
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span>{lang.label}</span>
              {lang.languageTag === currentLang.languageTag && (
                <span className="text-xs text-muted-foreground">Current</span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
