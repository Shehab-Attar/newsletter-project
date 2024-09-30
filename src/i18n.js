// Configuration file for i18next
// Sets up language detection, backend for loading translations, and React integration
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector"
import {initReactI18next} from "react-i18next";
import Backend from 'i18next-http-backend';

// Configures language change listener to update document direction
i18n.on("languageChanged", (locales) => {
  document.body.dir = i18n.dir(locales);
});

  i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend).init({
    debug: true,
    fallbackLng: "en",
    detection: {
      order: ["path", "cookie", "localStorage", "sessionStorage", "navigator", "htmlTag", "querystring", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;