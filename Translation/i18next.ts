import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./Languages/en.json";
import de from "./Languages/de.json";

// const isDevelopment = process.env.NODE_ENV === 'development';

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: "en",
    resources: {
      en: {
        translation: en,
      },
      de: {
        translation: de,
      },
    },
  });

export default i18n;
