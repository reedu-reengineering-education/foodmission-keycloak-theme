import { i18nBuilder } from "keycloakify/login/i18n";

/**
 * FOODMISSION Keycloak Theme i18n Configuration
 *
 * This file uses Keycloakify's official i18nBuilder to create a proper i18n system that:
 * - Leverages Keycloak's built-in translations (400+ message keys in 29+ languages)
 * - Adds custom FOODMISSION-specific translations
 * - Provides automatic language switching and URL generation
 * - Supports code-splitting for better performance
 */

// Define our custom message keys for FOODMISSION-specific content
type MessageKey_foodmission =
  | "foodmission.title"
  | "foodmission.welcome"
  | "foodmission.description"
  | "foodmission.mission"
  | "foodmission.tagline"
  | "footer.privacy"
  | "footer.terms"
  | "footer.about"
  | "footer.contact"
  | "footer.support"
  | "footer.funding";

// Build the i18n hook with custom translations
// Languages are ordered alphabetically by language code for consistency
const { useI18n } = i18nBuilder
  .withCustomTranslations<MessageKey_foodmission>({
    // Czech (Čeština)
    cs: {
      "foodmission.title": "FOODMISSION",
      "foodmission.welcome": "Vítejte v FOODMISSION",
      "foodmission.description":
        "Připojte se k našemu projektu občanské vědy pro zdravou spotřebu potravin a snižování plýtvání",
      "foodmission.mission":
        "Umožnit občanům činit informovaná rozhodnutí o potravinách a snižovat plýtvání prostřednictvím vědy",
      "foodmission.tagline": "Občanská věda pro udržitelné potravinové systémy",
      "footer.privacy": "Ochrana soukromí",
      "footer.terms": "Podmínky použití",
      "footer.about": "O projektu",
      "footer.contact": "Kontakt",
      "footer.support": "Podpora",
      "footer.funding": "Financováno Evropskou unií",
    },
    // Danish (Dansk)
    da: {
      "foodmission.title": "FOODMISSION",
      "foodmission.welcome": "Velkommen til FOODMISSION",
      "foodmission.description":
        "Deltag i vores borgerforskning projekt for sundt fødevareforbrug og madspildsreduktion",
      "foodmission.mission":
        "Styrke borgere til at træffe informerede fødevarevalg og reducere spild gennem videnskab",
      "foodmission.tagline": "Borgerforskning for bæredygtige fødevaresystemer",
      "footer.privacy": "Privatlivspolitik",
      "footer.terms": "Servicevilkår",
      "footer.about": "Om",
      "footer.contact": "Kontakt",
      "footer.support": "Support",
      "footer.funding": "Finansieret af Den Europæiske Union",
    },
    // German (Deutsch)
    de: {
      "foodmission.title": "FOODMISSION",
      "foodmission.welcome": "Willkommen bei FOODMISSION",
      "foodmission.description":
        "Nehmen Sie an unserem Citizen-Science-Projekt für gesunde Ernährung und Abfallreduzierung teil",
      "foodmission.mission":
        "Bürger befähigen, informierte Lebensmittelentscheidungen zu treffen und Abfall durch Wissenschaft zu reduzieren",
      "foodmission.tagline":
        "Bürgerwissenschaft für nachhaltige Lebensmittelsysteme",
      "footer.privacy": "Datenschutz",
      "footer.terms": "Nutzungsbedingungen",
      "footer.about": "Über uns",
      "footer.contact": "Kontakt",
      "footer.support": "Support",
      "footer.funding": "Finanziert von der Europäischen Union",
    },
    // English
    en: {
      "foodmission.title": "FOODMISSION",
      "foodmission.welcome": "Welcome to FOODMISSION",
      "foodmission.description":
        "Join our citizen science project for healthy food consumption and waste reduction",
      "foodmission.mission":
        "Empowering citizens to make informed food choices and reduce waste through science",
      "foodmission.tagline": "Citizen Science for Sustainable Food Systems",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Service",
      "footer.about": "About",
      "footer.contact": "Contact",
      "footer.support": "Support",
      "footer.funding": "Funded by the European Union",
    },
    // Spanish (Español)
    es: {
      "foodmission.title": "FOODMISSION",
      "foodmission.welcome": "Bienvenido a FOODMISSION",
      "foodmission.description":
        "Únete a nuestro proyecto de ciencia ciudadana para el consumo saludable de alimentos y la reducción de residuos",
      "foodmission.mission":
        "Empoderar a los ciudadanos para tomar decisiones alimentarias informadas y reducir residuos a través de la ciencia",
      "foodmission.tagline":
        "Ciencia Ciudadana para Sistemas Alimentarios Sostenibles",
      "footer.privacy": "Política de Privacidad",
      "footer.terms": "Términos de Servicio",
      "footer.about": "Acerca de",
      "footer.contact": "Contacto",
      "footer.support": "Soporte",
      "footer.funding": "Financiado por la Unión Europea",
    },
    // Finnish (Suomi)
    fi: {
      "foodmission.title": "FOODMISSION",
      "foodmission.welcome": "Tervetuloa FOODMISSION:iin",
      "foodmission.description":
        "Liity kansalaistiede-projektiimme terveellisen ruoan kulutuksen ja ruokahävikin vähentämisen parissa",
      "foodmission.mission":
        "Voimaannuttaa kansalaisia tekemään tietoisia ruokavalintoja ja vähentämään hävikkiä tieteen avulla",
      "foodmission.tagline": "Kansalaistiede kestäville ruokajärjestelmille",
      "footer.privacy": "Tietosuojakäytäntö",
      "footer.terms": "Käyttöehdot",
      "footer.about": "Tietoja",
      "footer.contact": "Yhteystiedot",
      "footer.support": "Tuki",
      "footer.funding": "Euroopan unionin rahoittama",
    },
    // French (Français)
    fr: {
      "foodmission.title": "FOODMISSION",
      "foodmission.welcome": "Bienvenue à FOODMISSION",
      "foodmission.description":
        "Rejoignez notre projet de science citoyenne pour une consommation alimentaire saine et la réduction des déchets",
      "foodmission.mission":
        "Permettre aux citoyens de faire des choix alimentaires éclairés et de réduire les déchets grâce à la science",
      "foodmission.tagline":
        "Science Citoyenne pour des Systèmes Alimentaires Durables",
      "footer.privacy": "Politique de Confidentialité",
      "footer.terms": "Conditions d'Utilisation",
      "footer.about": "À Propos",
      "footer.contact": "Contact",
      "footer.support": "Support",
      "footer.funding": "Financé par l'Union Européenne",
    },
    // Hungarian (Magyar)
    hu: {
      "foodmission.title": "FOODMISSION",
      "foodmission.welcome": "Üdvözöljük a FOODMISSION-ben",
      "foodmission.description":
        "Csatlakozzon állampolgári tudományos projektünkhöz az egészséges táplálkozás és az élelmiszerpazarlás csökkentése érdekében",
      "foodmission.mission":
        "Állampolgárok felhatalmazása tudatos élelmiszer-választásokra és a pazarlás csökkentésére a tudomány segítségével",
      "foodmission.tagline":
        "Állampolgári tudomány a fenntartható élelmiszerrendszerekért",
      "footer.privacy": "Adatvédelmi Irányelvek",
      "footer.terms": "Felhasználási Feltételek",
      "footer.about": "Rólunk",
      "footer.contact": "Kapcsolat",
      "footer.support": "Támogatás",
      "footer.funding": "Az Európai Unió finanszírozásával",
    },
    // Italian (Italiano)
    it: {
      "foodmission.title": "FOODMISSION",
      "foodmission.welcome": "Benvenuto a FOODMISSION",
      "foodmission.description":
        "Unisciti al nostro progetto di scienza dei cittadini per il consumo alimentare sano e la riduzione dei rifiuti",
      "foodmission.mission":
        "Permettere ai cittadini di fare scelte alimentari informate e ridurre i rifiuti attraverso la scienza",
      "foodmission.tagline":
        "Scienza dei Cittadini per Sistemi Alimentari Sostenibili",
      "footer.privacy": "Informativa sulla Privacy",
      "footer.terms": "Termini di Servizio",
      "footer.about": "Chi Siamo",
      "footer.contact": "Contatti",
      "footer.support": "Supporto",
      "footer.funding": "Finanziato dall'Unione Europea",
    },
    // Dutch (Nederlands)
    nl: {
      "foodmission.title": "FOODMISSION",
      "foodmission.welcome": "Welkom bij FOODMISSION",
      "foodmission.description":
        "Doe mee aan ons burgerwetenschap project voor gezonde voedselconsumptie en afvalvermindering",
      "foodmission.mission":
        "Burgers in staat stellen om geïnformeerde voedselkeuzes te maken en afval te verminderen door wetenschap",
      "foodmission.tagline": "Burgerwetenschap voor Duurzame Voedselsystemen",
      "footer.privacy": "Privacybeleid",
      "footer.terms": "Servicevoorwaarden",
      "footer.about": "Over Ons",
      "footer.contact": "Contact",
      "footer.support": "Ondersteuning",
      "footer.funding": "Gefinancierd door de Europese Unie",
    },
    // Norwegian (Norsk)
    no: {
      "foodmission.title": "FOODMISSION",
      "foodmission.welcome": "Velkommen til FOODMISSION",
      "foodmission.description":
        "Bli med i vårt borgerforskning prosjekt for sunt matforbruk og avfallsreduksjon",
      "foodmission.mission":
        "Styrke borgere til å ta informerte matvalg og redusere avfall gjennom vitenskap",
      "foodmission.tagline": "Borgerforskning for Bærekraftige Matsystemer",
      "footer.privacy": "Personvernregler",
      "footer.terms": "Tjenestevilkår",
      "footer.about": "Om Oss",
      "footer.contact": "Kontakt",
      "footer.support": "Støtte",
      "footer.funding": "Finansiert av Den Europeiske Union",
    },
    // Polish (Polski)
    pl: {
      "foodmission.title": "FOODMISSION",
      "foodmission.welcome": "Witamy w FOODMISSION",
      "foodmission.description":
        "Dołącz do naszego projektu nauki obywatelskiej na rzecz zdrowego spożycia żywności i redukcji marnotrawstwa",
      "foodmission.mission":
        "Wzmacnianie obywateli do podejmowania świadomych wyborów żywieniowych i redukcji marnotrawstwa poprzez naukę",
      "foodmission.tagline":
        "Nauka Obywatelska dla Zrównoważonych Systemów Żywnościowych",
      "footer.privacy": "Polityka Prywatności",
      "footer.terms": "Warunki Usługi",
      "footer.about": "O Nas",
      "footer.contact": "Kontakt",
      "footer.support": "Wsparcie",
      "footer.funding": "Finansowane przez Unię Europejską",
    },
    // Portuguese (Português)
    pt: {
      "foodmission.title": "FOODMISSION",
      "foodmission.welcome": "Bem-vindo ao FOODMISSION",
      "foodmission.description":
        "Junte-se ao nosso projeto de ciência cidadã para consumo alimentar saudável e redução de desperdício",
      "foodmission.mission":
        "Capacitar cidadãos a fazer escolhas alimentares informadas e reduzir o desperdício através da ciência",
      "foodmission.tagline":
        "Ciência Cidadã para Sistemas Alimentares Sustentáveis",
      "footer.privacy": "Política de Privacidade",
      "footer.terms": "Termos de Serviço",
      "footer.about": "Sobre",
      "footer.contact": "Contato",
      "footer.support": "Suporte",
      "footer.funding": "Financiado pela União Europeia",
    },
    // Swedish (Svenska)
    sv: {
      "foodmission.title": "FOODMISSION",
      "foodmission.welcome": "Välkommen till FOODMISSION",
      "foodmission.description":
        "Gå med i vårt medborgarforskning projekt för hälsosam matkonsumtion och avfallsminskning",
      "foodmission.mission":
        "Stärka medborgare att göra informerade matval och minska avfall genom vetenskap",
      "foodmission.tagline": "Medborgarforskning för Hållbara Matsystem",
      "footer.privacy": "Integritetspolicy",
      "footer.terms": "Användarvillkor",
      "footer.about": "Om Oss",
      "footer.contact": "Kontakt",
      "footer.support": "Support",
      "footer.funding": "Finansierat av Europeiska Unionen",
    },
  })
  .build();

export { useI18n };
export type I18n = ReturnType<typeof useI18n>["i18n"];
