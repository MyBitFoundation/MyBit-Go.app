import React from 'react';
import NotFound from '../../images/404.svg';
import '../../styles/NotFoundPage.css';

const NotFoundPage = () => (
  <div className="NotFoundPage">
    <img className="NotFoundPage__image" alt="Page not found" src={NotFound} />
    <h1 className="NotFoundPage__header-text">Page not found.</h1>
    <h2 className="NotFoundPage__message-text">The page you‘re looking for doesn‘t exist.</h2>
    <div className="NotFoundPage__background-circle-right" />
    <div className="NotFoundPage__background-circle-left" />
  </div>
);

export default NotFoundPage;
