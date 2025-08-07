import type { ReactNode } from "react";
import type { I18n } from "../../i18n";
import type { KcContext } from "../../kcContext";
import { LanguageSwitcher } from "../language/LanguageSwitcher";
import FoodmissionLogo from "../../../assets/Foodmission_logo_v3-01.svg";

interface Props {
  children: ReactNode;
  kcContext: KcContext;
  i18n: I18n;
  showBranding?: boolean;
  brandingContent?: ReactNode;
  showLanguageSwitcher?: boolean;
}

export function TwoColumnLayout({
  children,
  kcContext,
  i18n,
  showBranding = true,
  brandingContent,
  showLanguageSwitcher = true,
}: Props) {
  const { msgStr } = i18n;

  const defaultBrandingContent = (
    <div className="max-w-md gap-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {msgStr("foodmission.welcome")}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {msgStr("foodmission.description")}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex relative">
      {/* Left Side - Branding/Info */}
      {showBranding && (
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 to-primary/5 flex-col px-12">
          {/* Logo at top left */}
          <div className="pt-8 pb-4">
            <img
              src={FoodmissionLogo}
              alt="Foodmission Logo"
              className="h-16 w-auto"
            />
          </div>

          {/* Main branding content - centered */}
          <div className="flex-1 flex items-center">
            {brandingContent || defaultBrandingContent}
          </div>

          {/* Footer within branding column */}
          <div className="pb-8 text-sm text-gray-500">
            <p>© 2025 FOODMISSION. All rights reserved.</p>
            <p className="mt-1">
              This project has received funding from the European Union
            </p>
          </div>
        </div>
      )}

      {/* Right Side - Content */}
      <div
        className={`flex-1 ${
          showBranding ? "lg:w-1/2" : "w-full"
        } flex flex-col`}
      >
        {/* Language Switcher - Fixed position */}
        {showLanguageSwitcher && (
          <div className="z-10 flex justify-end p-4">
            <LanguageSwitcher kcContext={kcContext} i18n={i18n} />
          </div>
        )}
        <div
          className={`flex-1 w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8`}
        >
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Header - only show when branding is enabled */}
            {showBranding && (
              <div className="lg:hidden text-center mb-8">
                <div className="mb-6">
                  <img
                    src={FoodmissionLogo}
                    alt="Foodmission Logo"
                    className="h-12 w-auto mx-auto mb-4"
                  />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {msgStr("foodmission.welcome")}
                </h1>
                <p className="text-lg text-gray-600">
                  {msgStr("foodmission.description")}
                </p>
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
