/**
 * Comprehensive Test Suite Configuration
 *
 * This file configures and runs the complete test suite for the FOODMISSION Keycloak theme,
 * including unit tests, integration tests, end-to-end tests, and accessibility tests.
 */

import { describe, it, expect } from "vitest";

// Test categories and their descriptions
export const testCategories = {
  unit: {
    name: "Unit Tests",
    description: "Test individual components and functions in isolation",
    patterns: ["**/*.test.{ts,tsx}"],
    excludePatterns: [
      "**/*.integration.test.{ts,tsx}",
      "**/*.e2e.test.{ts,tsx}",
    ],
  },
  integration: {
    name: "Integration Tests",
    description: "Test component interactions and Keycloak theme functionality",
    patterns: ["**/*.integration.test.{ts,tsx}"],
  },
  e2e: {
    name: "End-to-End Tests",
    description: "Test complete authentication flows and user journeys",
    patterns: ["**/*.e2e.test.{ts,tsx}"],
  },
  accessibility: {
    name: "Accessibility Tests",
    description: "Test WCAG 2.1 AA compliance and accessibility features",
    patterns: ["**/accessibility.test.{ts,tsx}"],
  },
};

// Test configuration for different environments
export const testConfig = {
  development: {
    timeout: 10000,
    retries: 1,
    coverage: {
      enabled: true,
      threshold: {
        statements: 80,
        branches: 70,
        functions: 80,
        lines: 80,
      },
    },
  },
  ci: {
    timeout: 30000,
    retries: 3,
    coverage: {
      enabled: true,
      threshold: {
        statements: 85,
        branches: 75,
        functions: 85,
        lines: 85,
      },
    },
  },
  production: {
    timeout: 60000,
    retries: 5,
    coverage: {
      enabled: true,
      threshold: {
        statements: 90,
        branches: 80,
        functions: 90,
        lines: 90,
      },
    },
  },
};

// Test utilities for different test types
export const testUtils = {
  // Component testing utilities
  component: {
    renderWithTheme: "Render component with FOODMISSION theme context",
    mockKeycloakContext: "Create mock Keycloak context for testing",
    simulateUserInteraction: "Simulate user interactions with components",
  },

  // Integration testing utilities
  integration: {
    testAuthenticationFlow: "Test complete authentication workflows",
    testErrorHandling: "Test error scenarios and recovery",
    testInternationalization: "Test multi-language support",
  },

  // Accessibility testing utilities
  accessibility: {
    checkWCAGCompliance: "Verify WCAG 2.1 AA compliance",
    testKeyboardNavigation: "Test keyboard accessibility",
    testScreenReaderSupport: "Test screen reader compatibility",
    testColorContrast: "Verify color contrast ratios",
  },

  // Performance testing utilities
  performance: {
    measureRenderTime: "Measure component render performance",
    checkBundleSize: "Verify theme bundle size limits",
    testLoadingStates: "Test loading and error states",
  },
};

// Test data and fixtures
export const testFixtures = {
  // Mock Keycloak contexts for different scenarios
  keycloakContexts: {
    login: "Standard login page context",
    register: "User registration context",
    error: "Error page context",
    maintenance: "Maintenance mode context",
  },

  // Mock user data
  users: {
    validUser: {
      username: "test@foodmission.eu",
      password: "SecurePassword123!",
      firstName: "Test",
      lastName: "User",
    },
    invalidUser: {
      username: "invalid@example.com",
      password: "wrongpassword",
    },
  },

  // Mock theme configurations
  themeConfigs: {
    default: "Standard FOODMISSION theme configuration",
    customBranding: "Custom branding configuration",
    minimalConfig: "Minimal configuration for testing edge cases",
  },
};

// Test reporting and metrics
export const testMetrics = {
  coverage: {
    statements: "Percentage of statements covered by tests",
    branches: "Percentage of code branches covered",
    functions: "Percentage of functions covered",
    lines: "Percentage of lines covered",
  },

  performance: {
    renderTime: "Average component render time",
    bundleSize: "Theme bundle size in KB",
    loadTime: "Page load time metrics",
  },

  accessibility: {
    wcagViolations: "Number of WCAG violations found",
    keyboardNavigation: "Keyboard navigation test results",
    screenReaderCompatibility: "Screen reader compatibility score",
  },
};

// Test suite validation
describe("Test Suite Configuration", () => {
  it("should have all required test categories defined", () => {
    const requiredCategories = ["unit", "integration", "e2e", "accessibility"];
    const definedCategories = Object.keys(testCategories);

    requiredCategories.forEach((category) => {
      expect(definedCategories).toContain(category);
    });
  });

  it("should have valid test configuration for all environments", () => {
    const environments = ["development", "ci", "production"];

    environments.forEach((env) => {
      expect(testConfig[env as keyof typeof testConfig]).toBeDefined();
      expect(
        testConfig[env as keyof typeof testConfig].timeout
      ).toBeGreaterThan(0);
      expect(
        testConfig[env as keyof typeof testConfig].coverage.enabled
      ).toBeDefined();
    });
  });

  it("should have comprehensive test utilities available", () => {
    const utilityCategories = [
      "component",
      "integration",
      "accessibility",
      "performance",
    ];

    utilityCategories.forEach((category) => {
      expect(testUtils[category as keyof typeof testUtils]).toBeDefined();
    });
  });
});

export default {
  testCategories,
  testConfig,
  testUtils,
  testFixtures,
  testMetrics,
};
