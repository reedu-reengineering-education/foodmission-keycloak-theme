import type { Meta, StoryObj } from "@storybook/react";
import { Login } from "./Login";
import { createLoginMockKcContext } from "../test-utils/mockKcContext";
import { createMockI18n } from "../test-utils/mockI18n";

const meta: Meta<typeof Login> = {
  title: "FOODMISSION Theme/Pages/Login",
  component: Login,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The complete FOODMISSION login page with branding and form.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockI18n = createMockI18n();
const baseKcContext = createLoginMockKcContext();

export const Default: Story = {
  args: {
    kcContext: baseKcContext,
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

export const WithSuccess: Story = {
  args: {
    kcContext: createLoginMockKcContext({
      message: {
        type: "success",
        summary: "Password reset email has been sent to your email address.",
      },
    }),
    i18n: mockI18n,
  },
};

export const WithInfo: Story = {
  args: {
    kcContext: createLoginMockKcContext({
      message: {
        type: "info",
        summary: "Please check your email for verification instructions.",
      },
    }),
    i18n: mockI18n,
  },
};
