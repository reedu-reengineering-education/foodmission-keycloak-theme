import type { Meta, StoryObj } from "@storybook/react";
import { Terms } from "./Terms";
import { createTermsMockKcContext } from "../test-utils/mockKcContext";
import { createMockI18n } from "../test-utils/mockI18n";

const meta: Meta<typeof Terms> = {
  title: "FOODMISSION Theme/Pages/Terms",
  component: Terms,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Terms and conditions acceptance page for user registration.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Terms>;

const mockI18n = createMockI18n();

export const Default: Story = {
  args: {
    kcContext: createTermsMockKcContext(),
    i18n: mockI18n,
  },
};
