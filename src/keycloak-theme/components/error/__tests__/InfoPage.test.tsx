import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { InfoPage } from "../InfoPage";

// Mock the theme config hook
vi.mock("@/lib/use-theme-config", () => ({
  useThemeConfig: () => ({
    branding: {
      projectName: "FOODMISSION",
      primaryColor: "hsl(142 76% 36%)",
      secondaryColor: "hsl(24 100% 50%)",
    },
    content: {
      supportEmail: "support@foodmission.eu",
    },
  }),
}));

// Mock window location
Object.defineProperty(window, "location", {
  value: {
    href: "",
  },
  writable: true,
});

describe("InfoPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.location.href = "";
  });

  it("renders email verification page correctly", () => {
    render(<InfoPage type="email-verification" />);

    expect(screen.getByText("Check Your Email")).toBeInTheDocument();
    expect(
      screen.getByText(/We've sent a verification link/)
    ).toBeInTheDocument();
    expect(screen.getByText("Continue to Login")).toBeInTheDocument();
    expect(screen.getByText("Resend")).toBeInTheDocument();
  });

  it("renders registration success page correctly", () => {
    render(<InfoPage type="registration-success" />);

    expect(screen.getByText("Welcome to FOODMISSION!")).toBeInTheDocument();
    expect(
      screen.getByText(/Your account has been created successfully/)
    ).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders password reset sent page correctly", () => {
    render(<InfoPage type="password-reset-sent" />);

    expect(screen.getByText("Password Reset Email Sent")).toBeInTheDocument();
    expect(
      screen.getByText(/We've sent password reset instructions/)
    ).toBeInTheDocument();
    expect(screen.getByText("Back to Login")).toBeInTheDocument();
  });

  it("renders account locked page correctly", () => {
    render(<InfoPage type="account-locked" />);

    expect(screen.getByText("Account Temporarily Locked")).toBeInTheDocument();
    expect(
      screen.getByText(/Your account has been temporarily locked/)
    ).toBeInTheDocument();
    expect(screen.getAllByText("Contact Support")).toHaveLength(2); // Button and link
    expect(screen.getByText("Need assistance?")).toBeInTheDocument();
  });

  it("renders session expired page correctly", () => {
    render(<InfoPage type="session-expired" />);

    expect(screen.getByText("Session Expired")).toBeInTheDocument();
    expect(screen.getByText(/Your session has expired/)).toBeInTheDocument();
    expect(screen.getByText("Log In Again")).toBeInTheDocument();
  });

  it("renders logout success page correctly", () => {
    render(<InfoPage type="logout-success" />);

    expect(screen.getByText("Logged Out Successfully")).toBeInTheDocument();
    expect(
      screen.getByText(/You have been successfully logged out/)
    ).toBeInTheDocument();
    expect(screen.getByText("Log In Again")).toBeInTheDocument();
  });

  it("renders account verified page correctly", () => {
    render(<InfoPage type="account-verified" />);

    expect(screen.getByText("Account Verified")).toBeInTheDocument();
    expect(
      screen.getByText(/Your email address has been successfully verified/)
    ).toBeInTheDocument();
    expect(screen.getByText("Continue to Dashboard")).toBeInTheDocument();
  });

  it("renders maintenance page correctly", () => {
    render(<InfoPage type="maintenance" />);

    expect(screen.getByText("System Maintenance")).toBeInTheDocument();
    expect(
      screen.getByText(/The FOODMISSION platform is currently undergoing/)
    ).toBeInTheDocument();
    expect(screen.getByText("Try Again Later")).toBeInTheDocument();
  });

  it("renders custom info page correctly", () => {
    render(
      <InfoPage
        type="custom"
        title="Custom Title"
        message="Custom message content"
        details="Additional details here"
      />
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom message content")).toBeInTheDocument();
    expect(screen.getByText("Additional details here")).toBeInTheDocument();
  });

  it("calls custom continue handler when provided", () => {
    const mockContinue = vi.fn();
    render(<InfoPage type="email-verification" onContinue={mockContinue} />);

    const continueButton = screen.getByText("Continue to Login");
    fireEvent.click(continueButton);

    expect(mockContinue).toHaveBeenCalledTimes(1);
  });

  it("navigates to correct default location for registration success", () => {
    render(<InfoPage type="registration-success" />);

    const continueButton = screen.getByText("Get Started");
    fireEvent.click(continueButton);

    expect(window.location.href).toBe("/dashboard");
  });

  it("navigates to login for logout success", () => {
    render(<InfoPage type="logout-success" />);

    const continueButton = screen.getByText("Log In Again");
    fireEvent.click(continueButton);

    expect(window.location.href).toBe("/login");
  });

  it("opens mailto for account locked", () => {
    render(<InfoPage type="account-locked" />);

    const continueButton = screen.getByRole("button", {
      name: /Contact Support/,
    });
    fireEvent.click(continueButton);

    expect(window.location.href).toBe("mailto:support@foodmission.eu");
  });

  it("shows home button when specified", () => {
    const mockHome = vi.fn();
    render(
      <InfoPage type="email-verification" showHome={true} onHome={mockHome} />
    );

    const homeButton = screen.getByText("Go to Homepage");
    fireEvent.click(homeButton);

    expect(mockHome).toHaveBeenCalledTimes(1);
  });

  it("hides continue button when specified", () => {
    render(<InfoPage type="email-verification" showContinue={false} />);

    expect(screen.queryByText("Continue to Login")).not.toBeInTheDocument();
  });

  it("uses custom continue text when provided", () => {
    render(
      <InfoPage type="email-verification" continueText="Custom Continue Text" />
    );

    expect(screen.getByText("Custom Continue Text")).toBeInTheDocument();
  });

  it("displays custom icon when provided", () => {
    const customIcon = <div data-testid="custom-icon">Custom Icon</div>;
    render(<InfoPage type="custom" customIcon={customIcon} />);

    expect(screen.getAllByTestId("custom-icon")).toHaveLength(2); // Icon appears in header and alert
  });

  it("shows support email for account locked and maintenance types", () => {
    render(<InfoPage type="account-locked" />);

    const supportLink = screen.getByRole("link", { name: /Contact Support/ });
    expect(supportLink).toHaveAttribute(
      "href",
      "mailto:support@foodmission.eu"
    );
  });

  it("has proper accessibility attributes", () => {
    render(<InfoPage type="email-verification" />);

    // Check for alert role
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();

    // Check for proper heading structure
    const heading = screen.getByRole("heading", { name: "Check Your Email" });
    expect(heading).toBeInTheDocument();
  });
});
