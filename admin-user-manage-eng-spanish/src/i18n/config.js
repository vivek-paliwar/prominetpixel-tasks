import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import englishTranslate from './locales/en/translations.json';
import spanishTranslate from './locales/es/translations.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: englishTranslate,
    },
    es: {
      translations: spanishTranslate,
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
});

i18n.languages = ['en', 'es'];

export default i18n;
