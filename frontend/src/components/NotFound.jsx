import React from 'react';
import { useTranslation } from 'react-i18next';
import imageNotFound from '../images/errorPage.png';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        className="img-fluid w-50"
        src={imageNotFound}
        alt={t('notFound.pageNotFound')}
        style={{
          marginTop: '40px',
        }}
      />
      <h1 className="h4 text-muted">{t('notFound.pageNotFound')}</h1>
      <p className="text-muted">
        {t('notFound.youCanGo')}
        {' '}
        <a href="/">{t('notFound.toTheHomepage')}</a>
      </p>
    </div>
  );
};

export default NotFound;
