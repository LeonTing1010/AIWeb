import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import language files
import enTranslation from "./locales/en.json";
import zhTranslation from "./locales/zh.json";
import esTranslation from "./locales/es.json";
import arTranslation from "./locales/ar.json";
import ruTranslation from "./locales/ru.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      zh: {
        translation: zhTranslation
      },
      es: {
        translation: esTranslation
      },
      ar: {
        translation: arTranslation
      },
      ru: {
        translation: ruTranslation
      }
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;