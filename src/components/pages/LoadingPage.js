import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon } from 'antd';
// import MybitIcon from '../../images/mybit-small.svg';
import '../../styles/LoadingPage.css';

const LoadingPage = ({ message }) => {
  const loadingIcon = <Icon type="loading" style={{ fontSize: 42 }} spin />;

  return (
    <div className="LoadingPage">
      <div className="LoadingPage__wrapper">
        <Spin className="LoadingPage__spin" indicator={loadingIcon} />
        <p className="LoadingPage__message">{message}</p>
      </div>
    </div>
  );
};

LoadingPage.propTypes = {
  message: PropTypes.string.isRequired,
};

LoadingPage.defaultProps = {
};

export default LoadingPage;
