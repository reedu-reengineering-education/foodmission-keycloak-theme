import type { Meta, StoryObj } from "@storybook/react";
import { Info } from "./Info";
import { createGetKcContextMock } from "keycloakify/login/KcContext";
import type { KcContext } from "../kcContext";

const { getKcContextMock } = createGetKcContextMock({
  kcContextExtension: {} as KcContext,
  overrides: {},
  kcContextExtensionPerPage: {} as KcContext,
});

const meta: Meta<typeof Info> = {
  title: "login/Info",
  component: Info,
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockI18n = {
  msg: (key: string) => {
    const messages: Record<string, string> = {
      infoTitle: "Information",
      backToApplication: "« Back to application",
      proceedWithAction: "Continue",
    };
    return messages[key] || key;
  },
  msgStr: (key: string) => key,
  getMsg: (key: string) => key,
  currentLanguageTag: "en" as const,
  enabledLanguages: [],
};

export const AccountDeleted: Story = {
  render: () => {
    const kcContext = getKcContextMock({
      pageId: "info.ftl",
      overrides: {
        message: {
          type: "success",
          summary:
            "Your account has been successfully deleted. Thank you for using FOODMISSION.",
        },
        client: {
          baseUrl: "https://foodmission.eu",
        },
      },
    });

    return <Info kcContext={kcContext} i18n={mockI18n} />;
  },
};

export const GeneralInfo: Story = {
  render: () => {
    const kcContext = getKcContextMock({
      pageId: "info.ftl",
      overrides: {
        message: {
          type: "info",
          summary: "Please check your email for further instructions.",
        },
        pageRedirectUri: "https://foodmission.eu/login",
      },
    });

    return <Info kcContext={kcContext} i18n={mockI18n} />;
  },
};

export const WithActionUri: Story = {
  render: () => {
    const kcContext = getKcContextMock({
      pageId: "info.ftl",
      overrides: {
        message: {
          type: "info",
          summary: "Action completed successfully. Click continue to proceed.",
        },
        actionUri: "/auth/realms/foodmission/login-actions/action-token",
      },
    });

    return <Info kcContext={kcContext} i18n={mockI18n} />;
  },
};
