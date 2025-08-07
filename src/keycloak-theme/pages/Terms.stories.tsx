import type { Meta, StoryObj } from "@storybook/react";
import { Terms } from "./Terms";
import { createTermsMockKcContext } from "../test-utils/mockKcContext";
import { createMockI18n } from "../test-utils/mockI18n";

const meta: Meta<typeof Terms> = {
  title: "Pages/Terms",
  component: Terms,
  parameters: {
    layout: "fullscreen",
  },
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
