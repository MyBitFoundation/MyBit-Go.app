import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'antd/lib/alert';
import 'antd/lib/alert/style/css';
import '../styles/AlertMessage.css';

const AlertMessage = props => (
  <div className={props.className || 'AlertMessage'}>
    <Alert
      type={props.type}
      message={props.message}
      onClose={props.handleAlertClosed}
      showIcon
      closable={props.closable}
    />
  </div>
);

export default AlertMessage;

AlertMessage.defaultProps = {
  className: undefined,
  closable: true,
};

AlertMessage.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleAlertClosed: PropTypes.func.isRequired,
  className: PropTypes.string,
  closable: PropTypes.bool,
};
