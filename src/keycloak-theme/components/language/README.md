# Language Switcher Components

This directory contains language switching components for the Keycloakify theme, built using Keycloakify's official i18n system.

## Components

### LanguageSwitcher

A dropdown menu language switcher with a globe icon and language labels.

#### Props

```typescript
interface Props {
  kcContext: KcContext;
  i18n: I18n;
  className?: string;
}
```

#### Usage

```tsx
import { LanguageSwitcher } from "./components/language/LanguageSwitcher";

<LanguageSwitcher kcContext={kcContext} i18n={i18n} />;
```

### LanguageSwitcherStandalone

A standalone version that can be positioned anywhere on the page with fixed positioning.

#### Props

```typescript
interface Props {
  kcContext: KcContext;
  i18n: I18n;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}
```

#### Usage

```tsx
import { LanguageSwitcherStandalone } from "./components/language/LanguageSwitcherStandalone";

<LanguageSwitcherStandalone
  kcContext={kcContext}
  i18n={i18n}
  position="top-right"
/>;
```

## Integration

The language switcher is automatically integrated into the `TwoColumnLayout` component and appears in the top-right corner of all pages that use this layout.

## i18n System

This implementation uses Keycloakify's official `i18nBuilder` which provides:

- **Built-in translations**: Leverages Keycloak's default message translations for common UI elements
- **Custom translations**: Adds FOODMISSION-specific messages in multiple languages
- **Automatic language detection**: Uses Keycloak's locale system
- **Proper URL generation**: Handles language switching URLs correctly

### Supported Languages

The component automatically supports all languages enabled in your Keycloak realm. The built-in translations include:

- English (en)
- German (de)
- French (fr)
- Spanish (es)
- Italian (it)
- And many more...

### Custom Translations

FOODMISSION-specific messages are defined in the i18n configuration:

```typescript
const { useI18n } = i18nBuilder
  .withCustomTranslations<MessageKey_foodmission>({
    en: {
      "foodmission.title": "FOODMISSION",
      "foodmission.welcome": "Welcome to FOODMISSION",
      // ... more translations
    },
    de: {
      "foodmission.title": "FOODMISSION",
      "foodmission.welcome": "Willkommen bei FOODMISSION",
      // ... more translations
    },
    // ... other languages
  })
  .build();
```

### How Language Switching Works

1. The component reads enabled languages from Keycloakify's i18n system (`i18n.enabledLanguages`)
2. It uses the `href` property from each language to handle switching
3. When a user clicks a language, it redirects to the proper URL
4. Keycloak handles the actual language switching and page reload

### Customization

You can customize the appearance by:

- Using the `className` prop to add custom styles
- Positioning the standalone version anywhere on the page
- The component automatically adapts to show full names on desktop and abbreviations on mobile

### Accessibility

The component includes proper accessibility features:

- ARIA labels for screen readers
- Keyboard navigation support via dropdown menu
- Clear visual indicators for the current language
- Semantic HTML structure
