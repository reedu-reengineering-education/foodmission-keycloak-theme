# FOODMISSION Keycloak Theme

A custom Keycloak theme for the FOODMISSION project built with Keycloakify, React 18, TypeScript, and shadcn/ui components.

## Overview

This project provides a modern, branded authentication interface for the FOODMISSION citizen science project, ensuring visual consistency with the main application ecosystem.

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Java 11+ (for Keycloak testing)

### Installation

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Start Keycloak testing environment (optional)
npm run start-keycloak-testing
```

### Available Scripts

- `npm run dev` - Start Vite development server with hot reload
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

Note: Keycloak-specific build scripts will be added in later tasks.

## Project Structure

```
src/
├── keycloak-theme/          # Keycloak theme implementation
│   ├── KcApp.tsx           # Main theme application
│   ├── KcPage.tsx          # Page router
│   ├── KcPageStory.tsx     # Page implementations
│   ├── kcContext.ts        # Keycloak context configuration
│   └── i18n.ts             # Internationalization setup
└── main.tsx                # Application entry point
```

## Features

- 🎨 Modern UI with shadcn/ui components (to be implemented)
- 🌍 Multi-language support
- 📱 Responsive design
- ♿ Accessibility compliant
- 🔧 Hot reload development
- 📦 Keycloak JAR packaging

## Next Steps

1. Set up shadcn/ui integration
2. Create theme configuration system
3. Implement custom authentication components
4. Add FOODMISSION branding and styling

## License

MIT License - FOODMISSION Project
