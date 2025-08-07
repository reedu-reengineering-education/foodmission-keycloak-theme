import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Info,
  CheckCircle,
  Clock,
  Mail,
  Shield,
  UserCheck,
  ArrowRight,
  Home,
} from "lucide-react";
import { useThemeConfig } from "@/lib/use-theme-config";

export type InfoPageType =
  | "email-verification"
  | "registration-success"
  | "password-reset-sent"
  | "account-locked"
  | "session-expired"
  | "logout-success"
  | "account-verified"
  | "maintenance"
  | "custom";

export interface InfoPageProps {
  /** The type of info page to display */
  type: InfoPageType;
  /** Custom title (overrides default for type) */
  title?: string;
  /** Custom message (overrides default for type) */
  message?: string;
  /** Additional details or instructions */
  details?: string;
  /** Whether to show the continue button */
  showContinue?: boolean;
  /** Whether to show the home button */
  showHome?: boolean;
  /** Custom continue button text */
  continueText?: string;
  /** Callback for continue action */
  onContinue?: () => void;
  /** Callback for home navigation */
  onHome?: () => void;
  /** Custom icon to display */
  customIcon?: React.ReactNode;
}

/**
 * InfoPage component for displaying various authentication states
 * with FOODMISSION branding and consistent styling
 */
export const InfoPage: React.FC<InfoPageProps> = ({
  type,
  title,
  message,
  details,
  showContinue = true,
  showHome = false,
  continueText,
  onContinue,
  onHome,
  customIcon,
}) => {
  const themeConfig = useThemeConfig();

  // Default configurations for each info page type
  const getInfoConfig = () => {
    switch (type) {
      case "email-verification":
        return {
          title: title || "Check Your Email",
          message:
            message ||
            "We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.",
          icon: <Mail className="w-6 h-6 text-primary" />,
          variant: "default" as const,
          continueText: continueText || "Continue to Login",
        };

      case "registration-success":
        return {
          title: title || "Welcome to FOODMISSION!",
          message:
            message ||
            "Your account has been created successfully. You can now start contributing to our citizen science initiative.",
          icon: <CheckCircle className="w-6 h-6 text-foodmission-success" />,
          variant: "success" as const,
          continueText: continueText || "Get Started",
        };

      case "password-reset-sent":
        return {
          title: title || "Password Reset Email Sent",
          message:
            message ||
            "We've sent password reset instructions to your email address. Please check your inbox and follow the link to reset your password.",
          icon: <Mail className="w-6 h-6 text-primary" />,
          variant: "default" as const,
          continueText: continueText || "Back to Login",
        };

      case "account-locked":
        return {
          title: title || "Account Temporarily Locked",
          message:
            message ||
            "Your account has been temporarily locked due to multiple failed login attempts. Please try again later or contact support.",
          icon: <Shield className="w-6 h-6 text-foodmission-warning" />,
          variant: "warning" as const,
          continueText: continueText || "Contact Support",
        };

      case "session-expired":
        return {
          title: title || "Session Expired",
          message:
            message ||
            "Your session has expired for security reasons. Please log in again to continue.",
          icon: <Clock className="w-6 h-6 text-foodmission-warning" />,
          variant: "warning" as const,
          continueText: continueText || "Log In Again",
        };

      case "logout-success":
        return {
          title: title || "Logged Out Successfully",
          message:
            message ||
            "You have been successfully logged out of your FOODMISSION account. Thank you for contributing to our mission!",
          icon: <CheckCircle className="w-6 h-6 text-foodmission-success" />,
          variant: "success" as const,
          continueText: continueText || "Log In Again",
        };

      case "account-verified":
        return {
          title: title || "Account Verified",
          message:
            message ||
            "Your email address has been successfully verified. You can now access all FOODMISSION features.",
          icon: <UserCheck className="w-6 h-6 text-foodmission-success" />,
          variant: "success" as const,
          continueText: continueText || "Continue to Dashboard",
        };

      case "maintenance":
        return {
          title: title || "System Maintenance",
          message:
            message ||
            "The FOODMISSION platform is currently undergoing scheduled maintenance. Please try again later.",
          icon: <Info className="w-6 h-6 text-foodmission-warning" />,
          variant: "warning" as const,
          continueText: continueText || "Try Again Later",
        };

      default:
        return {
          title: title || "Information",
          message: message || "Please review the information below.",
          icon: <Info className="w-6 h-6 text-primary" />,
          variant: "default" as const,
          continueText: continueText || "Continue",
        };
    }
  };

  const config = getInfoConfig();
  const displayIcon = customIcon || config.icon;

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else {
      // Default continue behavior based on type
      switch (type) {
        case "registration-success":
        case "account-verified":
          window.location.href = "/dashboard";
          break;
        case "logout-success":
        case "password-reset-sent":
        case "session-expired":
          window.location.href = "/login";
          break;
        case "account-locked":
          if (themeConfig.content.supportEmail) {
            window.location.href = `mailto:${themeConfig.content.supportEmail}`;
          }
          break;
        default:
          window.location.href = "/";
      }
    }
  };

  const handleHome = () => {
    if (onHome) {
      onHome();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            {displayIcon}
          </div>
          <h1 className="text-xl font-semibold">{config.title}</h1>
          {themeConfig.branding.projectName && (
            <p className="text-sm text-muted-foreground">
              {themeConfig.branding.projectName}
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert
            variant={config.variant === "warning" ? "destructive" : "default"}
          >
            {displayIcon}
            <AlertDescription>{config.message}</AlertDescription>
          </Alert>

          {details && (
            <div className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
              {details}
            </div>
          )}

          <div className="flex flex-col gap-2">
            {showContinue && (
              <Button onClick={handleContinue} className="w-full">
                <ArrowRight className="w-4 h-4 mr-2" />
                {config.continueText}
              </Button>
            )}

            {showHome && (
              <Button variant="outline" onClick={handleHome} className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
            )}
          </div>

          {(type === "email-verification" ||
            type === "password-reset-sent") && (
            <div className="text-center text-sm text-muted-foreground">
              Didn't receive the email?{" "}
              <button
                className="text-primary hover:underline"
                onClick={() => {
                  // This would trigger email resend functionality
                  console.log("Resend email requested");
                }}
              >
                Resend
              </button>
            </div>
          )}

          {themeConfig.content.supportEmail &&
            (type === "account-locked" || type === "maintenance") && (
              <div className="text-center text-sm text-muted-foreground">
                Need assistance?{" "}
                <a
                  href={`mailto:${themeConfig.content.supportEmail}`}
                  className="text-primary hover:underline"
                >
                  Contact Support
                </a>
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
};
