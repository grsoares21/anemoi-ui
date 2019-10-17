import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// load moment.js locales (en-us is loaded by defaults)
import 'moment/locale/pt-br';

import en from './en.json';
import pt from './pt.json';
// the translations
// (tip move them in a JSON file and import them)
let resources: any = {};

resources['en-US'] = en;
resources['pt-BR'] = pt;

export const languageList = ['en-US', 'pt-BR'];

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en-US',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    },
    whitelist: languageList
  });

export default i18n;
