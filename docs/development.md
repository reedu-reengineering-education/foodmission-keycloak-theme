# Development Environment Setup

This document describes the local development environment for the FOODMISSION Keycloak theme.

## Available Development Modes

### 1. Theme Development Server (`npm run dev:theme`)

A dedicated development server that provides:

- Mock Keycloak context for testing different authentication flows
- Hot reload functionality for efficient development
- Interactive development controls for testing different scenarios
- Runs on port 3001

**Features:**

- Switch between different page contexts (login, register, error, etc.)
- Test with different message types and content
- Real-time preview of theme changes
- No need for actual Keycloak server

**Usage:**

```bash
npm run dev:theme
```

Then open http://localhost:3001 in your browser.

### 2. Storybook Development (`npm run dev:storybook`)

Isolated component development environment:

- Individual component testing and documentation
- Interactive component playground
- Accessibility testing with a11y addon
- Visual regression testing capabilities
- Runs on port 6006

**Features:**

- Component isolation for focused development
- Interactive controls for component props
- Accessibility compliance testing
- Documentation generation
- Visual testing scenarios

**Usage:**

```bash
npm run dev:storybook
```

Then open http://localhost:6006 in your browser.

### 3. Standard Vite Development (`npm run dev`)

Standard Vite development server for the main application:

- Full application context
- Integration with Keycloakify
- Hot module replacement
- Runs on port 3000

## Development Workflow

### Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start theme development server:**

   ```bash
   npm run dev:theme
   ```

3. **Start Storybook (in another terminal):**
   ```bash
   npm run dev:storybook
   ```

### Component Development

1. **Create new components** in the appropriate directory under `src/keycloak-theme/components/`
2. **Write Storybook stories** for isolated testing (`.stories.tsx` files)
3. **Test in theme development server** for integration testing
4. **Run tests** to ensure functionality: `npm run test`

### Testing Different Scenarios

The theme development server provides controls to test:

- Different authentication pages (login, register, error, etc.)
- Various message states (success, error, warning, info)
- Different user contexts and form states
- Responsive design across screen sizes

## Mock Keycloak Context

The development environment includes a comprehensive mock Keycloak context that simulates:

- Different page types and authentication flows
- User authentication states
- Error conditions and messages
- Internationalization scenarios
- Theme configuration options

## Hot Reload Support

Both development servers support hot reload:

- **Theme Server**: Automatically reloads when components change
- **Storybook**: Hot reloads individual stories and components
- **Vite HMR**: Fast refresh for React components

## Accessibility Testing

The development environment includes accessibility testing tools:

- **Storybook a11y addon**: Automated accessibility checks
- **WCAG 2.1 AA compliance**: Built-in testing for compliance standards
- **Screen reader testing**: Manual testing capabilities
- **Keyboard navigation**: Testing for keyboard accessibility

## Performance Monitoring

Development tools include:

- **Bundle analysis**: Monitor theme package size
- **Hot reload performance**: Fast development iteration
- **Component isolation**: Efficient testing of individual components

## Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in package.json scripts if needed
2. **Hot reload not working**: Check Vite configuration and file watchers
3. **Storybook build errors**: Ensure all story dependencies are properly imported
4. **Mock context issues**: Verify mock Keycloak context matches expected structure

### Debug Mode

Enable debug logging by setting environment variables:

```bash
DEBUG=keycloakify:* npm run dev:theme
```

## Integration with Keycloak

While development uses mock contexts, the theme can be tested with actual Keycloak:

1. Build the theme: `npm run build-keycloak-theme`
2. Deploy to Keycloak instance
3. Test with real authentication flows

## Next Steps

After development setup:

1. Review existing components and stories
2. Run the test suite: `npm run test`
3. Check theme validation: `npm run validate-theme`
4. Build and test theme package: `npm run build-keycloak-theme`
