import React, { useState } from "react";
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardHeader,
} from "../../../components/ui";
import { useThemeConfig } from "../../../lib/use-theme-config";

interface PasswordChangeFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordChangeFormProps {
  onSubmit?: (data: PasswordChangeFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  error?: string;
  validationErrors?: Partial<Record<keyof PasswordChangeFormData, string>>;
  requireCurrentPassword?: boolean;
}

export function PasswordChangeForm({
  onSubmit,
  onCancel,
  isLoading = false,
  error,
  validationErrors = {},
  requireCurrentPassword = true,
}: PasswordChangeFormProps) {
  const [formData, setFormData] = useState<PasswordChangeFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const themeConfig = useThemeConfig();

  const handleInputChange =
    (field: keyof PasswordChangeFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const getFieldError = (field: keyof PasswordChangeFormData) => {
    if (validationErrors[field]) return validationErrors[field];

    // Client-side validation
    switch (field) {
      case "newPassword":
        if (formData.newPassword && formData.newPassword.length < 8) {
          return "Password must be at least 8 characters long";
        }
        if (
          formData.newPassword &&
          !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)
        ) {
          return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
        }
        if (
          formData.currentPassword &&
          formData.newPassword === formData.currentPassword
        ) {
          return "New password must be different from current password";
        }
        break;
      case "confirmPassword":
        if (
          formData.confirmPassword &&
          formData.newPassword !== formData.confirmPassword
        ) {
          return "Passwords do not match";
        }
        break;
    }
    return null;
  };

  const isFormValid = () => {
    const hasCurrentPassword =
      !requireCurrentPassword || formData.currentPassword.trim();
    const hasNewPassword = formData.newPassword.trim();
    const hasConfirmPassword = formData.confirmPassword.trim();
    const passwordsMatch = formData.newPassword === formData.confirmPassword;
    const newPasswordValid =
      formData.newPassword.length >= 8 &&
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword);
    const passwordsDifferent =
      !requireCurrentPassword ||
      formData.currentPassword !== formData.newPassword;

    return (
      hasCurrentPassword &&
      hasNewPassword &&
      hasConfirmPassword &&
      passwordsMatch &&
      newPasswordValid &&
      passwordsDifferent
    );
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    return strength;
  };

  const getPasswordStrengthLabel = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return { label: "Very Weak", color: "text-red-600" };
      case 2:
        return { label: "Weak", color: "text-orange-600" };
      case 3:
        return { label: "Fair", color: "text-yellow-600" };
      case 4:
        return { label: "Good", color: "text-blue-600" };
      case 5:
        return { label: "Strong", color: "text-green-600" };
      default:
        return { label: "", color: "" };
    }
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);
  const strengthInfo = getPasswordStrengthLabel(passwordStrength);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold text-center">Change Password</h1>
        <p className="text-center text-muted-foreground">
          Update your {themeConfig.branding.projectName} account password
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          {requireCurrentPassword && (
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  required
                  value={formData.currentPassword}
                  onChange={handleInputChange("currentPassword")}
                  disabled={isLoading}
                  placeholder="Enter your current password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showPasswords.current ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    )}
                  </svg>
                </button>
              </div>
              {getFieldError("currentPassword") && (
                <p className="text-sm text-red-600">
                  {getFieldError("currentPassword")}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showPasswords.new ? "text" : "password"}
                required
                value={formData.newPassword}
                onChange={handleInputChange("newPassword")}
                disabled={isLoading}
                placeholder="Enter your new password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={isLoading}
              >
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {showPasswords.new ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  )}
                </svg>
              </button>
            </div>
            {getFieldError("newPassword") && (
              <p className="text-sm text-red-600">
                {getFieldError("newPassword")}
              </p>
            )}

            {/* Password Strength Indicator */}
            {formData.newPassword && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    Password strength:
                  </span>
                  <span className={`text-xs font-medium ${strengthInfo.color}`}>
                    {strengthInfo.label}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      passwordStrength <= 1
                        ? "bg-red-500"
                        : passwordStrength === 2
                        ? "bg-orange-500"
                        : passwordStrength === 3
                        ? "bg-yellow-500"
                        : passwordStrength === 4
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPasswords.confirm ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                disabled={isLoading}
                placeholder="Confirm your new password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={isLoading}
              >
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {showPasswords.confirm ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  )}
                </svg>
              </button>
            </div>
            {getFieldError("confirmPassword") && (
              <p className="text-sm text-red-600">
                {getFieldError("confirmPassword")}
              </p>
            )}
          </div>

          {/* Password Requirements */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Password Requirements:
            </h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li
                className={`flex items-center space-x-2 ${
                  formData.newPassword.length >= 8 ? "text-green-600" : ""
                }`}
              >
                <span>{formData.newPassword.length >= 8 ? "✓" : "•"}</span>
                <span>At least 8 characters long</span>
              </li>
              <li
                className={`flex items-center space-x-2 ${
                  /[a-z]/.test(formData.newPassword) ? "text-green-600" : ""
                }`}
              >
                <span>{/[a-z]/.test(formData.newPassword) ? "✓" : "•"}</span>
                <span>At least one lowercase letter</span>
              </li>
              <li
                className={`flex items-center space-x-2 ${
                  /[A-Z]/.test(formData.newPassword) ? "text-green-600" : ""
                }`}
              >
                <span>{/[A-Z]/.test(formData.newPassword) ? "✓" : "•"}</span>
                <span>At least one uppercase letter</span>
              </li>
              <li
                className={`flex items-center space-x-2 ${
                  /\d/.test(formData.newPassword) ? "text-green-600" : ""
                }`}
              >
                <span>{/\d/.test(formData.newPassword) ? "✓" : "•"}</span>
                <span>At least one number</span>
              </li>
              <li
                className={`flex items-center space-x-2 ${
                  /[^a-zA-Z\d]/.test(formData.newPassword)
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                <span>
                  {/[^a-zA-Z\d]/.test(formData.newPassword) ? "✓" : "•"}
                </span>
                <span>Special character (recommended)</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading || !isFormValid()}
            >
              {isLoading ? "Changing Password..." : "Change Password"}
            </Button>

            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
            )}
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
            <div className="flex items-start space-x-2">
              <svg
                className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <div>
                <p className="font-medium text-blue-800">Security Tip</p>
                <p className="text-blue-700 mt-1">
                  Use a unique password that you don't use for other accounts.
                  Consider using a password manager to generate and store secure
                  passwords.
                </p>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
