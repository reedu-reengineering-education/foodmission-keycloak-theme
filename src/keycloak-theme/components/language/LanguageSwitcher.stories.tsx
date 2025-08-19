import type { Meta, StoryObj } from "@storybook/react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { mockKcContext } from "../../test-utils/mockKcContext";
import { createMockI18n } from "../../test-utils/mockI18n";

const meta: Meta<typeof LanguageSwitcher> = {
  title: "FOODMISSION Theme/Components/Language Switcher",
  component: LanguageSwitcher,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Language switcher component for multi-language support in FOODMISSION theme.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockI18n = createMockI18n();

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
