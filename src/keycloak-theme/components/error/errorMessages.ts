import { LocalizedErrorMessages } from "./types";

/**
 * Internationalized error messages for the FOODMISSION Keycloak theme
 */

export const ERROR_MESSAGES: LocalizedErrorMessages = {
  // Authentication errors
  INVALID_CREDENTIALS: {
    en: "Invalid username or password. Please check your credentials and try again.",
    es: "Nombre de usuario o contraseña inválidos. Por favor, verifica tus credenciales e inténtalo de nuevo.",
    fr: "Nom d'utilisateur ou mot de passe invalide. Veuillez vérifier vos identifiants et réessayer.",
    de: "Ungültiger Benutzername oder Passwort. Bitte überprüfen Sie Ihre Anmeldedaten und versuchen Sie es erneut.",
    it: "Nome utente o password non validi. Controlla le tue credenziali e riprova.",
  },

  ACCOUNT_DISABLED: {
    en: "Your account has been disabled. Please contact support for assistance.",
    es: "Tu cuenta ha sido deshabilitada. Por favor, contacta con soporte para obtener ayuda.",
    fr: "Votre compte a été désactivé. Veuillez contacter le support pour obtenir de l'aide.",
    de: "Ihr Konto wurde deaktiviert. Bitte wenden Sie sich an den Support für Hilfe.",
    it: "Il tuo account è stato disabilitato. Contatta il supporto per assistenza.",
  },

  ACCOUNT_TEMPORARILY_DISABLED: {
    en: "Your account has been temporarily locked due to multiple failed login attempts. Please try again later or contact support.",
    es: "Tu cuenta ha sido bloqueada temporalmente debido a múltiples intentos de inicio de sesión fallidos. Inténtalo más tarde o contacta con soporte.",
    fr: "Votre compte a été temporairement verrouillé en raison de plusieurs tentatives de connexion échouées. Veuillez réessayer plus tard ou contacter le support.",
    de: "Ihr Konto wurde aufgrund mehrerer fehlgeschlagener Anmeldeversuche vorübergehend gesperrt. Versuchen Sie es später erneut oder wenden Sie sich an den Support.",
    it: "Il tuo account è stato temporaneamente bloccato a causa di multipli tentativi di accesso falliti. Riprova più tardi o contatta il supporto.",
  },

  USER_NOT_FOUND: {
    en: "User not found. Please check your username or register for a new account.",
    es: "Usuario no encontrado. Por favor, verifica tu nombre de usuario o regístrate para una nueva cuenta.",
    fr: "Utilisateur non trouvé. Veuillez vérifier votre nom d'utilisateur ou vous inscrire pour un nouveau compte.",
    de: "Benutzer nicht gefunden. Bitte überprüfen Sie Ihren Benutzernamen oder registrieren Sie sich für ein neues Konto.",
    it: "Utente non trovato. Controlla il tuo nome utente o registrati per un nuovo account.",
  },

  // Validation errors
  INVALID_EMAIL: {
    en: "Please enter a valid email address.",
    es: "Por favor, introduce una dirección de correo electrónico válida.",
    fr: "Veuillez saisir une adresse e-mail valide.",
    de: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    it: "Inserisci un indirizzo email valido.",
  },

  PASSWORD_TOO_WEAK: {
    en: "Password does not meet security requirements. Please choose a stronger password.",
    es: "La contraseña no cumple con los requisitos de seguridad. Por favor, elige una contraseña más fuerte.",
    fr: "Le mot de passe ne répond pas aux exigences de sécurité. Veuillez choisir un mot de passe plus fort.",
    de: "Das Passwort erfüllt nicht die Sicherheitsanforderungen. Bitte wählen Sie ein stärkeres Passwort.",
    it: "La password non soddisfa i requisiti di sicurezza. Scegli una password più forte.",
  },

  REQUIRED_FIELD_MISSING: {
    en: "This field is required. Please fill in all required information.",
    es: "Este campo es obligatorio. Por favor, completa toda la información requerida.",
    fr: "Ce champ est obligatoire. Veuillez remplir toutes les informations requises.",
    de: "Dieses Feld ist erforderlich. Bitte füllen Sie alle erforderlichen Informationen aus.",
    it: "Questo campo è obbligatorio. Compila tutte le informazioni richieste.",
  },

  EMAIL_ALREADY_EXISTS: {
    en: "An account with this email address already exists. Please use a different email or try logging in.",
    es: "Ya existe una cuenta con esta dirección de correo electrónico. Por favor, usa un correo diferente o intenta iniciar sesión.",
    fr: "Un compte avec cette adresse e-mail existe déjà. Veuillez utiliser un e-mail différent ou essayer de vous connecter.",
    de: "Ein Konto mit dieser E-Mail-Adresse existiert bereits. Bitte verwenden Sie eine andere E-Mail oder versuchen Sie sich anzumelden.",
    it: "Esiste già un account con questo indirizzo email. Usa un email diverso o prova ad accedere.",
  },

  // Network errors
  NETWORK_ERROR: {
    en: "Network connection error. Please check your internet connection and try again.",
    es: "Error de conexión de red. Por favor, verifica tu conexión a internet e inténtalo de nuevo.",
    fr: "Erreur de connexion réseau. Veuillez vérifier votre connexion Internet et réessayer.",
    de: "Netzwerkverbindungsfehler. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
    it: "Errore di connessione di rete. Controlla la tua connessione internet e riprova.",
  },

  CONNECTION_TIMEOUT: {
    en: "Connection timeout. The server is taking too long to respond. Please try again.",
    es: "Tiempo de conexión agotado. El servidor está tardando demasiado en responder. Por favor, inténtalo de nuevo.",
    fr: "Délai de connexion dépassé. Le serveur met trop de temps à répondre. Veuillez réessayer.",
    de: "Verbindungs-Timeout. Der Server braucht zu lange zum Antworten. Bitte versuchen Sie es erneut.",
    it: "Timeout di connessione. Il server sta impiegando troppo tempo a rispondere. Riprova.",
  },

  SERVICE_UNAVAILABLE: {
    en: "Service temporarily unavailable. Please try again later.",
    es: "Servicio temporalmente no disponible. Por favor, inténtalo más tarde.",
    fr: "Service temporairement indisponible. Veuillez réessayer plus tard.",
    de: "Service vorübergehend nicht verfügbar. Bitte versuchen Sie es später erneut.",
    it: "Servizio temporaneamente non disponibile. Riprova più tardi.",
  },

  // Session errors
  SESSION_EXPIRED: {
    en: "Your session has expired for security reasons. Please log in again.",
    es: "Tu sesión ha expirado por razones de seguridad. Por favor, inicia sesión de nuevo.",
    fr: "Votre session a expiré pour des raisons de sécurité. Veuillez vous reconnecter.",
    de: "Ihre Sitzung ist aus Sicherheitsgründen abgelaufen. Bitte melden Sie sich erneut an.",
    it: "La tua sessione è scaduta per motivi di sicurezza. Accedi di nuovo.",
  },

  TOKEN_EXPIRED: {
    en: "Your authentication token has expired. Please log in again.",
    es: "Tu token de autenticación ha expirado. Por favor, inicia sesión de nuevo.",
    fr: "Votre jeton d'authentification a expiré. Veuillez vous reconnecter.",
    de: "Ihr Authentifizierungs-Token ist abgelaufen. Bitte melden Sie sich erneut an.",
    it: "Il tuo token di autenticazione è scaduto. Accedi di nuovo.",
  },

  // Server errors
  INTERNAL_SERVER_ERROR: {
    en: "An internal server error occurred. Please try again later or contact support.",
    es: "Ocurrió un error interno del servidor. Por favor, inténtalo más tarde o contacta con soporte.",
    fr: "Une erreur interne du serveur s'est produite. Veuillez réessayer plus tard ou contacter le support.",
    de: "Ein interner Serverfehler ist aufgetreten. Bitte versuchen Sie es später erneut oder wenden Sie sich an den Support.",
    it: "Si è verificato un errore interno del server. Riprova più tardi o contatta il supporto.",
  },

  SERVICE_MAINTENANCE: {
    en: "The FOODMISSION platform is currently undergoing maintenance. Please try again later.",
    es: "La plataforma FOODMISSION está actualmente en mantenimiento. Por favor, inténtalo más tarde.",
    fr: "La plateforme FOODMISSION est actuellement en maintenance. Veuillez réessayer plus tard.",
    de: "Die FOODMISSION-Plattform wird derzeit gewartet. Bitte versuchen Sie es später erneut.",
    it: "La piattaforma FOODMISSION è attualmente in manutenzione. Riprova più tardi.",
  },

  // Authorization errors
  ACCESS_DENIED: {
    en: "Access denied. You do not have permission to access this resource.",
    es: "Acceso denegado. No tienes permiso para acceder a este recurso.",
    fr: "Accès refusé. Vous n'avez pas la permission d'accéder à cette ressource.",
    de: "Zugriff verweigert. Sie haben keine Berechtigung, auf diese Ressource zuzugreifen.",
    it: "Accesso negato. Non hai il permesso di accedere a questa risorsa.",
  },

  INSUFFICIENT_PERMISSIONS: {
    en: "Insufficient permissions. Please contact your administrator for access.",
    es: "Permisos insuficientes. Por favor, contacta con tu administrador para obtener acceso.",
    fr: "Permissions insuffisantes. Veuillez contacter votre administrateur pour l'accès.",
    de: "Unzureichende Berechtigungen. Bitte wenden Sie sich an Ihren Administrator für den Zugang.",
    it: "Permessi insufficienti. Contatta il tuo amministratore per l'accesso.",
  },

  // Configuration errors
  INVALID_CLIENT: {
    en: "Invalid client configuration. Please contact your system administrator.",
    es: "Configuración de cliente inválida. Por favor, contacta con tu administrador del sistema.",
    fr: "Configuration client invalide. Veuillez contacter votre administrateur système.",
    de: "Ungültige Client-Konfiguration. Bitte wenden Sie sich an Ihren Systemadministrator.",
    it: "Configurazione client non valida. Contatta il tuo amministratore di sistema.",
  },

  // Generic/Unknown errors
  UNKNOWN_ERROR: {
    en: "An unexpected error occurred. Please try again or contact support if the problem persists.",
    es: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo o contacta con soporte si el problema persiste.",
    fr: "Une erreur inattendue s'est produite. Veuillez réessayer ou contacter le support si le problème persiste.",
    de: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder wenden Sie sich an den Support, wenn das Problem weiterhin besteht.",
    it: "Si è verificato un errore imprevisto. Riprova o contatta il supporto se il problema persiste.",
  },
};

/**
 * Gets a localized error message
 */
export function getLocalizedErrorMessage(
  errorCode: string,
  locale: string = "en",
  fallbackMessage?: string
): string {
  const messages = ERROR_MESSAGES[errorCode];

  if (messages && messages[locale]) {
    return messages[locale];
  }

  // Try English as fallback
  if (messages && messages.en) {
    return messages.en;
  }

  // Use provided fallback or generic message
  return (
    fallbackMessage ||
    ERROR_MESSAGES.UNKNOWN_ERROR[locale] ||
    ERROR_MESSAGES.UNKNOWN_ERROR.en
  );
}

/**
 * Gets all available locales for error messages
 */
export function getAvailableLocales(): string[] {
  const locales = new Set<string>();

  Object.values(ERROR_MESSAGES).forEach((messages) => {
    Object.keys(messages).forEach((locale) => locales.add(locale));
  });

  return Array.from(locales).sort();
}
