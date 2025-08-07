import { render, screen } from "@testing-library/react";
import { UpdateProfileForm } from "../UpdateProfileForm";
import { describe, it, expect } from "vitest";
import { createUpdateProfileMockKcContext } from "../../../test-utils/mockKcContext";
import { createMockI18n } from "../../../test-utils/mockI18n";

const mockI18n = createMockI18n();
const mockKcContext = createUpdateProfileMockKcContext();

describe("UpdateProfileForm", () => {
  it("renders the form with required fields", () => {
    render(<UpdateProfileForm kcContext={mockKcContext} i18n={mockI18n} />);

    expect(screen.getByText("loginProfileTitle")).toBeInTheDocument();
    expect(screen.getByLabelText("firstName *")).toBeInTheDocument();
    expect(screen.getByLabelText("lastName *")).toBeInTheDocument();
    expect(screen.getByLabelText("email *")).toBeInTheDocument();
    expect(screen.getByLabelText("username *")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "doSubmit" })
    ).toBeInTheDocument();
  });

  it("pre-fills form with user data", () => {
    render(<UpdateProfileForm kcContext={mockKcContext} i18n={mockI18n} />);

    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("john.doe@foodmission.eu")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("johndoe")).toBeInTheDocument();
  });

  it("shows error message when provided", () => {
    const contextWithError = createUpdateProfileMockKcContext({
      message: {
        type: "error" as const,
        summary: "Profile update failed",
      },
    });

    render(<UpdateProfileForm kcContext={contextWithError} i18n={mockI18n} />);

    expect(screen.getByText("Profile update failed")).toBeInTheDocument();
  });

  it("shows success message when provided", () => {
    const contextWithSuccess = createUpdateProfileMockKcContext({
      message: {
        type: "success" as const,
        summary: "Profile updated successfully",
      },
    });

    render(
      <UpdateProfileForm kcContext={contextWithSuccess} i18n={mockI18n} />
    );

    expect(
      screen.getByText("Profile updated successfully")
    ).toBeInTheDocument();
  });

  it("shows cancel button when isAppInitiatedAction is true", () => {
    const contextWithCancel = createUpdateProfileMockKcContext({
      isAppInitiatedAction: true,
    });

    render(<UpdateProfileForm kcContext={contextWithCancel} i18n={mockI18n} />);

    expect(
      screen.getByRole("button", { name: "doCancel" })
    ).toBeInTheDocument();
  });

  it("hides cancel button when isAppInitiatedAction is false", () => {
    const contextWithoutCancel = createUpdateProfileMockKcContext({
      isAppInitiatedAction: false,
    });

    render(
      <UpdateProfileForm kcContext={contextWithoutCancel} i18n={mockI18n} />
    );

    expect(
      screen.queryByRole("button", { name: "doCancel" })
    ).not.toBeInTheDocument();
  });

  it("handles empty user data gracefully", () => {
    const contextWithEmptyUser = createUpdateProfileMockKcContext({
      profile: {
        attributesByName: {
          firstName: {
            name: "firstName",
            value: "",
            required: true,
            readOnly: false,
            validators: {},
            annotations: {},
          },
          lastName: {
            name: "lastName",
            value: "",
            required: true,
            readOnly: false,
            validators: {},
            annotations: {},
          },
          email: {
            name: "email",
            value: "",
            required: true,
            readOnly: false,
            validators: {},
            annotations: {},
          },
          username: {
            name: "username",
            value: "",
            required: true,
            readOnly: false,
            validators: {},
            annotations: {},
          },
        },
      },
    });

    render(
      <UpdateProfileForm kcContext={contextWithEmptyUser} i18n={mockI18n} />
    );

    expect(screen.getByLabelText("firstName *")).toHaveValue("");
    expect(screen.getByLabelText("lastName *")).toHaveValue("");
    expect(screen.getByLabelText("email *")).toHaveValue("");
    expect(screen.getByLabelText("username *")).toHaveValue("");
  });
});
