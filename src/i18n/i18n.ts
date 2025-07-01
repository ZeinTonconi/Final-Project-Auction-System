import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { esJSON } from "./es";
import { enJSON } from "./en";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: enJSON,
    },
    es: {
      translation: esJSON,
    },
  },
});

export default i18n;
