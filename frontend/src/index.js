import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import filter from 'leo-profanity';
import i18n from './i18n.js';
import App from './App';
import store from './store/index.js';
import badWords from './locales/customBadWords.js';

filter.add(filter.getDictionary('en'));
filter.add(filter.getDictionary('ru'));
filter.add(badWords);

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
);
