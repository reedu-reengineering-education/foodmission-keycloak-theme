import type { Meta, StoryObj } from "@storybook/react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { mockKcContext } from "@/dev/mock-keycloak";

const meta: Meta<typeof LanguageSwitcher> = {
  title: "Components/Language/LanguageSwitcher",
  component: LanguageSwitcher,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock i18n for stories
const mockI18n = {
  currentLanguage: {
    languageTag: "en",
    label: "English",
  },
  enabledLanguages: [
    { languageTag: "en", label: "English", href: "#en" },
    { languageTag: "de", label: "Deutsch", href: "#de" },
    { languageTag: "fr", label: "Français", href: "#fr" },
    { languageTag: "es", label: "Español", href: "#es" },
    { languageTag: "it", label: "Italiano", href: "#it" },
  ],
  msgStr: (key: string) => key,
  advancedMsgStr: (key: string) => key,
  msg: (key: string) => key,
  advancedMsg: (key: string) => key,
  isFetchingTranslations: false,
} as any;

export const Default: Story = {
  args: {
    kcContext: mockKcContext,
    i18n: mockI18n,
  },
};

export const SingleLanguage: Story = {
  args: {
    kcContext: {
      ...mockKcContext,
      locale: {
        currentLanguageTag: "en",
        supported: [{ languageTag: "en", label: "English", url: "#" }],
      },
    },
    i18n: {
      ...mockI18n,
      enabledLanguages: [{ languageTag: "en", label: "English", href: "#en" }],
    },
  },
};

export const CustomClassName: Story = {
  args: {
    kcContext: mockKcContext,
    i18n: mockI18n,
    className: "border-primary",
  },
};
