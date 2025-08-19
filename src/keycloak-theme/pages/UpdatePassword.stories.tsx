import type { Meta, StoryObj } from "@storybook/react";
import { UpdatePassword } from "./UpdatePassword";
import { mockContexts } from "../test-utils/mockKcContext";

const meta: Meta<typeof UpdatePassword> = {
  title: "FOODMISSION Theme/Pages/Update Password",
  component: UpdatePassword,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The FOODMISSION password update page for users who need to change their password.",
      },
    },
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
  ],
  msgStr: (key: string) => {
    const messages: Record<string, string> = {
      updatePasswordTitle: "Update password",
      passwordNew: "New password",
      passwordConfirm: "Confirm password",
      doSubmit: "Submit",
      doCancel: "Cancel",
      passwordNewConfirm: "Password confirmation",
    };
    return messages[key] || key;
  },
  advancedMsgStr: (key: string) => key,
  msg: (key: string) => key,
  advancedMsg: (key: string) => key,
  isFetchingTranslations: false,
} as any;

export const Default: Story = {
  args: {
    kcContext: mockContexts.loginUpdatePassword,
    i18n: mockI18n,
  },
};

export const WithError: Story = {
  args: {
    kcContext: {
      ...mockContexts.loginUpdatePassword,
      message: {
        type: "error",
        summary: "Password update failed. Please try again.",
      },
    },
    i18n: mockI18n,
  },
};

export const WithSuccess: Story = {
  args: {
    kcContext: {
      ...mockContexts.loginUpdatePassword,
      message: {
        type: "success",
        summary: "Password updated successfully.",
      },
    },
    i18n: mockI18n,
  },
};

export const WithCancelButton: Story = {
  args: {
    kcContext: {
      ...mockContexts.loginUpdatePassword,
      isAppInitiatedAction: true,
    },
    i18n: mockI18n,
  },
};
