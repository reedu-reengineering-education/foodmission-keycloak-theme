#!/bin/bash

# FOODMISSION Keycloak Theme Deployment Script
# This script builds and deploys the Keycloak theme

set -e

# Configuration
KEYCLOAK_HOME=${KEYCLOAK_HOME:-"/opt/keycloak"}
THEME_NAME="foodmission"
BUILD_DIR="dist_keycloak"
BACKUP_DIR="backups"

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

# Check if Keycloak home exists
check_keycloak_home() {
    if [ ! -d "$KEYCLOAK_HOME" ]; then
        log_error "Keycloak home directory not found: $KEYCLOAK_HOME"
        log_info "Please set KEYCLOAK_HOME environment variable or ensure Keycloak is installed"
        exit 1
    fi
    log_info "Using Keycloak home: $KEYCLOAK_HOME"
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

# Create backup of existing theme
backup_existing_theme() {
    local theme_dir="$KEYCLOAK_HOME/themes/$THEME_NAME"
    
    if [ -d "$theme_dir" ]; then
        log_info "Creating backup of existing theme..."
        
        # Create backup directory if it doesn't exist
        mkdir -p "$BACKUP_DIR"
        
        # Create backup with timestamp
        local backup_name="${THEME_NAME}_backup_$(date +%Y%m%d_%H%M%S)"
        cp -r "$theme_dir" "$BACKUP_DIR/$backup_name"
        
        log_info "Backup created: $BACKUP_DIR/$backup_name"
    fi
}

# Deploy the theme
deploy_theme() {
    local theme_dir="$KEYCLOAK_HOME/themes/$THEME_NAME"
    
    log_info "Deploying theme to Keycloak..."
    
    # Remove existing theme directory
    if [ -d "$theme_dir" ]; then
        rm -rf "$theme_dir"
    fi
    
    # Copy new theme
    if [ -d "$BUILD_DIR" ]; then
        cp -r "$BUILD_DIR" "$theme_dir"
        log_info "Theme deployed successfully to: $theme_dir"
    else
        log_error "Build directory not found: $BUILD_DIR"
        exit 1
    fi
}

# Set proper permissions
set_permissions() {
    local theme_dir="$KEYCLOAK_HOME/themes/$THEME_NAME"
    
    log_info "Setting proper permissions..."
    
    # Set ownership to keycloak user if it exists
    if id "keycloak" &>/dev/null; then
        chown -R keycloak:keycloak "$theme_dir"
    fi
    
    # Set proper permissions
    find "$theme_dir" -type d -exec chmod 755 {} \;
    find "$theme_dir" -type f -exec chmod 644 {} \;
    
    log_info "Permissions set successfully"
}

# Restart Keycloak service
restart_keycloak() {
    log_info "Attempting to restart Keycloak service..."
    
    # Try different service names
    if systemctl is-active --quiet keycloak; then
        systemctl restart keycloak
        log_info "Keycloak service restarted"
    elif systemctl is-active --quiet keycloak.service; then
        systemctl restart keycloak.service
        log_info "Keycloak service restarted"
    else
        log_warn "Could not automatically restart Keycloak service"
        log_warn "Please restart Keycloak manually to apply the new theme"
    fi
}

# Validate deployment
validate_deployment() {
    local theme_dir="$KEYCLOAK_HOME/themes/$THEME_NAME"
    
    log_info "Validating deployment..."
    
    # Check if theme directory exists
    if [ ! -d "$theme_dir" ]; then
        log_error "Theme directory not found after deployment"
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
        if [ ! -f "$theme_dir/$file" ]; then
            log_error "Required file missing: $file"
            exit 1
        fi
    done
    
    log_info "Deployment validation successful"
}

# Main deployment process
main() {
    log_info "Starting FOODMISSION Keycloak theme deployment..."
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --keycloak-home)
                KEYCLOAK_HOME="$2"
                shift 2
                ;;
            --no-restart)
                NO_RESTART=true
                shift
                ;;
            --help)
                echo "Usage: $0 [OPTIONS]"
                echo "Options:"
                echo "  --keycloak-home PATH    Set Keycloak home directory"
                echo "  --no-restart           Skip Keycloak service restart"
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
    check_keycloak_home
    build_theme
    backup_existing_theme
    deploy_theme
    set_permissions
    validate_deployment
    
    if [ "$NO_RESTART" != "true" ]; then
        restart_keycloak
    fi
    
    log_info "FOODMISSION Keycloak theme deployment completed successfully!"
    log_info "You can now select the '$THEME_NAME' theme in your Keycloak realm settings"
}

# Run main function
main "$@"