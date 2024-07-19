import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales';

const i18nInstance = i18n.createInstance();

const options = {
  resources,
  lng: 'ru',
  interpolation: {
    escapeValue: false,
  },
};

i18nInstance
  .use(initReactI18next)
  .init(options);

export default i18nInstance;
