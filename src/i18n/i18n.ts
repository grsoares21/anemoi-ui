import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import pt from './pt.json';
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en, pt
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'pt',

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;