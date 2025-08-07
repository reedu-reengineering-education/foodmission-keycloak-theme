import { useThemeConfig } from "../../../lib/use-theme-config";
import { useI18n } from "../../i18n";
import { LanguageSwitcher } from "../language/LanguageSwitcher";

interface LoginFooterProps {
  className?: string;
  kcContext?: any;
}

export function LoginFooter({
  className = "",
  kcContext = {},
}: LoginFooterProps) {
  const themeConfig = useThemeConfig();
  const { i18n } = useI18n({ kcContext });
  const { msgStr } = i18n;

  return (
    <footer className={`text-center space-y-6 ${className}`}>
      {/* Language Selector */}
      <div className="flex justify-center">
        <LanguageSwitcher
          kcContext={kcContext}
          i18n={i18n}
          className="text-sm"
        />
      </div>

      {/* Project Links */}
      <div className="flex flex-wrap justify-center gap-6 text-sm">
        <a
          href={themeConfig.content.privacyPolicyUrl}
          className="text-gray-600 hover:text-primary transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {msgStr("footer.privacy")}
        </a>
        <a
          href={themeConfig.content.termsOfServiceUrl}
          className="text-gray-600 hover:text-primary transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {msgStr("footer.terms")}
        </a>
        <a
          href="https://foodmission.eu/about"
          className="text-gray-600 hover:text-primary transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {msgStr("footer.about")}
        </a>
        <a
          href="https://foodmission.eu/research"
          className="text-gray-600 hover:text-primary transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {msgStr("footer.contact")}
        </a>
      </div>

      {/* Support Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-md mx-auto">
        <h3 className="font-medium text-gray-900 mb-2">
          {msgStr("footer.support")}
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>{msgStr("footer.contact")}</p>
          <a
            href={`mailto:${themeConfig.content.supportEmail}`}
            className="text-primary hover:underline font-medium"
          >
            {themeConfig.content.supportEmail}
          </a>
        </div>
      </div>

      {/* EU Funding Acknowledgment */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <svg
              className="h-4 w-4 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>EU-Funded Project</span>
          </div>
          <span>•</span>
          <span>Horizon Europe Programme</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">{msgStr("footer.funding")}</p>
      </div>

      {/* Copyright */}
      <div className="text-xs text-gray-400">
        © {new Date().getFullYear()} {themeConfig.branding.projectName}. All
        rights reserved.
      </div>
    </footer>
  );
}
