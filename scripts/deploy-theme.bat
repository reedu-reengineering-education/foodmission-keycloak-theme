@echo off
REM FOODMISSION Keycloak Theme Deployment Script for Windows
REM This script builds and deploys the Keycloak theme

setlocal enabledelayedexpansion

REM Configuration
if "%KEYCLOAK_HOME%"=="" set KEYCLOAK_HOME=C:\keycloak
set THEME_NAME=foodmission
set BUILD_DIR=dist_keycloak
set BACKUP_DIR=backups

REM Functions
:log_info
echo [INFO] %~1
goto :eof

:log_warn
echo [WARN] %~1
goto :eof

:log_error
echo [ERROR] %~1
goto :eof

REM Check if Keycloak home exists
:check_keycloak_home
if not exist "%KEYCLOAK_HOME%" (
    call :log_error "Keycloak home directory not found: %KEYCLOAK_HOME%"
    call :log_info "Please set KEYCLOAK_HOME environment variable or ensure Keycloak is installed"
    exit /b 1
)
call :log_info "Using Keycloak home: %KEYCLOAK_HOME%"
goto :eof

REM Build the theme
:build_theme
call :log_info "Building FOODMISSION Keycloak theme..."

REM Clean previous build
if exist "%BUILD_DIR%" (
    rmdir /s /q "%BUILD_DIR%"
)

REM Build the theme
call npm run build-keycloak-theme

if !errorlevel! equ 0 (
    call :log_info "Theme build completed successfully"
) else (
    call :log_error "Theme build failed"
    exit /b 1
)
goto :eof

REM Create backup of existing theme
:backup_existing_theme
set theme_dir=%KEYCLOAK_HOME%\themes\%THEME_NAME%

if exist "%theme_dir%" (
    call :log_info "Creating backup of existing theme..."
    
    REM Create backup directory if it doesn't exist
    if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"
    
    REM Create backup with timestamp
    for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
    set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
    set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
    set "backup_name=%THEME_NAME%_backup_%YYYY%%MM%%DD%_%HH%%Min%%Sec%"
    
    xcopy "%theme_dir%" "%BACKUP_DIR%\%backup_name%\" /e /i /h /y
    
    call :log_info "Backup created: %BACKUP_DIR%\%backup_name%"
)
goto :eof

REM Deploy the theme
:deploy_theme
set theme_dir=%KEYCLOAK_HOME%\themes\%THEME_NAME%

call :log_info "Deploying theme to Keycloak..."

REM Remove existing theme directory
if exist "%theme_dir%" (
    rmdir /s /q "%theme_dir%"
)

REM Copy new theme
if exist "%BUILD_DIR%" (
    xcopy "%BUILD_DIR%" "%theme_dir%\" /e /i /h /y
    call :log_info "Theme deployed successfully to: %theme_dir%"
) else (
    call :log_error "Build directory not found: %BUILD_DIR%"
    exit /b 1
)
goto :eof

REM Restart Keycloak service
:restart_keycloak
call :log_info "Attempting to restart Keycloak service..."

REM Try to restart Keycloak service
sc query "Keycloak" >nul 2>&1
if !errorlevel! equ 0 (
    net stop "Keycloak"
    net start "Keycloak"
    call :log_info "Keycloak service restarted"
) else (
    call :log_warn "Could not automatically restart Keycloak service"
    call :log_warn "Please restart Keycloak manually to apply the new theme"
)
goto :eof

REM Validate deployment
:validate_deployment
set theme_dir=%KEYCLOAK_HOME%\themes\%THEME_NAME%

call :log_info "Validating deployment..."

REM Check if theme directory exists
if not exist "%theme_dir%" (
    call :log_error "Theme directory not found after deployment"
    exit /b 1
)

REM Check for required files
set required_files=theme.properties login\template.ftl login\login.ftl account\template.ftl account\account.ftl

for %%f in (%required_files%) do (
    if not exist "%theme_dir%\%%f" (
        call :log_error "Required file missing: %%f"
        exit /b 1
    )
)

call :log_info "Deployment validation successful"
goto :eof

REM Main deployment process
:main
call :log_info "Starting FOODMISSION Keycloak theme deployment..."

REM Parse command line arguments
:parse_args
if "%~1"=="" goto :execute_deployment
if "%~1"=="--keycloak-home" (
    set KEYCLOAK_HOME=%~2
    shift
    shift
    goto :parse_args
)
if "%~1"=="--no-restart" (
    set NO_RESTART=true
    shift
    goto :parse_args
)
if "%~1"=="--help" (
    echo Usage: %0 [OPTIONS]
    echo Options:
    echo   --keycloak-home PATH    Set Keycloak home directory
    echo   --no-restart           Skip Keycloak service restart
    echo   --help                 Show this help message
    exit /b 0
)
call :log_error "Unknown option: %~1"
exit /b 1

:execute_deployment
REM Execute deployment steps
call :check_keycloak_home
if !errorlevel! neq 0 exit /b !errorlevel!

call :build_theme
if !errorlevel! neq 0 exit /b !errorlevel!

call :backup_existing_theme
if !errorlevel! neq 0 exit /b !errorlevel!

call :deploy_theme
if !errorlevel! neq 0 exit /b !errorlevel!

call :validate_deployment
if !errorlevel! neq 0 exit /b !errorlevel!

if not "%NO_RESTART%"=="true" (
    call :restart_keycloak
)

call :log_info "FOODMISSION Keycloak theme deployment completed successfully!"
call :log_info "You can now select the '%THEME_NAME%' theme in your Keycloak realm settings"

goto :eof

REM Run main function
call :main %*