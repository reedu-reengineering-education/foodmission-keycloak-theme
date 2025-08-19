import type { Meta, StoryObj } from "@storybook/react";
import { ResetPassword } from "./ResetPassword";
import { createResetPasswordMockKcContext } from "../test-utils/mockKcContext";
import { createMockI18n } from "../test-utils/mockI18n";

const meta: Meta<typeof ResetPassword> = {
  title: "FOODMISSION Theme/Pages/Reset Password",
  component: ResetPassword,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Password reset page where users can request a password reset email.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ResetPassword>;

const mockI18n = createMockI18n();

export const Default: Story = {
  args: {
    kcContext: createResetPasswordMockKcContext(),
    i18n: mockI18n,
  },
};

export const WithError: Story = {
  args: {
    kcContext: createResetPasswordMockKcContext({
      message: {
        type: "error",
        summary: "User not found. Please check your email address.",
      },
    }),
    i18n: mockI18n,
  },
};

export const WithSuccess: Story = {
  args: {
    kcContext: createResetPasswordMockKcContext({
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
    kcContext: createResetPasswordMockKcContext({
      message: {
        type: "info",
        summary: "Please check your email for password reset instructions.",
      },
    }),
    i18n: mockI18n,
  },
};
