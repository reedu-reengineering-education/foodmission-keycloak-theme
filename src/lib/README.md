# FOODMISSION Theme Configuration System

This directory contains the theme configuration system for the FOODMISSION Keycloak theme. It provides a flexible, type-safe way to customize the theme's appearance and behavior.

## Overview

The theme configuration system consists of:

- **TypeScript interfaces** for type safety
- **Configuration loading utilities** for runtime customization
- **React hooks** for component integration
- **Environment variable support** for deployment flexibility

## Core Components

### 1. Theme Configuration Interface (`theme-config.ts`)

Defines the structure for theme customization:

```typescript
interface FoodmissionThemeConfig {
  branding: {
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
    projectName: string;
  };
  content: {
    welcomeMessage: string;
    projectDescription: string;
    supportEmail: string;
    privacyPolicyUrl: string;
    termsOfServiceUrl: string;
  };
  features: {
    socialLogin: boolean;
    selfRegistration: boolean;
    passwordReset: boolean;
  };
}
```

### 2. Configuration Loader (`config-loader.ts`)

Provides utilities for loading and applying theme configuration:

```typescript
// Load configuration with custom overrides
const config = loadThemeConfig(customConfig);

// Apply configuration to CSS custom properties
applyThemeConfig(config);

// Initialize the complete theme system
const finalConfig = initializeThemeConfig(customConfig);
```

### 3. React Hooks (`use-theme-config.ts`)

React hooks for accessing theme configuration in components:

```typescript
// Get complete theme configuration
const { config, isLoading } = useThemeConfig();

// Get specific sections
const branding = useBranding();
const content = useContent();
const features = useFeatures();
```

## Usage

### Basic Usage

```typescript
import { initializeThemeConfig } from "./lib/config-loader";

// Initialize with default FOODMISSION configuration
const config = initializeThemeConfig();
```

### Custom Configuration

```typescript
import { initializeThemeConfig } from "./lib/config-loader";

const customConfig = {
  branding: {
    projectName: "My Custom FOODMISSION",
  },
  content: {
    supportEmail: "custom@foodmission.eu",
  },
};

const config = initializeThemeConfig(customConfig);
```

### React Component Usage

```typescript
import { useThemeConfig, useBranding } from "./lib/use-theme-config";

function MyComponent() {
  const { config, isLoading } = useThemeConfig();
  const branding = useBranding();

  if (isLoading) return <div>Loading theme...</div>;

  return (
    <div style={{ color: branding?.primaryColor }}>
      <h1>{branding?.projectName}</h1>
      <p>{config?.content.projectDescription}</p>
    </div>
  );
}
```

## Environment Variables

The system supports environment variable overrides:

```bash
# Branding
FOODMISSION_LOGO_URL=/custom-logo.png
FOODMISSION_PRIMARY_COLOR="hsl(150 80% 40%)"
FOODMISSION_SECONDARY_COLOR="hsl(30 100% 55%)"
FOODMISSION_PROJECT_NAME="Custom FOODMISSION"

# Content
FOODMISSION_SUPPORT_EMAIL=support@custom.eu
FOODMISSION_PRIVACY_URL=https://custom.eu/privacy
FOODMISSION_TERMS_URL=https://custom.eu/terms

# Features
FOODMISSION_SOCIAL_LOGIN=true
FOODMISSION_SELF_REGISTRATION=false
FOODMISSION_PASSWORD_RESET=true
```

## CSS Integration

The system automatically applies CSS custom properties:

```css
:root {
  --foodmission-primary: /* from config */ ;
  --foodmission-secondary: /* from config */ ;
  --foodmission-logo-url: /* from config */ ;
}
```

These can be used in your CSS:

```css
.my-button {
  background-color: hsl(var(--foodmission-primary));
}

.logo {
  background-image: var(--foodmission-logo-url);
}
```

## Testing

The configuration system includes comprehensive tests. Run them with:

```bash
npm test src/lib/__tests__/theme-config.test.ts
```

## Integration with Keycloak Theme

For Keycloak theme integration, use the theme integration utilities:

```typescript
import { initializeFoodmissionTheme } from "../keycloak-theme/theme-integration";

// Initialize theme when Keycloak loads
const config = initializeFoodmissionTheme();
```
