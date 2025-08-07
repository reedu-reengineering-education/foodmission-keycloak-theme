import { useThemeConfig } from "../../../lib/use-theme-config";
import { useI18n } from "../../i18n";

interface LoginHeaderProps {
  className?: string;
  kcContext?: any;
}

export function LoginHeader({
  className = "",
  kcContext = {},
}: LoginHeaderProps) {
  const themeConfig = useThemeConfig();
  const { i18n } = useI18n({ kcContext });
  const { msgStr } = i18n;

  return (
    <header className={`text-center space-y-6 ${className}`}>
      {/* FOODMISSION Logo */}
      <div className="flex justify-center">
        <img
          src={themeConfig.branding.logoUrl}
          alt={`${themeConfig.branding.projectName} Logo`}
          className="h-16 w-auto"
          onError={(e) => {
            // Fallback to text if logo fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) {
              fallback.style.display = "block";
            }
          }}
        />
        <div
          className="hidden text-3xl font-bold"
          style={{ color: themeConfig.branding.primaryColor }}
        >
          {themeConfig.branding.projectName}
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          {msgStr("foodmission.welcome")}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {msgStr("foodmission.description")}
        </p>
      </div>

      {/* Citizen Science Context */}
      <div className="bg-secondary border border-border rounded-lg p-4 max-w-2xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div className="text-sm">
            <p className="font-medium text-green-800">
              {msgStr("foodmission.tagline")}
            </p>
            <p className="text-green-700">{msgStr("foodmission.mission")}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
