import type { Meta, StoryObj } from "@storybook/react";
import { Register } from "./Register";
import { createRegisterMockKcContext } from "../test-utils/mockKcContext";
import { createMockI18n } from "../test-utils/mockI18n";

const meta: Meta<typeof Register> = {
  title: "Keycloak/Pages/Register",
  component: Register,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Register>;

const mockI18n = createMockI18n();

export const Default: Story = {
  args: {
    kcContext: createRegisterMockKcContext(),
    i18n: mockI18n,
  },
};

export const WithValidationErrors: Story = {
  args: {
    kcContext: createRegisterMockKcContext({
      message: {
        type: "error",
        summary: "Please correct the errors below",
      },
      messagesPerField: {
        printIfExists: <T extends string>(_fieldName: string, _text: T) =>
          undefined as T | undefined,
        existsError: (field: string) =>
          field === "email" || field === "password",
        get: (field: string) => {
          const errors: Record<string, string> = {
            email: "Email is already in use",
            password: "Password must be at least 8 characters",
          };
          return errors[field] || "";
        },
        exists: () => false,
        getFirstError: () => "",
      },
    }),
    i18n: mockI18n,
  },
};

export const WithRecaptcha: Story = {
  args: {
    kcContext: createRegisterMockKcContext({
      recaptchaRequired: true,
    }),
    i18n: mockI18n,
  },
};

export const WithPrefilledData: Story = {
  args: {
    kcContext: createRegisterMockKcContext({}),
    i18n: mockI18n,
  },
};
