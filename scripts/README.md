# FOODMISSION Keycloak Theme Deployment

This directory contains scripts and tools for building and deploying the FOODMISSION Keycloak theme.

## Overview

The FOODMISSION Keycloak theme is built using Keycloakify and provides a custom authentication experience that aligns with the FOODMISSION project branding and citizen science focus.

## Prerequisites

- Node.js 18+ and npm
- Keycloak 25.0 or later
- Docker (for containerized deployments)

## Build Process

### 1. Development Build

For development and testing:

```bash
npm run dev
```

This starts the Vite development server with hot reloading.

### 2. Production Build

To build the theme for production deployment:

```bash
npm run build-keycloak-theme
```

This command:

- Compiles TypeScript
- Builds the React components
- Generates Keycloak-compatible theme files
- Creates optimized CSS and JavaScript bundles
- Packages everything into the `dist_keycloak` directory

## Deployment Options

### Option 1: Traditional Keycloak Installation

For traditional Keycloak installations (standalone or clustered):

#### Linux/macOS

```bash
./scripts/deploy-theme.sh
```

#### Windows

```cmd
scripts\deploy-theme.bat
```

#### Options:

- `--keycloak-home PATH`: Specify Keycloak installation directory
- `--no-restart`: Skip automatic Keycloak service restart
- `--help`: Show help information

### Option 2: Docker Container Deployment

For Keycloak running in Docker containers:

```bash
./scripts/deploy-theme-docker.sh
```

#### Options:

- `--container-name NAME`: Specify container name (default: keycloak)
- `--no-restart`: Skip container restart
- `--create-dockerfile`: Generate Dockerfile for custom image
- `--help`: Show help information

### Option 3: Custom Docker Image

To create a custom Keycloak image with the theme pre-installed:

1. Build the theme:

   ```bash
   npm run build-keycloak-theme
   ```

2. Generate Dockerfile:

   ```bash
   ./scripts/deploy-theme-docker.sh --create-dockerfile
   ```

3. Build custom image:

   ```bash
   docker build -f Dockerfile.keycloak-foodmission -t keycloak-foodmission .
   ```

4. Run the custom image:
   ```bash
   docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin keycloak-foodmission start-dev
   ```

## Theme Configuration

### Environment Variables

The theme supports the following environment variables:

- `FOODMISSION_PROJECT_NAME`: Project display name (default: "FOODMISSION")
- `FOODMISSION_SUPPORT_EMAIL`: Support contact email
- `FOODMISSION_PRIVACY_URL`: Privacy policy URL
- `FOODMISSION_TERMS_URL`: Terms of service URL
- `FOODMISSION_LOGO_URL`: Logo image URL

### Keycloak Configuration

After deployment, configure your Keycloak realm:

1. Log in to Keycloak Admin Console
2. Select your realm
3. Go to **Realm Settings** > **Themes**
4. Set **Login Theme** to `foodmission`
5. Set **Account Theme** to `foodmission`
6. Save changes

### Internationalization

The theme supports multiple languages:

- English (en) - default
- German (de)
- Spanish (es)
- French (fr)
- Italian (it)

Language files are located in `src/keycloak-theme/login/messages/`.

## Asset Management

### CSS Assets

- Base styles: `src/keycloak-theme/login/resources/css/login.css`
- Account styles: `src/keycloak-theme/account/resources/css/account.css`
- Tailwind CSS integration for consistent styling

### JavaScript Assets

- React components are bundled into optimized chunks
- Keycloakify runtime is separated into its own chunk
- Assets are automatically versioned with content hashes

### Image Assets

- Logo and branding images should be placed in `public/` directory
- Images are automatically optimized during build
- SVG icons from Lucide React are used for consistency

## Troubleshooting

### Common Issues

1. **Theme not appearing in Keycloak**

   - Verify theme files are in correct location: `$KEYCLOAK_HOME/themes/foodmission/`
   - Check file permissions (644 for files, 755 for directories)
   - Restart Keycloak service

2. **Build failures**

   - Ensure Node.js 18+ is installed
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for TypeScript errors: `npm run type-check`

3. **Docker deployment issues**

   - Verify container is running: `docker ps`
   - Check container logs: `docker logs keycloak`
   - Ensure proper permissions in container

4. **Styling issues**
   - Clear browser cache
   - Check for CSS conflicts in browser developer tools
   - Verify Tailwind CSS is loading correctly

### Logs and Debugging

- Keycloak logs: `$KEYCLOAK_HOME/logs/keycloak.log`
- Docker logs: `docker logs <container-name>`
- Build logs: Check console output during `npm run build-keycloak-theme`

### Performance Optimization

The build process includes several optimizations:

- Code splitting for better caching
- Asset compression and minification
- Tree shaking to remove unused code
- Inline small assets to reduce HTTP requests

## Development Workflow

1. Make changes to theme components in `src/keycloak-theme/`
2. Test locally with `npm run dev`
3. Build theme with `npm run build-keycloak-theme`
4. Deploy to test environment
5. Validate functionality in Keycloak
6. Deploy to production

## Security Considerations

- Theme files should not contain sensitive information
- Use environment variables for configuration
- Regularly update dependencies for security patches
- Validate all user inputs in custom components
- Follow Keycloak security best practices

## Support

For issues related to:

- Theme functionality: Check component tests and documentation
- Deployment: Review deployment script logs
- Keycloak integration: Consult Keycloak documentation
- FOODMISSION project: Contact project team

## Version History

- v1.0.0: Initial release with login and account themes
- Support for Keycloak 25.0+
- Multi-language support
- Responsive design
- Accessibility compliance
