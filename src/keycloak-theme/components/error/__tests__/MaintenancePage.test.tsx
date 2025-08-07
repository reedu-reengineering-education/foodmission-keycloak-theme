import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MaintenancePage } from "../MaintenancePage";

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

// Mock window methods
const mockReload = vi.fn();
const mockOpen = vi.fn();
Object.defineProperty(window, "location", {
  value: {
    reload: mockReload,
  },
  writable: true,
});

Object.defineProperty(window, "open", {
  value: mockOpen,
  writable: true,
});

describe("MaintenancePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with default scheduled maintenance props", () => {
    render(<MaintenancePage />);

    expect(screen.getByText("Scheduled Maintenance")).toBeInTheDocument();
    expect(screen.getByText("FOODMISSION")).toBeInTheDocument();
    expect(screen.getByText("Maintenance in Progress")).toBeInTheDocument();
    expect(
      screen.getByText(
        /The FOODMISSION platform is currently undergoing scheduled maintenance/
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Check Again")).toBeInTheDocument();
  });

  it("renders emergency maintenance correctly", () => {
    render(<MaintenancePage isEmergency={true} />);

    expect(
      screen.getByText("Emergency Maintenance in Progress")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Service Temporarily Unavailable")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We are currently performing emergency maintenance/)
    ).toBeInTheDocument();
  });

  it("displays custom title and message", () => {
    render(
      <MaintenancePage
        title="Custom Maintenance Title"
        message="Custom maintenance message"
      />
    );

    expect(screen.getByText("Custom Maintenance Title")).toBeInTheDocument();
    expect(screen.getByText("Custom maintenance message")).toBeInTheDocument();
  });

  it("shows expected end time when provided", () => {
    const endTime = new Date("2024-12-01T15:30:00Z");
    render(<MaintenancePage expectedEndTime={endTime} />);

    expect(screen.getByText("Expected completion:")).toBeInTheDocument();
    expect(screen.getByText(endTime.toLocaleString())).toBeInTheDocument();
  });

  it("displays maintenance details when provided", () => {
    render(
      <MaintenancePage details="Database migration and server updates in progress" />
    );

    expect(screen.getByText("Maintenance Details:")).toBeInTheDocument();
    expect(
      screen.getByText("Database migration and server updates in progress")
    ).toBeInTheDocument();
  });

  it("calls custom retry handler when provided", () => {
    const mockRetry = vi.fn();
    render(<MaintenancePage onRetry={mockRetry} />);

    const retryButton = screen.getByText("Check Again");
    fireEvent.click(retryButton);

    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it("reloads page when no custom retry handler provided", () => {
    render(<MaintenancePage />);

    const retryButton = screen.getByText("Check Again");
    fireEvent.click(retryButton);

    expect(mockReload).toHaveBeenCalledTimes(1);
  });

  it("shows status updates button when enabled", () => {
    render(
      <MaintenancePage
        showStatusUpdates={true}
        statusUpdatesUrl="https://status.foodmission.eu"
      />
    );

    const statusButton = screen.getByText("View Status Updates");
    expect(statusButton).toBeInTheDocument();

    fireEvent.click(statusButton);
    expect(mockOpen).toHaveBeenCalledWith(
      "https://status.foodmission.eu",
      "_blank"
    );
  });

  it("enables and disables auto-retry correctly", async () => {
    render(<MaintenancePage retryInterval={2} />);

    const autoRetryCheckbox = screen.getByRole("checkbox");
    expect(autoRetryCheckbox).not.toBeChecked();

    // Enable auto-retry
    fireEvent.click(autoRetryCheckbox);
    expect(autoRetryCheckbox).toBeChecked();

    // Should show countdown
    expect(screen.getByText("Next check in 2s")).toBeInTheDocument();

    // Advance timer
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText("Next check in 1s")).toBeInTheDocument();

    // Should trigger retry after countdown
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockReload).toHaveBeenCalledTimes(1);
  });

  it("stops auto-retry when disabled", () => {
    render(<MaintenancePage retryInterval={2} />);

    const autoRetryCheckbox = screen.getByRole("checkbox");

    // Enable auto-retry
    fireEvent.click(autoRetryCheckbox);
    expect(autoRetryCheckbox).toBeChecked();

    // Disable auto-retry
    fireEvent.click(autoRetryCheckbox);
    expect(autoRetryCheckbox).not.toBeChecked();

    // Should not show countdown
    expect(screen.queryByText(/Next check in/)).not.toBeInTheDocument();

    // Advance timer - should not trigger retry
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockReload).not.toHaveBeenCalled();
  });

  it("hides retry button when specified", () => {
    render(<MaintenancePage showRetry={false} />);

    expect(screen.queryByText("Check Again")).not.toBeInTheDocument();
    expect(screen.queryByText("Auto-retry")).not.toBeInTheDocument();
  });

  it("displays support email link", () => {
    render(<MaintenancePage />);

    const supportLink = screen.getByText("Contact Support");
    expect(supportLink).toHaveAttribute(
      "href",
      "mailto:support@foodmission.eu?subject=Maintenance Inquiry"
    );
  });

  it("formats time remaining correctly", () => {
    const futureTime = new Date(
      Date.now() + 2 * 60 * 60 * 1000 + 30 * 60 * 1000
    ); // 2h 30m from now
    render(<MaintenancePage expectedEndTime={futureTime} />);

    expect(
      screen.getByText("Approximately 2h 30m remaining")
    ).toBeInTheDocument();
  });

  it("formats time remaining for minutes only", () => {
    const futureTime = new Date(Date.now() + 45 * 60 * 1000); // 45m from now
    render(<MaintenancePage expectedEndTime={futureTime} />);

    expect(screen.getByText("Approximately 45m remaining")).toBeInTheDocument();
  });

  it("shows completion message when end time has passed", () => {
    const pastTime = new Date(Date.now() - 60 * 1000); // 1 minute ago
    render(<MaintenancePage expectedEndTime={pastTime} />);

    expect(
      screen.getByText("Maintenance should be complete")
    ).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<MaintenancePage />);

    // Check for alert role
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();

    // Check for proper heading structure
    const heading = screen.getByRole("heading", {
      name: "Scheduled Maintenance",
    });
    expect(heading).toBeInTheDocument();

    // Check checkbox accessibility
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("displays thank you message", () => {
    render(<MaintenancePage />);

    expect(
      screen.getByText(/Thank you for your patience as we work to improve/)
    ).toBeInTheDocument();
  });
});
