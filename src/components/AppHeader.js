import React from 'react';
import PropTypes from 'prop-types';

import '../styles/AppHeader.css';
import Logo from './Logo';
import ExchangeRate from './ExchangeRate';
import AccountInfo from './AccountInfo';
import Address from './Address';
import Notification from './Notification';

const AppHeader = ({
  user, prices, assertsNotification, setAssertsStatusState,
}) => (
  <div className="AppHeader">
    <div className="AppHeader__logo-and-info">
      <Logo className="AppHeader__logo" />
      <ExchangeRate {...prices} />
      <AccountInfo {...user} />
    </div>
    <Address {...user} />
    <Notification
      setAssertsStatusState={setAssertsStatusState}
      assertsNotification={assertsNotification}
    />
  </div>
);

export default AppHeader;

AppHeader.propTypes = {
  prices: PropTypes.shape({ params: PropTypes.object }).isRequired,
  user: PropTypes.shape({ params: PropTypes.object }).isRequired,
  assertsNotification: PropTypes.shape({ params: PropTypes.object }).isRequired,
  setAssertsStatusState: PropTypes.func.isRequired,
};
