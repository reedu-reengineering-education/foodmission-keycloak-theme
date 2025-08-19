import type { Meta, StoryObj } from "@storybook/react";
import { UpdateProfile } from "./UpdateProfile";
import { createUpdateProfileMockKcContext } from "../test-utils/mockKcContext";
import { createMockI18n } from "../test-utils/mockI18n";

const meta: Meta<typeof UpdateProfile> = {
  title: "FOODMISSION Theme/Pages/Update Profile",
  component: UpdateProfile,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Profile update page where users can modify their account information.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UpdateProfile>;

const mockI18n = createMockI18n();

export const Default: Story = {
  args: {
    kcContext: createUpdateProfileMockKcContext(),
    i18n: mockI18n,
  },
};

export const WithError: Story = {
  args: {
    kcContext: createUpdateProfileMockKcContext({
      message: {
        type: "error",
        summary: "Profile update failed. Please try again.",
      },
      messagesPerField: {
        printIfExists: <T extends string>(_fieldName: string, _text: T) =>
          undefined as T | undefined,
        existsError: (field: string) =>
          field === "email" || field === "firstName",
        get: (field: string) => {
          const errors: Record<string, string> = {
            email: "Invalid email address",
            firstName: "First name is required",
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

export const WithSuccess: Story = {
  args: {
    kcContext: createUpdateProfileMockKcContext({
      message: {
        type: "success",
        summary: "Profile updated successfully.",
      },
    }),
    i18n: mockI18n,
  },
};

export const AppInitiated: Story = {
  args: {
    kcContext: createUpdateProfileMockKcContext({
      isAppInitiatedAction: true,
    }),
    i18n: mockI18n,
  },
};
