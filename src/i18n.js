import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import es from './locales/es.json';
import hi from './locales/hi.json';
import pt from './locales/pt.json';
import zh from './locales/zh.json';
import fr from './locales/fr.json';

i18n
  .use(LanguageDetector) // Automatically detects user's language preference
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      hi: { translation: hi },
      pt: { translation: pt },
      zh: { translation: zh },
      fr: { translation: fr }
    },
    fallbackLng: 'en', // Default language if none is detected
    interpolation: {
      escapeValue: false // React already escapes values by default
    }
  });
  //console.log(i18n.t('askquestion.ask_public_question'));

export default i18n;
