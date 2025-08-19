import type { Meta, StoryObj } from "@storybook/react";
import { TwoColumnLayout } from "./TwoColumnLayout";
import { mockKcContext } from "../../test-utils/mockKcContext";
import { createMockI18n } from "../../test-utils/mockI18n";
import { LanguageSwitcher } from "../language";

const meta: Meta<typeof TwoColumnLayout> = {
  title: "FOODMISSION Theme/Layout/Two Column Layout",
  component: TwoColumnLayout,
  subcomponents: {
    LanguageSwitcher: LanguageSwitcher,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Two-column layout with branding section and form content for FOODMISSION theme.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TwoColumnLayout>;

const mockI18n = createMockI18n();

export const Default: Story = {
  args: {
    kcContext: mockKcContext,
    i18n: mockI18n,
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Sample Form Content</h2>
        <p className="text-gray-600 mb-6">
          This is where your form content would go.
        </p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Sample input"
            className="w-full p-3 border rounded-md"
          />
          <button className="w-full bg-blue-600 text-white p-3 rounded-md">
            Sample Button
          </button>
        </div>
      </div>
    ),
  },
};

export const WithoutBranding: Story = {
  args: {
    kcContext: mockKcContext,
    i18n: mockI18n,
    showBranding: false,
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Full Width Layout</h2>
        <p className="text-gray-600 mb-6">
          This layout takes the full width without branding.
        </p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Sample input"
            className="w-full p-3 border rounded-md"
          />
          <button className="w-full bg-blue-600 text-white p-3 rounded-md">
            Sample Button
          </button>
        </div>
      </div>
    ),
  },
};

export const CustomBranding: Story = {
  args: {
    kcContext: mockKcContext,
    i18n: mockI18n,
    brandingContent: (
      <div className="max-w-md">
        <h1 className="text-4xl font-bold text-purple-900 mb-4">
          Custom Branding
        </h1>
        <p className="text-lg text-purple-600 mb-8">
          This is a custom branding section that can be different for specific
          pages.
        </p>
        <div className="text-sm text-purple-500">
          <p>Custom footer content</p>
          <p className="mt-1">With different styling</p>
        </div>
      </div>
    ),
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Custom Branded Form</h2>
        <p className="text-gray-600 mb-6">
          This form has custom branding on the left.
        </p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Sample input"
            className="w-full p-3 border rounded-md"
          />
          <button className="w-full bg-purple-600 text-white p-3 rounded-md">
            Custom Button
          </button>
        </div>
      </div>
    ),
  },
};
