# Testing Documentation

This document describes the comprehensive test suite for the FOODMISSION Keycloak theme.

## Test Categories

### 1. Unit Tests

- **Location**: `src/**/*.test.{ts,tsx}`
- **Purpose**: Test individual components and functions in isolation
- **Coverage**: All React components, utility functions, and business logic
- **Tools**: Vitest, React Testing Library, @testing-library/user-event

### 2. Integration Tests

- **Location**: `src/**/*.integration.test.{ts,tsx}`
- **Purpose**: Test component interactions and Keycloak theme functionality
- **Coverage**: KcApp integration, theme configuration, i18n integration
- **Tools**: Vitest, React Testing Library, Mock Keycloak contexts

### 3. End-to-End Tests

- **Location**: `src/**/*.e2e.test.{ts,tsx}`
- **Purpose**: Test complete authentication flows and user journeys
- **Coverage**: Login flow, registration flow, error handling, responsive design
- **Tools**: Vitest, React Testing Library, User event simulation

### 4. Accessibility Tests

- **Location**: `src/**/accessibility.test.{ts,tsx}`
- **Purpose**: Test WCAG 2.1 AA compliance and accessibility features
- **Coverage**: Screen reader support, keyboard navigation, color contrast
- **Tools**: jest-axe, @axe-core/react, React Testing Library

## Test Scripts

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run specific test categories
npm run test:unit
npm run test:integration
npm run test:e2e
npm run test:accessibility

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## Test Configuration

### Coverage Thresholds

- **Statements**: 80%
- **Branches**: 70%
- **Functions**: 80%
- **Lines**: 80%

### Test Environment

- **Environment**: jsdom
- **Setup**: `src/test/setup.ts`
- **Utilities**: `src/test/test-utils.tsx`
- **Timeout**: 10 seconds

## Mock Configurations

### Theme Configuration Mock

```typescript
const mockThemeConfig = {
  branding: {
    logoUrl: "/test-logo.png",
    primaryColor: "hsl(142 76% 36%)",
    secondaryColor: "hsl(24 100% 50%)",
    projectName: "FOODMISSION",
  },
  content: {
    welcomeMessage: "Welcome to FOODMISSION",
    projectDescription: "EU-funded citizen science project...",
    supportEmail: "test@foodmission.eu",
  },
  features: {
    socialLogin: false,
    selfRegistration: true,
    passwordReset: true,
  },
};
```

### Keycloak Context Mock

```typescript
const mockKcContext = {
  url: {
    /* Keycloak URLs */
  },
  realm: {
    /* Realm configuration */
  },
  client: {
    /* Client configuration */
  },
  locale: {
    /* Internationalization */
  },
  auth: {
    /* Authentication state */
  },
  social: {
    /* Social providers */
  },
  pageId: "login.ftl",
  properties: {
    /* Theme properties */
  },
};
```

## Test Utilities

### Component Testing

- `render()`: Custom render with theme providers
- `mockThemeConfig`: Standardized theme configuration
- `mockI18nMessages`: Internationalization messages
- `createMockKcContext()`: Keycloak context factory

### Accessibility Testing

- `checkAccessibility()`: Automated WCAG compliance check
- Keyboard navigation testing utilities
- Screen reader compatibility checks
- Color contrast validation

### Performance Testing

- `measureRenderTime()`: Component render performance
- Bundle size monitoring
- Loading state testing

## Test Data and Fixtures

### User Test Data

```typescript
const testUsers = {
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
};
```

### Mock Scenarios

- Login success/failure
- Registration flows
- Error conditions
- Network failures
- Maintenance mode
- Different locales

## Accessibility Testing

### WCAG 2.1 AA Compliance

- **Color Contrast**: Minimum 4.5:1 ratio for normal text
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators and logical tab order

### Automated Checks

```typescript
// Example accessibility test
it("should not have accessibility violations", async () => {
  const { container } = render(<LoginForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing Checklist

- [ ] Screen reader navigation (NVDA, JAWS, VoiceOver)
- [ ] Keyboard-only navigation
- [ ] High contrast mode compatibility
- [ ] Zoom functionality (up to 200%)
- [ ] Color blindness simulation

## Performance Testing

### Metrics Monitored

- **Component Render Time**: < 100ms for initial render
- **Bundle Size**: < 3MB for complete theme
- **Memory Usage**: No memory leaks in component lifecycle
- **Accessibility Performance**: < 50ms for axe-core checks

### Performance Tests

```typescript
it("should render within performance budget", () => {
  const renderTime = measureRenderTime(() => {
    render(<LoginForm />);
  });
  expect(renderTime).toBeLessThan(100);
});
```

## Continuous Integration

### Test Pipeline

1. **Lint Check**: ESLint validation
2. **Type Check**: TypeScript compilation
3. **Unit Tests**: Component and utility testing
4. **Integration Tests**: Theme functionality testing
5. **E2E Tests**: User flow validation
6. **Accessibility Tests**: WCAG compliance
7. **Coverage Report**: Minimum threshold validation

### Quality Gates

- All tests must pass
- Coverage thresholds must be met
- No accessibility violations
- Performance budgets respected
- No TypeScript errors

## Test Maintenance

### Regular Tasks

- Update test snapshots when UI changes
- Review and update mock data
- Maintain accessibility test coverage
- Monitor performance regression
- Update test documentation

### Best Practices

- Write descriptive test names
- Use proper test isolation
- Mock external dependencies
- Test user interactions, not implementation
- Maintain test readability and maintainability

## Troubleshooting

### Common Issues

1. **Test Timeouts**: Increase timeout for slow operations
2. **Mock Failures**: Verify mock configurations match actual APIs
3. **Accessibility Violations**: Check ARIA labels and semantic HTML
4. **Flaky Tests**: Ensure proper async handling and cleanup

### Debug Tools

- `screen.debug()`: Print current DOM state
- `--reporter=verbose`: Detailed test output
- `--ui`: Interactive test runner
- Browser DevTools for accessibility inspection

## Future Improvements

### Planned Enhancements

- Visual regression testing with Chromatic
- Cross-browser testing automation
- Performance monitoring integration
- Automated accessibility scanning in CI
- Test data generation and management

### Test Coverage Goals

- Increase statement coverage to 90%
- Add more edge case testing
- Improve error scenario coverage
- Enhance internationalization testing
- Expand responsive design testing
