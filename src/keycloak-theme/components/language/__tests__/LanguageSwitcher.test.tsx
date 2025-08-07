import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { createMockI18n } from "../../../test-utils/mockI18n";
import { createLoginMockKcContext } from "../../../test-utils/mockKcContext";

// Mock the UI components
vi.mock("../../../../components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock("../../../../components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children, open, onOpenChange }: any) => (
    <div
      data-testid="dropdown-menu"
      data-open={open}
      onClick={() => onOpenChange?.(!open)}
    >
      {children}
    </div>
  ),
  DropdownMenuContent: ({ children }: any) => (
    <div data-testid="dropdown-content">{children}</div>
  ),
  DropdownMenuItem: ({ children, onClick }: any) => (
    <div data-testid="dropdown-item" onClick={onClick}>
      {children}
    </div>
  ),
  DropdownMenuTrigger: ({ children }: any) => (
    <div data-testid="dropdown-trigger">{children}</div>
  ),
}));

vi.mock("lucide-react", () => ({
  Globe: () => <span data-testid="globe-icon">🌐</span>,
  ChevronDown: () => <span data-testid="chevron-down">▼</span>,
}));

const mockI18n = createMockI18n();
const mockKcContext = createLoginMockKcContext();

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the current language", () => {
    render(<LanguageSwitcher i18n={mockI18n} kcContext={mockKcContext} />);

    expect(screen.getAllByText("English")).toHaveLength(2); // One in button, one in dropdown
    expect(screen.getByTestId("globe-icon")).toBeInTheDocument();
  });

  it("shows available languages when opened", () => {
    render(<LanguageSwitcher i18n={mockI18n} kcContext={mockKcContext} />);

    const trigger = screen.getByTestId("dropdown-trigger");
    fireEvent.click(trigger);

    expect(screen.getAllByText("English")).toHaveLength(2);
    expect(screen.getByText("Deutsch")).toBeInTheDocument();
  });

  it("handles language selection", () => {
    // Mock window.location.href setter
    const mockLocation = { href: "" };
    Object.defineProperty(window, "location", {
      value: mockLocation,
      writable: true,
    });

    render(<LanguageSwitcher i18n={mockI18n} kcContext={mockKcContext} />);

    const trigger = screen.getByTestId("dropdown-trigger");
    fireEvent.click(trigger);

    const deutschItem = screen.getByText("Deutsch");
    fireEvent.click(deutschItem);

    expect(mockLocation.href).toBe("#de");
  });
});
