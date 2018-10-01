import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'antd/lib/alert';
import 'antd/lib/alert/style/css';
import '../styles/AlertMessage.css';

const AlertMessage = props => (
  <div className="AlertMessage">
    <Alert
      type={props.type}
      message={props.message}
      onClose={props.handleAlertClosed}
      showIcon
      closable
    />
  </div>
);

export default AlertMessage;

AlertMessage.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleAlertClosed: PropTypes.func.isRequired,
};
