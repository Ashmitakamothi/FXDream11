import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./language/en.json";
import hiTranslations from "./language/hi.json";

const savedLanguage = localStorage.getItem("appLanguage") || "en";

const resources = {
  en: {
    translation: enTranslations
  },
  hi: {
    translation: hiTranslations
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  },
  keySeparator: false
});

export default i18n;
