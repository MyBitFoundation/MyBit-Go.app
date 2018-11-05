import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import 'antd/lib/button/style';
import '../../styles/LoadingPage.css';
import Spin from '../../images/spin.svg';

const LoadingPage = ({ message, hasBackButton, history }) => (
  <div className="LoadingPage">
    {hasBackButton && (
      <Button
        type="secondary"
        onClick={history.goBack}
        className="LoadingPage__back-button"
      >
        Back
      </Button>
    )}
    <div className="LoadingPage__wrapper">
      <Spin style={{ height: '64px', width: '64px' }} />
      <p className="LoadingPage__message">{message}</p>
    </div>
  </div>
);

LoadingPage.propTypes = {
  message: PropTypes.string.isRequired,
  hasBackButton: PropTypes.bool,
  history: PropTypes.shape({ params: PropTypes.object }).isRequired,
};

LoadingPage.defaultProps = {
  hasBackButton: false,
};

export default withRouter(LoadingPage);
