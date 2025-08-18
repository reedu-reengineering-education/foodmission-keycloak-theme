import type { Meta, StoryObj } from "@storybook/react";
import { DeleteAccountConfirm } from "./DeleteAccountConfirm";
import { createGetKcContextMock } from "keycloakify/login/KcContext";
import type { KcContext } from "../kcContext";

const { getKcContextMock } = createGetKcContextMock({
  kcContextExtension: {} as KcContext,
  overrides: {},
  kcContextExtensionPerPage: {} as KcContext,
});

const meta: Meta<typeof DeleteAccountConfirm> = {
  title: "login/DeleteAccountConfirm",
  component: DeleteAccountConfirm,
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockI18n = {
  msg: (key: string) => {
    const messages: Record<string, string> = {
      doConfirmDelete: "Delete My Account",
      doCancel: "Cancel",
      password: "Password",
    };
    return messages[key] || key;
  },
  msgStr: (key: string) => key,
  getMsg: (key: string) => key,
  currentLanguageTag: "en" as const,
  enabledLanguages: [],
};

export const Default: Story = {
  render: () => {
    const kcContext = getKcContextMock({
      pageId: "delete-account-confirm.ftl",
      overrides: {
        messagesPerField: {
          existsError: () => false,
          getFirstError: () => "",
          get: () => [],
          fieldNames: [],
        },
      },
    });

    return <DeleteAccountConfirm kcContext={kcContext} i18n={mockI18n} />;
  },
};

export const WithPasswordError: Story = {
  render: () => {
    const kcContext = getKcContextMock({
      pageId: "delete-account-confirm.ftl",
      overrides: {
        messagesPerField: {
          existsError: (field: string) => field === "password",
          getFirstError: (field: string) =>
            field === "password" ? "Invalid password" : "",
          get: () => [],
          fieldNames: ["password"],
        },
      },
    });

    return <DeleteAccountConfirm kcContext={kcContext} i18n={mockI18n} />;
  },
};
