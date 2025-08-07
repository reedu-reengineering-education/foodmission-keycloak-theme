import React, { useState } from 'react';
import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui';
import { useThemeConfig } from '../../../lib/use-theme-config';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
  city: string;
  householdSize: string;
  dietaryPreferences: string;
  foodWasteAwareness: string;
  participationMotivation: string;
}

interface ProfileFormProps {
  initialData?: Partial<ProfileFormData>;
  onSubmit?: (data: ProfileFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  error?: string;
  validationErrors?: Partial<Record<keyof ProfileFormData, string>>;
  readOnlyFields?: (keyof ProfileFormData)[];
}

export function ProfileForm({ 
  initialData = {}, 
  onSubmit, 
  onCancel,
  isLoading = false, 
  error, 
  validationErrors = {},
  readOnlyFields = []
}: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    country: initialData.country || '',
    city: initialData.city || '',
    householdSize: initialData.householdSize || '',
    dietaryPreferences: initialData.dietaryPreferences || '',
    foodWasteAwareness: initialData.foodWasteAwareness || '',
    participationMotivation: initialData.participationMotivation || '',
  });

  const themeConfig = useThemeConfig();

  const handleInputChange = (field: keyof ProfileFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSelectChange = (field: keyof ProfileFormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const isFieldReadOnly = (field: keyof ProfileFormData) => readOnlyFields.includes(field);

  const getFieldError = (field: keyof ProfileFormData) => validationErrors[field];

  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.country.trim() &&
      formData.city.trim() &&
      formData.householdSize &&
      formData.dietaryPreferences &&
      formData.foodWasteAwareness &&
      formData.participationMotivation
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Your {themeConfig.branding.projectName} Profile
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Help us personalize your experience and contribute to our research
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          {/* Personal Information */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  disabled={isLoading || isFieldReadOnly('firstName')}
                  placeholder="Enter your first name"
                />
                {getFieldError('firstName') && (
                  <p className="text-sm text-red-600">{getFieldError('firstName')}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  disabled={isLoading || isFieldReadOnly('lastName')}
                  placeholder="Enter your last name"
                />
                {getFieldError('lastName') && (
                  <p className="text-sm text-red-600">{getFieldError('lastName')}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange('email')}
                disabled={isLoading || isFieldReadOnly('email')}
                placeholder="Enter your email address"
              />
              {getFieldError('email') && (
                <p className="text-sm text-red-600">{getFieldError('email')}</p>
              )}
              {isFieldReadOnly('email') && (
                <p className="text-xs text-gray-500">
                  Email address cannot be changed. Contact support if you need to update it.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                disabled={isLoading || isFieldReadOnly('phone')}
                placeholder="Enter your phone number"
              />
              {getFieldError('phone') && (
                <p className="text-sm text-red-600">{getFieldError('phone')}</p>
              )}
            </div>
          </section>

          {/* Location Information */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Location</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={handleSelectChange('country')}
                  disabled={isLoading || isFieldReadOnly('country')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AT">Austria</SelectItem>
                    <SelectItem value="BE">Belgium</SelectItem>
                    <SelectItem value="BG">Bulgaria</SelectItem>
                    <SelectItem value="HR">Croatia</SelectItem>
                    <SelectItem value="CY">Cyprus</SelectItem>
                    <SelectItem value="CZ">Czech Republic</SelectItem>
                    <SelectItem value="DK">Denmark</SelectItem>
                    <SelectItem value="EE">Estonia</SelectItem>
                    <SelectItem value="FI">Finland</SelectItem>
                    <SelectItem value="FR">France</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                    <SelectItem value="GR">Greece</SelectItem>
                    <SelectItem value="HU">Hungary</SelectItem>
                    <SelectItem value="IE">Ireland</SelectItem>
                    <SelectItem value="IT">Italy</SelectItem>
                    <SelectItem value="LV">Latvia</SelectItem>
                    <SelectItem value="LT">Lithuania</SelectItem>
                    <SelectItem value="LU">Luxembourg</SelectItem>
                    <SelectItem value="MT">Malta</SelectItem>
                    <SelectItem value="NL">Netherlands</SelectItem>
                    <SelectItem value="PL">Poland</SelectItem>
                    <SelectItem value="PT">Portugal</SelectItem>
                    <SelectItem value="RO">Romania</SelectItem>
                    <SelectItem value="SK">Slovakia</SelectItem>
                    <SelectItem value="SI">Slovenia</SelectItem>
                    <SelectItem value="ES">Spain</SelectItem>
                    <SelectItem value="SE">Sweden</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                {getFieldError('country') && (
                  <p className="text-sm text-red-600">{getFieldError('country')}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleInputChange('city')}
                  disabled={isLoading || isFieldReadOnly('city')}
                  placeholder="Enter your city"
                />
                {getFieldError('city') && (
                  <p className="text-sm text-red-600">{getFieldError('city')}</p>
                )}
              </div>
            </div>
          </section>

          {/* Research-Related Information */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Research Information</h3>
            <p className="text-sm text-gray-600">
              This information helps us understand our participant community and improve our research.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="householdSize">Household Size</Label>
                <Select
                  value={formData.householdSize}
                  onValueChange={handleSelectChange('householdSize')}
                  disabled={isLoading || isFieldReadOnly('householdSize')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select household size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 person</SelectItem>
                    <SelectItem value="2">2 people</SelectItem>
                    <SelectItem value="3">3 people</SelectItem>
                    <SelectItem value="4">4 people</SelectItem>
                    <SelectItem value="5">5 people</SelectItem>
                    <SelectItem value="6+">6 or more people</SelectItem>
                  </SelectContent>
                </Select>
                {getFieldError('householdSize') && (
                  <p className="text-sm text-red-600">{getFieldError('householdSize')}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
                <Select
                  value={formData.dietaryPreferences}
                  onValueChange={handleSelectChange('dietaryPreferences')}
                  disabled={isLoading || isFieldReadOnly('dietaryPreferences')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your dietary preferences" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="omnivore">Omnivore</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="pescatarian">Pescatarian</SelectItem>
                    <SelectItem value="flexitarian">Flexitarian</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {getFieldError('dietaryPreferences') && (
                  <p className="text-sm text-red-600">{getFieldError('dietaryPreferences')}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="foodWasteAwareness">Food Waste Awareness Level</Label>
                <Select
                  value={formData.foodWasteAwareness}
                  onValueChange={handleSelectChange('foodWasteAwareness')}
                  disabled={isLoading || isFieldReadOnly('foodWasteAwareness')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How aware are you of food waste issues?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="very-aware">Very aware - I actively work to reduce food waste</SelectItem>
                    <SelectItem value="somewhat-aware">Somewhat aware - I try to reduce waste when I remember</SelectItem>
                    <SelectItem value="learning">Learning - I'm interested in learning more</SelectItem>
                    <SelectItem value="not-aware">Not very aware - This is new to me</SelectItem>
                  </SelectContent>
                </Select>
                {getFieldError('foodWasteAwareness') && (
                  <p className="text-sm text-red-600">{getFieldError('foodWasteAwareness')}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="participationMotivation">Why are you participating in FOODMISSION?</Label>
                <Select
                  value={formData.participationMotivation}
                  onValueChange={handleSelectChange('participationMotivation')}
                  disabled={isLoading || isFieldReadOnly('participationMotivation')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your main motivation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="environmental">Environmental impact - I want to help the planet</SelectItem>
                    <SelectItem value="scientific">Scientific contribution - I want to support research</SelectItem>
                    <SelectItem value="personal">Personal improvement - I want to reduce my own food waste</SelectItem>
                    <SelectItem value="community">Community engagement - I want to connect with others</SelectItem>
                    <SelectItem value="learning">Learning - I want to understand food systems better</SelectItem>
                    <SelectItem value="other">Other reason</SelectItem>
                  </SelectContent>
                </Select>
                {getFieldError('participationMotivation') && (
                  <p className="text-sm text-red-600">{getFieldError('participationMotivation')}</p>
                )}
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading || !isFormValid()}
            >
              {isLoading ? 'Saving Profile...' : 'Save Profile'}
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

          {/* Data Usage Notice */}
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
                <p className="font-medium text-blue-800">Data Usage</p>
                <p className="text-blue-700 mt-1">
                  This information will be used for research purposes only and will be anonymized 
                  before analysis. You can update your profile at any time.
                </p>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}