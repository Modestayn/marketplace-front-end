import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'uk',
    fallbackLng: 'uk',
    supportedLngs: ['uk', 'en'],
    debug: import.meta.env.DEV,
    interpolation: { escapeValue: false },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    load: 'languageOnly',
    detection: {
      order: ['navigator', 'cookie', 'localStorage'],
      caches: ['cookie', 'localStorage'],
    },
  });

export default i18n;
