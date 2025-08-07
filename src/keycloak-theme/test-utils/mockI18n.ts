import type { I18n } from "../i18n";

/**
 * Creates a mock i18n object for testing
 */
export function createMockI18n(): I18n {
  return {
    msgStr: (key: string) => key,
    currentLanguage: {
      languageTag: "en" as const,
      label: "English",
    },
    enabledLanguages: [
      { languageTag: "en" as const, label: "English", href: "#en" },
      { languageTag: "de" as const, label: "Deutsch", href: "#de" },
    ],
    advancedMsgStr: (key: string) => key,
    isFetchingTranslations: false,
    msg: (key: string) => ({ type: "span", props: { children: key } } as any),
    advancedMsg: (key: string) =>
      ({ type: "span", props: { children: key } } as any),
  };
}
