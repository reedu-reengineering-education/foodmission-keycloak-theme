import React, { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Checkbox, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui';
import { useThemeConfig } from '../../../lib/use-theme-config';

interface AccountSettingsData {
  emailNotifications: {
    researchUpdates: boolean;
    weeklyDigest: boolean;
    systemAlerts: boolean;
    marketingEmails: boolean;
  };
  privacy: {
    profileVisibility: 'private' | 'researchers' | 'community';
    dataSharing: boolean;
    anonymousAnalytics: boolean;
  };
  preferences: {
    language: string;
    timezone: string;
    dateFormat: string;
    measurementUnit: string;
  };
  research: {
    participationLevel: 'basic' | 'standard' | 'advanced';
    dataRetention: 'minimum' | 'standard' | 'extended';
    followUpStudies: boolean;
  };
}

interface AccountSettingsProps {
  initialData?: Partial<AccountSettingsData>;
  onSubmit?: (data: AccountSettingsData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  error?: string;
}

export function AccountSettings({ 
  initialData = {}, 
  onSubmit, 
  onCancel,
  isLoading = false, 
  error
}: AccountSettingsProps) {
  const [settingsData, setSettingsData] = useState<AccountSettingsData>({
    emailNotifications: {
      researchUpdates: initialData.emailNotifications?.researchUpdates ?? true,
      weeklyDigest: initialData.emailNotifications?.weeklyDigest ?? true,
      systemAlerts: initialData.emailNotifications?.systemAlerts ?? true,
      marketingEmails: initialData.emailNotifications?.marketingEmails ?? false,
    },
    privacy: {
      profileVisibility: initialData.privacy?.profileVisibility ?? 'researchers',
      dataSharing: initialData.privacy?.dataSharing ?? true,
      anonymousAnalytics: initialData.privacy?.anonymousAnalytics ?? true,
    },
    preferences: {
      language: initialData.preferences?.language ?? 'en',
      timezone: initialData.preferences?.timezone ?? 'Europe/Brussels',
      dateFormat: initialData.preferences?.dateFormat ?? 'DD/MM/YYYY',
      measurementUnit: initialData.preferences?.measurementUnit ?? 'metric',
    },
    research: {
      participationLevel: initialData.research?.participationLevel ?? 'standard',
      dataRetention: initialData.research?.dataRetention ?? 'standard',
      followUpStudies: initialData.research?.followUpStudies ?? true,
    },
  });

  const themeConfig = useThemeConfig();

  const handleCheckboxChange = (section: keyof AccountSettingsData, field: string) => (
    checked: boolean
  ) => {
    setSettingsData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: checked,
      },
    }));
  };

  const handleSelectChange = (section: keyof AccountSettingsData, field: string) => (
    value: string
  ) => {
    setSettingsData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (onSubmit) {
      onSubmit(settingsData);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Account Settings
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Manage your {themeConfig.branding.projectName} account preferences and privacy settings
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          {/* Email Notifications */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
            <p className="text-sm text-gray-600">
              Choose which emails you'd like to receive from the FOODMISSION project.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="researchUpdates"
                  checked={settingsData.emailNotifications.researchUpdates}
                  onCheckedChange={handleCheckboxChange('emailNotifications', 'researchUpdates')}
                  disabled={isLoading}
                />
                <div className="space-y-1">
                  <label htmlFor="researchUpdates" className="text-sm font-medium cursor-pointer">
                    Research Updates
                  </label>
                  <p className="text-xs text-gray-500">
                    Important updates about the research project, findings, and your contributions
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="weeklyDigest"
                  checked={settingsData.emailNotifications.weeklyDigest}
                  onCheckedChange={handleCheckboxChange('emailNotifications', 'weeklyDigest')}
                  disabled={isLoading}
                />
                <div className="space-y-1">
                  <label htmlFor="weeklyDigest" className="text-sm font-medium cursor-pointer">
                    Weekly Digest
                  </label>
                  <p className="text-xs text-gray-500">
                    Weekly summary of your activity, tips, and community highlights
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="systemAlerts"
                  checked={settingsData.emailNotifications.systemAlerts}
                  onCheckedChange={handleCheckboxChange('emailNotifications', 'systemAlerts')}
                  disabled={isLoading}
                />
                <div className="space-y-1">
                  <label htmlFor="systemAlerts" className="text-sm font-medium cursor-pointer">
                    System Alerts
                  </label>
                  <p className="text-xs text-gray-500">
                    Important account and security notifications (recommended)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketingEmails"
                  checked={settingsData.emailNotifications.marketingEmails}
                  onCheckedChange={handleCheckboxChange('emailNotifications', 'marketingEmails')}
                  disabled={isLoading}
                />
                <div className="space-y-1">
                  <label htmlFor="marketingEmails" className="text-sm font-medium cursor-pointer">
                    Marketing Communications
                  </label>
                  <p className="text-xs text-gray-500">
                    Information about related projects, events, and opportunities
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy Settings */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Privacy & Data Sharing</h3>
            <p className="text-sm text-gray-600">
              Control how your data is used and shared within the research project.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Profile Visibility</label>
                <Select
                  value={settingsData.privacy.profileVisibility}
                  onValueChange={handleSelectChange('privacy', 'profileVisibility')}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private - Only visible to you</SelectItem>
                    <SelectItem value="researchers">Researchers - Visible to research team only</SelectItem>
                    <SelectItem value="community">Community - Visible to other participants (anonymized)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  Controls who can see your profile information and activity
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="dataSharing"
                  checked={settingsData.privacy.dataSharing}
                  onCheckedChange={handleCheckboxChange('privacy', 'dataSharing')}
                  disabled={isLoading}
                />
                <div className="space-y-1">
                  <label htmlFor="dataSharing" className="text-sm font-medium cursor-pointer">
                    Research Data Sharing
                  </label>
                  <p className="text-xs text-gray-500">
                    Allow your anonymized data to be shared with other approved research institutions
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="anonymousAnalytics"
                  checked={settingsData.privacy.anonymousAnalytics}
                  onCheckedChange={handleCheckboxChange('privacy', 'anonymousAnalytics')}
                  disabled={isLoading}
                />
                <div className="space-y-1">
                  <label htmlFor="anonymousAnalytics" className="text-sm font-medium cursor-pointer">
                    Anonymous Analytics
                  </label>
                  <p className="text-xs text-gray-500">
                    Help improve the platform by sharing anonymous usage data
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* User Preferences */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
            <p className="text-sm text-gray-600">
              Customize your experience with language, timezone, and display preferences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select
                  value={settingsData.preferences.language}
                  onValueChange={handleSelectChange('preferences', 'language')}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="it">Italiano</SelectItem>
                    <SelectItem value="nl">Nederlands</SelectItem>
                    <SelectItem value="pl">Polski</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Timezone</label>
                <Select
                  value={settingsData.preferences.timezone}
                  onValueChange={handleSelectChange('preferences', 'timezone')}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Europe/Brussels">Brussels (CET/CEST)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT/BST)</SelectItem>
                    <SelectItem value="Europe/Berlin">Berlin (CET/CEST)</SelectItem>
                    <SelectItem value="Europe/Paris">Paris (CET/CEST)</SelectItem>
                    <SelectItem value="Europe/Rome">Rome (CET/CEST)</SelectItem>
                    <SelectItem value="Europe/Madrid">Madrid (CET/CEST)</SelectItem>
                    <SelectItem value="Europe/Amsterdam">Amsterdam (CET/CEST)</SelectItem>
                    <SelectItem value="Europe/Warsaw">Warsaw (CET/CEST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date Format</label>
                <Select
                  value={settingsData.preferences.dateFormat}
                  onValueChange={handleSelectChange('preferences', 'dateFormat')}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (European)</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (US)</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (ISO)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Measurement Units</label>
                <Select
                  value={settingsData.preferences.measurementUnit}
                  onValueChange={handleSelectChange('preferences', 'measurementUnit')}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric (kg, g, L, ml)</SelectItem>
                    <SelectItem value="imperial">Imperial (lb, oz, gal, fl oz)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Research Participation */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Research Participation</h3>
            <p className="text-sm text-gray-600">
              Customize your level of participation in the FOODMISSION research project.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Participation Level</label>
                <Select
                  value={settingsData.research.participationLevel}
                  onValueChange={handleSelectChange('research', 'participationLevel')}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic - Minimal data collection</SelectItem>
                    <SelectItem value="standard">Standard - Regular surveys and tracking</SelectItem>
                    <SelectItem value="advanced">Advanced - Detailed data and additional studies</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  Higher levels provide more valuable research data but require more time commitment
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Data Retention Period</label>
                <Select
                  value={settingsData.research.dataRetention}
                  onValueChange={handleSelectChange('research', 'dataRetention')}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimum">Minimum - 2 years after project end</SelectItem>
                    <SelectItem value="standard">Standard - 5 years after project end</SelectItem>
                    <SelectItem value="extended">Extended - 10 years for longitudinal studies</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  How long your data will be retained for research purposes
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="followUpStudies"
                  checked={settingsData.research.followUpStudies}
                  onCheckedChange={handleCheckboxChange('research', 'followUpStudies')}
                  disabled={isLoading}
                />
                <div className="space-y-1">
                  <label htmlFor="followUpStudies" className="text-sm font-medium cursor-pointer">
                    Follow-up Studies
                  </label>
                  <p className="text-xs text-gray-500">
                    Allow researchers to contact you for related studies and long-term follow-ups
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? 'Saving Settings...' : 'Save Settings'}
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

          {/* GDPR Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-medium text-blue-800">Your Rights</p>
                <p className="text-blue-700 mt-1">
                  Under GDPR, you have the right to access, correct, delete, or port your data at any time. 
                  You can also withdraw from the research project without penalty. 
                  Contact {themeConfig.content.supportEmail} to exercise these rights.
                </p>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}