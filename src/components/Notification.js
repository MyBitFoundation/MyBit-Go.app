import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../styles/Notification.css';
import AlertMessage from './AlertMessage';

class Notification extends PureComponent {
  render() {
    const { setAssertsStatusState, assertsNotification } = this.props;

    if (assertsNotification.alertType) {
      return (
        <div className="Notification__alert-wrapper">
          <AlertMessage
            type={assertsNotification.alertType}
            message={assertsNotification.alertMessage}
            handleAlertClosed={() => setAssertsStatusState(null)}
            showIcon
            closable
          />
        </div>
      );
    }
    return null;
  }
}

Notification.propTypes = {
  assertsNotification: PropTypes.shape({ params: PropTypes.object }).isRequired,
  setAssertsStatusState: PropTypes.func.isRequired,
};

export default Notification;
