import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoginHeader } from "../LoginHeader";

// Mock the theme config hook
vi.mock("../../../../lib/use-theme-config", () => ({
  useThemeConfig: () => ({
    branding: {
      logoUrl: "/test-logo.png",
      primaryColor: "hsl(142 76% 36%)",
      secondaryColor: "hsl(24 100% 50%)",
      projectName: "FOODMISSION",
    },
    content: {
      welcomeMessage: "Welcome to FOODMISSION",
      projectDescription:
        "Join our citizen science initiative to promote healthy food consumption and reduce food waste across Europe.",
      supportEmail: "test@foodmission.eu",
      privacyPolicyUrl: "https://test.com/privacy",
      termsOfServiceUrl: "https://test.com/terms",
    },
    features: {
      socialLogin: false,
      selfRegistration: true,
      passwordReset: true,
    },
  }),
}));

// Mock the i18n hook
vi.mock("../../../i18n", () => ({
  useI18n: () => ({
    i18n: {
      msgStr: (key: string) => {
        const messages: Record<string, string> = {
          "foodmission.welcome": "Welcome to FOODMISSION",
          "foodmission.description":
            "Join our citizen science project for healthy food consumption and waste reduction",
          "foodmission.tagline": "Citizen Science for Sustainable Food Systems",
          "foodmission.mission":
            "Empowering citizens to make informed food choices and reduce waste through science",
        };
        return messages[key] || key;
      },
    },
  }),
}));

describe("LoginHeader", () => {
  it("renders the project logo with correct attributes", () => {
    render(<LoginHeader />);

    const logo = screen.getByAltText("FOODMISSION Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/test-logo.png");
  });

  it("displays the welcome message", () => {
    render(<LoginHeader />);

    expect(screen.getByText("Welcome to FOODMISSION")).toBeInTheDocument();
  });

  it("displays the project description", () => {
    render(<LoginHeader />);

    expect(
      screen.getByText(
        /Join our citizen science project for healthy food consumption/
      )
    ).toBeInTheDocument();
  });

  it("shows citizen science context callout", () => {
    render(<LoginHeader />);

    expect(
      screen.getByText("Citizen Science for Sustainable Food Systems")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Empowering citizens to make informed food choices/)
    ).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const customClass = "custom-header-class";
    const { container } = render(<LoginHeader className={customClass} />);

    expect(container.firstChild).toHaveClass(customClass);
  });

  it("has proper semantic structure with header element", () => {
    render(<LoginHeader />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("includes sustainability messaging", () => {
    render(<LoginHeader />);

    expect(
      screen.getByText(/reduce waste through science/)
    ).toBeInTheDocument();
  });

  it("has accessible logo with fallback text", () => {
    render(<LoginHeader />);

    // The logo should have proper alt text
    const logo = screen.getByAltText("FOODMISSION Logo");
    expect(logo).toBeInTheDocument();

    // There should be a hidden fallback text element
    const fallbackText = screen.getByText("FOODMISSION");
    expect(fallbackText).toBeInTheDocument();
    expect(fallbackText).toHaveClass("hidden");
  });
});
