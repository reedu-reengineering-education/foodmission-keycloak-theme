import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Wrench,
  Clock,
  RefreshCw,
  Calendar,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useThemeConfig } from "@/lib/use-theme-config";

export interface MaintenancePageProps {
  /** Custom title for the maintenance page */
  title?: string;
  /** Main maintenance message */
  message?: string;
  /** Expected maintenance end time */
  expectedEndTime?: Date;
  /** Whether maintenance is planned or emergency */
  isEmergency?: boolean;
  /** Additional details about the maintenance */
  details?: string;
  /** Whether to show the retry button */
  showRetry?: boolean;
  /** Whether to show status updates link */
  showStatusUpdates?: boolean;
  /** Custom retry interval in seconds */
  retryInterval?: number;
  /** Callback for retry action */
  onRetry?: () => void;
  /** URL for status updates page */
  statusUpdatesUrl?: string;
}

/**
 * MaintenancePage component for displaying system maintenance notifications
 * with FOODMISSION branding and consistent styling
 */
export const MaintenancePage: React.FC<MaintenancePageProps> = ({
  title,
  message,
  expectedEndTime,
  isEmergency = false,
  details,
  showRetry = true,
  showStatusUpdates = false,
  retryInterval = 30,
  onRetry,
  statusUpdatesUrl,
}) => {
  const themeConfig = useThemeConfig();
  const [countdown, setCountdown] = React.useState<number>(retryInterval);
  const [autoRetryEnabled, setAutoRetryEnabled] =
    React.useState<boolean>(false);

  // Auto-retry countdown
  React.useEffect(() => {
    if (!autoRetryEnabled) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleRetry();
          return retryInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRetryEnabled, retryInterval]);

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Default retry behavior - reload the page
      window.location.reload();
    }
  };

  const toggleAutoRetry = () => {
    setAutoRetryEnabled(!autoRetryEnabled);
    if (!autoRetryEnabled) {
      setCountdown(retryInterval);
    }
  };

  const formatTimeRemaining = (endTime: Date) => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();

    if (diff <= 0) return "Maintenance should be complete";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `Approximately ${hours}h ${minutes}m remaining`;
    }
    return `Approximately ${minutes}m remaining`;
  };

  const defaultTitle = isEmergency
    ? "Emergency Maintenance in Progress"
    : "Scheduled Maintenance";

  const defaultMessage = isEmergency
    ? "We are currently performing emergency maintenance to resolve a critical issue. The FOODMISSION platform will be back online as soon as possible."
    : "The FOODMISSION platform is currently undergoing scheduled maintenance to improve your experience. We apologize for any inconvenience.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div
            className={`mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center ${
              isEmergency ? "bg-destructive/10" : "bg-foodmission-warning/10"
            }`}
          >
            {isEmergency ? (
              <AlertTriangle className="w-6 h-6 text-destructive" />
            ) : (
              <Wrench className="w-6 h-6 text-foodmission-warning" />
            )}
          </div>
          <h1 className="text-xl font-semibold">{title || defaultTitle}</h1>
          {themeConfig.branding.projectName && (
            <p className="text-sm text-muted-foreground">
              {themeConfig.branding.projectName}
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert variant={isEmergency ? "destructive" : "default"}>
            {isEmergency ? (
              <AlertTriangle className="h-4 w-4" />
            ) : (
              <Info className="h-4 w-4" />
            )}
            <AlertTitle>
              {isEmergency
                ? "Service Temporarily Unavailable"
                : "Maintenance in Progress"}
            </AlertTitle>
            <AlertDescription>{message || defaultMessage}</AlertDescription>
          </Alert>

          {expectedEndTime && (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div className="text-sm">
                <div className="font-medium">Expected completion:</div>
                <div className="text-muted-foreground">
                  {expectedEndTime.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatTimeRemaining(expectedEndTime)}
                </div>
              </div>
            </div>
          )}

          {details && (
            <div className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
              <div className="font-medium mb-1">Maintenance Details:</div>
              {details}
            </div>
          )}

          <div className="space-y-2">
            {showRetry && (
              <div className="space-y-2">
                <Button onClick={handleRetry} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Check Again
                </Button>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoRetryEnabled}
                      onChange={toggleAutoRetry}
                      className="rounded"
                    />
                    Auto-retry
                  </label>
                  {autoRetryEnabled && (
                    <span className="text-muted-foreground">
                      Next check in {countdown}s
                    </span>
                  )}
                </div>
              </div>
            )}

            {showStatusUpdates && statusUpdatesUrl && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(statusUpdatesUrl, "_blank")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                View Status Updates
              </Button>
            )}
          </div>

          <div className="text-center space-y-2">
            {themeConfig.content.supportEmail && (
              <div className="text-sm text-muted-foreground">
                Questions about this maintenance?{" "}
                <a
                  href={`mailto:${themeConfig.content.supportEmail}?subject=Maintenance Inquiry`}
                  className="text-primary hover:underline"
                >
                  Contact Support
                </a>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              Thank you for your patience as we work to improve the FOODMISSION
              platform.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
