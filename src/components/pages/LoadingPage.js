import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon, Button } from 'antd';
// import MybitIcon from '../../images/mybit-small.svg';
import { Link } from 'react-router-dom';
import '../../styles/LoadingPage.css';

const LoadingPage = ({ hasBackButton, path = '/explore', message }) => {
  const backButton = hasBackButton && (
    <Link to={path} href={path}>
      <Button type="secondary" className="LoadingPage__back-button">
        Back
      </Button>
    </Link>
  );

  const loadingIcon = <Icon type="loading" style={{ fontSize: 64 }} spin />;

  return (
    <div className="LoadingPage">
      {backButton}
      <div className="LoadingPage__wrapper">
        <Spin indicator={loadingIcon} />
        <p className="LoadingPage__message">{message}</p>
      </div>
    </div>
  );
};

LoadingPage.propTypes = {
  hasBackButton: PropTypes.bool,
  path: PropTypes.string,
  message: PropTypes.string.isRequired,
};

LoadingPage.defaultProps = {
  path: '',
  hasBackButton: false,
};

export default LoadingPage;
