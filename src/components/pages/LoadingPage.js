import React from 'react';
import PropTypes from 'prop-types';
import { Loading, Button } from 'carbon-components-react';
import { Link } from 'react-router-dom';
import '../../styles/LoadingPage.css';

const LoadingPage = ({ hasBackButton, path = '/explore', message }) => {
  const backButton = hasBackButton && (
    <Link to={path} href={path}>
      <Button
        kind="secondary"
        className="LoadingPage__back-button"
      >
          BACK
      </Button>
    </Link>
  );

  return (
    <div className="LoadingPage">
      {backButton}
      <div className="LoadingPage__wrapper">
        <Loading
          withOverlay={false}
        />
        <p className="LoadingPage__message">{message}</p>
      </div>
    </div>
  );
};

LoadingPage.propTypes = {
  hasBackButton: PropTypes.bool.isRequired,
  path: PropTypes.string,
  message: PropTypes.string.isRequired,
};

LoadingPage.defaultProps = {
  path: '',
};

export default LoadingPage;
