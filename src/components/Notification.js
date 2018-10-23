import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../styles/Notification.css';
import AlertMessage from './AlertMessage';

class Notification extends PureComponent {
  render() {
    const { setAssetsStatusState, assetsNotification } = this.props;

    if (assetsNotification.alertType) {
      return (
        <div className="Notification__alert-wrapper">
          <AlertMessage
            type={assetsNotification.alertType}
            message={assetsNotification.alertMessage}
            handleAlertClosed={() => setAssetsStatusState(null)}
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
  assetsNotification: PropTypes.shape({ params: PropTypes.object }).isRequired,
  setAssetsStatusState: PropTypes.func.isRequired,
};

export default Notification;
