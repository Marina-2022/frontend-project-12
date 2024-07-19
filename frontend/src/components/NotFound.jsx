import React from 'react';
import imageNotFound from '../images/errorPage.png';
// import Header from './Header';

const NotFound = () => (
  <>
    {/* <Header /> */}
    <div className="text-center">
      <img
        className="img-fluid w-50"
        src={imageNotFound}
        alt="Страница не найдена"
      />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">
        Но вы можете перейти
        {' '}
        <a href="/">на главную страницу</a>
      </p>
    </div>
  </>
);

export default NotFound;
