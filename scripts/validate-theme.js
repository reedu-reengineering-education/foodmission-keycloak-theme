#!/usr/bin/env node

/**
 * FOODMISSION Keycloak Theme Validation Script
 * This script validates the built theme structure and files
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BUILD_DIR = 'dist_keycloak';
const THEME_NAME = 'foodmission';

// Colors for output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

// Logging functions
const log = {
  info: (msg) => console.log(`${colors.green}[INFO]${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}[WARN]${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}[ERROR]${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}[SUCCESS]${colors.reset} ${msg}`)
};

// Required theme structure
const requiredStructure = {
  'theme.properties': 'file',
  'login': 'directory',
  'login/template.ftl': 'file',
  'login/login.ftl': 'file',
  'login/register.ftl': 'file',
  'login/login-reset-password.ftl': 'file',
  'login/login-update-password.ftl': 'file',
  'login/error.ftl': 'file',
  'login/messages': 'directory',
  'login/messages/messages_en.properties': 'file',
  'login/resources': 'directory',
  'login/resources/css': 'directory',
  'login/resources/css/login.css': 'file',
  'account': 'directory',
  'account/template.ftl': 'file',
  'account/account.ftl': 'file',
  'account/password.ftl': 'file',
  'account/resources': 'directory',
  'account/resources/css': 'directory',
  'account/resources/css/account.css': 'file'
};

// Required properties in theme.properties
const requiredProperties = [
  'parent',
  'name',
  'displayName',
  'version',
  'locales',
  'styles',
  'accountResourceProvider',
  'loginResourceProvider'
];

// Validation functions
function checkBuildDirectory() {
  log.info('Checking build directory...');
  
  if (!fs.existsSync(BUILD_DIR)) {
    log.error(`Build directory not found: ${BUILD_DIR}`);
    log.error('Please run "npm run build-keycloak-theme" first');
    return false;
  }
  
  log.success(`Build directory found: ${BUILD_DIR}`);
  return true;
}

function checkThemeStructure() {
  log.info('Validating theme structure...');
  
  let isValid = true;
  
  for (const [filePath, type] of Object.entries(requiredStructure)) {
    const fullPath = path.join(BUILD_DIR, filePath);
    
    if (!fs.existsSync(fullPath)) {
      log.error(`Missing ${type}: ${filePath}`);
      isValid = false;
      continue;
    }
    
    const stat = fs.statSync(fullPath);
    
    if (type === 'file' && !stat.isFile()) {
      log.error(`Expected file but found directory: ${filePath}`);
      isValid = false;
    } else if (type === 'directory' && !stat.isDirectory()) {
      log.error(`Expected directory but found file: ${filePath}`);
      isValid = false;
    } else {
      log.info(`✓ ${filePath}`);
    }
  }
  
  if (isValid) {
    log.success('Theme structure validation passed');
  } else {
    log.error('Theme structure validation failed');
  }
  
  return isValid;
}

function validateThemeProperties() {
  log.info('Validating theme.properties...');
  
  const propertiesPath = path.join(BUILD_DIR, 'theme.properties');
  
  if (!fs.existsSync(propertiesPath)) {
    log.error('theme.properties file not found');
    return false;
  }
  
  const content = fs.readFileSync(propertiesPath, 'utf8');
  const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  const properties = {};
  
  lines.forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      properties[key.trim()] = valueParts.join('=').trim();
    }
  });
  
  let isValid = true;
  
  for (const prop of requiredProperties) {
    if (!properties[prop]) {
      log.error(`Missing required property: ${prop}`);
      isValid = false;
    } else {
      log.info(`✓ ${prop}=${properties[prop]}`);
    }
  }
  
  // Validate specific property values
  if (properties.name !== THEME_NAME) {
    log.error(`Theme name should be "${THEME_NAME}", found "${properties.name}"`);
    isValid = false;
  }
  
  if (isValid) {
    log.success('theme.properties validation passed');
  } else {
    log.error('theme.properties validation failed');
  }
  
  return isValid;
}

function validateTemplateFiles() {
  log.info('Validating FreeMarker template files...');
  
  const templateFiles = [
    'login/template.ftl',
    'login/login.ftl',
    'login/register.ftl',
    'account/template.ftl',
    'account/account.ftl'
  ];
  
  let isValid = true;
  
  for (const templateFile of templateFiles) {
    const filePath = path.join(BUILD_DIR, templateFile);
    
    if (!fs.existsSync(filePath)) {
      log.error(`Template file not found: ${templateFile}`);
      isValid = false;
      continue;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Basic FreeMarker syntax validation
    if (!content.includes('<#') && !content.includes('${')) {
      log.warn(`Template file may not contain FreeMarker syntax: ${templateFile}`);
    }
    
    // Check for required macros in template files
    if (templateFile.includes('template.ftl')) {
      if (!content.includes('<#macro')) {
        log.error(`Template file should contain macro definitions: ${templateFile}`);
        isValid = false;
      }
    }
    
    log.info(`✓ ${templateFile}`);
  }
  
  if (isValid) {
    log.success('Template files validation passed');
  } else {
    log.error('Template files validation failed');
  }
  
  return isValid;
}

function validateAssets() {
  log.info('Validating theme assets...');
  
  const cssFiles = [
    'login/resources/css/login.css',
    'account/resources/css/account.css'
  ];
  
  let isValid = true;
  
  for (const cssFile of cssFiles) {
    const filePath = path.join(BUILD_DIR, cssFile);
    
    if (!fs.existsSync(filePath)) {
      log.error(`CSS file not found: ${cssFile}`);
      isValid = false;
      continue;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for basic CSS content
    if (content.trim().length === 0) {
      log.warn(`CSS file is empty: ${cssFile}`);
    }
    
    // Check for FOODMISSION-specific styles
    if (!content.includes('foodmission')) {
      log.warn(`CSS file may not contain FOODMISSION-specific styles: ${cssFile}`);
    }
    
    log.info(`✓ ${cssFile} (${Math.round(content.length / 1024)}KB)`);
  }
  
  if (isValid) {
    log.success('Assets validation passed');
  } else {
    log.error('Assets validation failed');
  }
  
  return isValid;
}

function validateMessageFiles() {
  log.info('Validating message files...');
  
  const messageFiles = [
    'login/messages/messages_en.properties'
  ];
  
  let isValid = true;
  
  for (const messageFile of messageFiles) {
    const filePath = path.join(BUILD_DIR, messageFile);
    
    if (!fs.existsSync(filePath)) {
      log.error(`Message file not found: ${messageFile}`);
      isValid = false;
      continue;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    
    if (lines.length === 0) {
      log.error(`Message file is empty: ${messageFile}`);
      isValid = false;
      continue;
    }
    
    // Check for FOODMISSION-specific messages
    if (!content.includes('FOODMISSION')) {
      log.warn(`Message file may not contain FOODMISSION-specific content: ${messageFile}`);
    }
    
    log.info(`✓ ${messageFile} (${lines.length} messages)`);
  }
  
  if (isValid) {
    log.success('Message files validation passed');
  } else {
    log.error('Message files validation failed');
  }
  
  return isValid;
}

function generateReport() {
  log.info('Generating validation report...');
  
  const buildStats = fs.statSync(BUILD_DIR);
  const themeSize = getDirectorySize(BUILD_DIR);
  
  console.log('\n' + '='.repeat(50));
  console.log('FOODMISSION KEYCLOAK THEME VALIDATION REPORT');
  console.log('='.repeat(50));
  console.log(`Theme Name: ${THEME_NAME}`);
  console.log(`Build Directory: ${BUILD_DIR}`);
  console.log(`Build Date: ${buildStats.mtime.toISOString()}`);
  console.log(`Theme Size: ${Math.round(themeSize / 1024)}KB`);
  console.log('='.repeat(50));
}

function getDirectorySize(dirPath) {
  let size = 0;
  
  function calculateSize(currentPath) {
    const stats = fs.statSync(currentPath);
    
    if (stats.isFile()) {
      size += stats.size;
    } else if (stats.isDirectory()) {
      const files = fs.readdirSync(currentPath);
      files.forEach(file => {
        calculateSize(path.join(currentPath, file));
      });
    }
  }
  
  calculateSize(dirPath);
  return size;
}

// Main validation function
function main() {
  console.log(`${colors.blue}FOODMISSION Keycloak Theme Validator${colors.reset}\n`);
  
  const validations = [
    checkBuildDirectory,
    checkThemeStructure,
    validateThemeProperties,
    validateTemplateFiles,
    validateAssets,
    validateMessageFiles
  ];
  
  let allPassed = true;
  
  for (const validation of validations) {
    try {
      const result = validation();
      if (!result) {
        allPassed = false;
      }
      console.log(''); // Add spacing between validations
    } catch (error) {
      log.error(`Validation error: ${error.message}`);
      allPassed = false;
      console.log('');
    }
  }
  
  generateReport();
  
  if (allPassed) {
    log.success('All validations passed! Theme is ready for deployment.');
    process.exit(0);
  } else {
    log.error('Some validations failed. Please fix the issues before deployment.');
    process.exit(1);
  }
}

// Run the validator
if (require.main === module) {
  main();
}

module.exports = {
  checkBuildDirectory,
  checkThemeStructure,
  validateThemeProperties,
  validateTemplateFiles,
  validateAssets,
  validateMessageFiles
};