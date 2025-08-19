import type { Meta, StoryObj } from "@storybook/react";
import { DeleteAccountConfirm } from "./DeleteAccountConfirm";
import { createGetKcContextMock } from "keycloakify/login/KcContext";
import type { KcContext } from "../kcContext";
import { createMockI18n } from "../test-utils/mockI18n";

const { getKcContextMock } = createGetKcContextMock({
  kcContextExtension: {} as KcContext,
  overrides: {},
  kcContextExtensionPerPage: {} as KcContext,
});

const meta: Meta<typeof DeleteAccountConfirm> = {
  title: "FOODMISSION Theme/Pages/Delete Account",
  component: DeleteAccountConfirm,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Account deletion confirmation page requiring password verification.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockI18n = createMockI18n();

export const Default: Story = {
  render: () => {
    const kcContext = getKcContextMock({
      pageId: "delete-account-confirm.ftl",
      overrides: {
        messagesPerField: {
          existsError: () => false,
          getFirstError: () => "",
          get: () => "",
          exists: () => false,
          printIfExists: () => undefined,
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
          get: (field: string) =>
            field === "password" ? "Invalid password" : "",
          exists: () => false,
          printIfExists: () => undefined,
        },
      },
    });

    return <DeleteAccountConfirm kcContext={kcContext} i18n={mockI18n} />;
  },
};
