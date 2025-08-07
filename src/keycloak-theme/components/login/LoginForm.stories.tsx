import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";
import { createLoginMockKcContext } from "../../test-utils/mockKcContext";
import { createMockI18n } from "../../test-utils/mockI18n";

const meta: Meta<typeof LoginForm> = {
  title: "Keycloak Components/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The FOODMISSION login form component with validation and error handling.",
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
    kcContext: createLoginMockKcContext(),
    i18n: mockI18n,
  },
};

export const WithError: Story = {
  args: {
    kcContext: createLoginMockKcContext({
      message: {
        type: "error",
        summary: "Invalid username or password. Please try again.",
      },
    }),
    i18n: mockI18n,
  },
};

export const WithSuccess: Story = {
  args: {
    kcContext: createLoginMockKcContext({
      message: {
        type: "success",
        summary: "Login successful! Redirecting...",
      },
    }),
    i18n: mockI18n,
  },
};

export const WithWarning: Story = {
  args: {
    kcContext: createLoginMockKcContext({
      message: {
        type: "warning",
        summary: "Your account will be locked after 3 more failed attempts.",
      },
    }),
    i18n: mockI18n,
  },
};
