#!/bin/bash

# FOODMISSION Keycloak Theme Docker Deployment Script
# This script builds and deploys the Keycloak theme to a Docker container

set -e

# Configuration
CONTAINER_NAME=${CONTAINER_NAME:-"keycloak"}
THEME_NAME="foodmission"
BUILD_DIR="dist_keycloak"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is available
check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed or not in PATH"
        exit 1
    fi
    log_info "Docker is available"
}

# Check if container exists and is running
check_container() {
    if ! docker ps -q -f name="$CONTAINER_NAME" | grep -q .; then
        if docker ps -a -q -f name="$CONTAINER_NAME" | grep -q .; then
            log_error "Container '$CONTAINER_NAME' exists but is not running"
            log_info "Please start the container first: docker start $CONTAINER_NAME"
        else
            log_error "Container '$CONTAINER_NAME' not found"
            log_info "Please ensure the Keycloak container is running"
        fi
        exit 1
    fi
    log_info "Container '$CONTAINER_NAME' is running"
}

# Build the theme
build_theme() {
    log_info "Building FOODMISSION Keycloak theme..."
    
    # Clean previous build
    if [ -d "$BUILD_DIR" ]; then
        rm -rf "$BUILD_DIR"
    fi
    
    # Build the theme
    npm run build-keycloak-theme
    
    if [ $? -eq 0 ]; then
        log_info "Theme build completed successfully"
    else
        log_error "Theme build failed"
        exit 1
    fi
}

# Create backup of existing theme in container
backup_existing_theme() {
    log_info "Creating backup of existing theme in container..."
    
    # Check if theme exists in container
    if docker exec "$CONTAINER_NAME" test -d "/opt/keycloak/themes/$THEME_NAME"; then
        # Create backup with timestamp
        local backup_name="${THEME_NAME}_backup_$(date +%Y%m%d_%H%M%S)"
        docker exec "$CONTAINER_NAME" cp -r "/opt/keycloak/themes/$THEME_NAME" "/opt/keycloak/themes/$backup_name"
        log_info "Backup created in container: /opt/keycloak/themes/$backup_name"
    else
        log_info "No existing theme found in container"
    fi
}

# Deploy theme to container
deploy_theme() {
    log_info "Deploying theme to container..."
    
    # Remove existing theme directory in container
    docker exec "$CONTAINER_NAME" rm -rf "/opt/keycloak/themes/$THEME_NAME" 2>/dev/null || true
    
    # Copy new theme to container
    if [ -d "$BUILD_DIR" ]; then
        docker cp "$BUILD_DIR" "$CONTAINER_NAME:/opt/keycloak/themes/$THEME_NAME"
        log_info "Theme deployed successfully to container"
    else
        log_error "Build directory not found: $BUILD_DIR"
        exit 1
    fi
}

# Set proper permissions in container
set_permissions() {
    log_info "Setting proper permissions in container..."
    
    # Set proper ownership and permissions
    docker exec "$CONTAINER_NAME" chown -R keycloak:keycloak "/opt/keycloak/themes/$THEME_NAME"
    docker exec "$CONTAINER_NAME" find "/opt/keycloak/themes/$THEME_NAME" -type d -exec chmod 755 {} \;
    docker exec "$CONTAINER_NAME" find "/opt/keycloak/themes/$THEME_NAME" -type f -exec chmod 644 {} \;
    
    log_info "Permissions set successfully"
}

# Restart Keycloak in container
restart_keycloak() {
    log_info "Restarting Keycloak container..."
    
    docker restart "$CONTAINER_NAME"
    
    # Wait for container to be ready
    log_info "Waiting for Keycloak to start..."
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if docker exec "$CONTAINER_NAME" curl -f -s http://localhost:8080/health/ready > /dev/null 2>&1; then
            log_info "Keycloak is ready"
            break
        fi
        
        if [ $attempt -eq $max_attempts ]; then
            log_warn "Keycloak may not be fully ready yet. Please check the container logs."
            break
        fi
        
        sleep 2
        ((attempt++))
    done
}

# Validate deployment in container
validate_deployment() {
    log_info "Validating deployment in container..."
    
    # Check if theme directory exists
    if ! docker exec "$CONTAINER_NAME" test -d "/opt/keycloak/themes/$THEME_NAME"; then
        log_error "Theme directory not found in container after deployment"
        exit 1
    fi
    
    # Check for required files
    local required_files=(
        "theme.properties"
        "login/template.ftl"
        "login/login.ftl"
        "account/template.ftl"
        "account/account.ftl"
    )
    
    for file in "${required_files[@]}"; do
        if ! docker exec "$CONTAINER_NAME" test -f "/opt/keycloak/themes/$THEME_NAME/$file"; then
            log_error "Required file missing in container: $file"
            exit 1
        fi
    done
    
    log_info "Deployment validation successful"
}

# Create Dockerfile for custom Keycloak image with theme
create_dockerfile() {
    log_info "Creating Dockerfile for custom Keycloak image..."
    
    cat > Dockerfile.keycloak-foodmission << EOF
FROM quay.io/keycloak/keycloak:25.0

# Copy the FOODMISSION theme
COPY $BUILD_DIR /opt/keycloak/themes/$THEME_NAME

# Set proper ownership
USER root
RUN chown -R keycloak:keycloak /opt/keycloak/themes/$THEME_NAME
USER keycloak

# Build the theme cache
RUN /opt/keycloak/bin/kc.sh build --cache=ispn --cache-stack=kubernetes --health-enabled=true --metrics-enabled=true

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
EOF
    
    log_info "Dockerfile created: Dockerfile.keycloak-foodmission"
    log_info "You can build a custom image with: docker build -f Dockerfile.keycloak-foodmission -t keycloak-foodmission ."
}

# Main deployment process
main() {
    log_info "Starting FOODMISSION Keycloak theme Docker deployment..."
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --container-name)
                CONTAINER_NAME="$2"
                shift 2
                ;;
            --no-restart)
                NO_RESTART=true
                shift
                ;;
            --create-dockerfile)
                CREATE_DOCKERFILE=true
                shift
                ;;
            --help)
                echo "Usage: $0 [OPTIONS]"
                echo "Options:"
                echo "  --container-name NAME   Set Keycloak container name (default: keycloak)"
                echo "  --no-restart           Skip container restart"
                echo "  --create-dockerfile    Create Dockerfile for custom image"
                echo "  --help                 Show this help message"
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                exit 1
                ;;
        esac
    done
    
    # Execute deployment steps
    check_docker
    build_theme
    
    if [ "$CREATE_DOCKERFILE" = "true" ]; then
        create_dockerfile
        log_info "Dockerfile created. You can now build a custom Keycloak image."
        return 0
    fi
    
    check_container
    backup_existing_theme
    deploy_theme
    set_permissions
    validate_deployment
    
    if [ "$NO_RESTART" != "true" ]; then
        restart_keycloak
    fi
    
    log_info "FOODMISSION Keycloak theme Docker deployment completed successfully!"
    log_info "You can now select the '$THEME_NAME' theme in your Keycloak realm settings"
}

# Run main function
main "$@"