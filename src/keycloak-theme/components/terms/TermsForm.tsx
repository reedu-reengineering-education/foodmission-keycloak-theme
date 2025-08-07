import type { KcContext } from "../../kcContext";
import type { I18n } from "../../i18n";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import { Label } from "../../../components/ui/label";

// Extract the Terms page context specifically
type TermsKcContext = Extract<KcContext, { pageId: "terms.ftl" }>;

type Props = {
  kcContext: TermsKcContext;
  i18n: I18n;
  className?: string;
};

export function TermsForm({ kcContext, i18n, className = "" }: Props) {
  const { url, user } = kcContext;
  const { msgStr } = i18n;

  return (
    <div className={className}>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {msgStr("termsTitle")}
        </h2>
        <p className="text-gray-600">
          Please review and accept our terms and conditions to continue
        </p>
      </div>

      {/* User Info */}
      {user && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Welcome, {user.firstName} {user.lastName} ({user.email})
          </p>
        </div>
      )}

      {/* Terms Content */}
      <div className="mb-6 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-6 bg-white">
        <div className="prose prose-sm max-w-none">
          {kcContext.__localizationRealmOverridesTermsText ? (
            <div
              dangerouslySetInnerHTML={{
                __html: kcContext.__localizationRealmOverridesTermsText,
              }}
            />
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                FOODMISSION Terms of Service
              </h3>

              <h4 className="font-semibold mb-2">1. Acceptance of Terms</h4>
              <p className="mb-4">
                By accessing and using the FOODMISSION platform, you accept and
                agree to be bound by the terms and provision of this agreement.
              </p>

              <h4 className="font-semibold mb-2">2. Research Participation</h4>
              <p className="mb-4">
                FOODMISSION is a citizen science project focused on healthy food
                consumption and food waste reduction. By participating, you
                agree to contribute data for research purposes.
              </p>

              <h4 className="font-semibold mb-2">3. Data Collection and Use</h4>
              <p className="mb-4">
                We collect data about your food consumption habits, preferences,
                and waste patterns. This data will be used for scientific
                research and may be shared with research partners in anonymized
                form.
              </p>

              <h4 className="font-semibold mb-2">4. Privacy</h4>
              <p className="mb-4">
                Your personal information will be handled according to our
                Privacy Policy. We are committed to protecting your privacy and
                ensuring data security.
              </p>

              <h4 className="font-semibold mb-2">5. User Responsibilities</h4>
              <p className="mb-4">
                You agree to provide accurate information and use the platform
                responsibly. You will not misuse the platform or interfere with
                other users' experience.
              </p>

              <h4 className="font-semibold mb-2">6. Intellectual Property</h4>
              <p className="mb-4">
                The FOODMISSION platform and its content are protected by
                intellectual property laws. You may not reproduce or distribute
                content without permission.
              </p>

              <h4 className="font-semibold mb-2">7. Termination</h4>
              <p className="mb-4">
                We reserve the right to terminate or suspend your account if you
                violate these terms or engage in inappropriate behavior.
              </p>

              <h4 className="font-semibold mb-2">8. Changes to Terms</h4>
              <p className="mb-4">
                We may update these terms from time to time. Continued use of
                the platform constitutes acceptance of any changes.
              </p>

              <h4 className="font-semibold mb-2">9. Contact Information</h4>
              <p className="mb-4">
                If you have questions about these terms, please contact us at
                support@foodmission.eu
              </p>

              <p className="text-sm text-gray-600 mt-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Acceptance Form */}
      <form
        method="POST"
        action={url?.loginAction || "#"}
        className="space-y-4"
      >
        <div className="flex items-start space-x-3">
          <Checkbox
            id="acceptTerms"
            name="acceptTerms"
            required
            className="mt-1"
          />
          <Label htmlFor="acceptTerms" className="text-sm leading-5">
            I have read and agree to the Terms of Service and Privacy Policy. I
            understand that my participation in FOODMISSION is voluntary and
            that my data will be used for research purposes.
          </Label>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1">
            {msgStr("doAccept")}
          </Button>
          <Button
            type="submit"
            name="cancel"
            value="true"
            variant="outline"
            className="flex-1"
          >
            {msgStr("doDecline")}
          </Button>
        </div>
      </form>
    </div>
  );
}
