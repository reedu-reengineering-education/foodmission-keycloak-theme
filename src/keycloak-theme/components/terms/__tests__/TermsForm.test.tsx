import { render, screen } from "@testing-library/react";
import { TermsForm } from "../TermsForm";
import { describe, it, expect } from "vitest";
import { createTermsMockKcContext } from "../../../test-utils/mockKcContext";
import { createMockI18n } from "../../../test-utils/mockI18n";

const mockI18n = createMockI18n();
const mockKcContext = createTermsMockKcContext();

describe("TermsForm", () => {
  it("renders terms form with title", () => {
    render(<TermsForm kcContext={mockKcContext} i18n={mockI18n} />);

    expect(screen.getByText("termsTitle")).toBeInTheDocument();
  });

  it("renders accept and decline buttons", () => {
    render(<TermsForm kcContext={mockKcContext} i18n={mockI18n} />);

    expect(
      screen.getByRole("button", { name: "doAccept" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "doDecline" })
    ).toBeInTheDocument();
  });

  it("renders terms content", () => {
    render(<TermsForm kcContext={mockKcContext} i18n={mockI18n} />);

    expect(screen.getByText(/terms and conditions/i)).toBeInTheDocument();
  });
});
