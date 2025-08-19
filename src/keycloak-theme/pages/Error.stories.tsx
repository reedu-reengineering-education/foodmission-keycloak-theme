import type { Meta, StoryObj } from "@storybook/react";
import { Error } from "./Error";
import { createBaseMockKcContext } from "../test-utils/mockKcContext";
import { createMockI18n } from "../test-utils/mockI18n";

const meta: Meta<typeof Error> = {
  title: "FOODMISSION Theme/Pages/Error",
  component: Error,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Error page displayed when authentication or system errors occur.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockKcContext = {
  ...createBaseMockKcContext(),
  pageId: "error.ftl" as const,
  message: {
    summary:
      "Die Aktion ist nicht mehr gültig. Bitte fahren Sie nun mit der Anmeldung fort.",
    type: "error" as const,
  },
  client: {
    baseUrl: "https://app.foodmission.eu",
    clientId: "foodmission-app",
    attributes: {},
  },
};

const mockI18n = createMockI18n();

export const Default: Story = {
  args: {
    kcContext: mockKcContext,
    i18n: mockI18n,
  },
};

export const WithoutClient: Story = {
  args: {
    kcContext: {
      ...mockKcContext,
      client: {
        clientId: "foodmission-app",
        attributes: {},
        baseUrl: undefined,
      },
    },
    i18n: mockI18n,
  },
};

export const GenericError: Story = {
  args: {
    kcContext: {
      ...mockKcContext,
      message: {
        summary: "An unexpected error occurred. Please try again.",
        type: "error" as const,
      },
      client: {
        baseUrl: "https://app.foodmission.eu",
        clientId: "foodmission-app",
        attributes: {},
      },
    },
    i18n: mockI18n,
  },
};
