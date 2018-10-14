import React from 'react';
import PropTypes from 'prop-types';

import '../styles/AppHeader.css';
import Logo from './Logo';
import ExchangeRate from './ExchangeRate';
import AccountInfo from './AccountInfo';
import Address from './Address';
import BancorWidgetButton from './UI/BancorWidgetButton/index';

const AppHeader = ({
  user, prices, usingServer,
}) => (
  <div className="AppHeader">
    <div className="AppHeader__logo-and-info">
      <Logo className="AppHeader__logo" />
      <ExchangeRate
        {...prices}
      />
      {!usingServer && (
        <AccountInfo
          {...user}
        />
      )}
    </div>
    <div className="AppHeader__BancrorWidget-container">
      <BancorWidgetButton operation="buy">Buy</BancorWidgetButton>
      <BancorWidgetButton operation="sell">Sell</BancorWidgetButton>
    </div>
    {!usingServer && (
      <Address {...user} />
    )}
  </div>
);

AppHeader.propTypes = {
  prices: PropTypes.shape({ params: PropTypes.object }).isRequired,
  user: PropTypes.shape({ params: PropTypes.object }).isRequired,
  usingServer: PropTypes.bool.isRequired,
  assertsNotification: PropTypes.shape({ params: PropTypes.object }).isRequired,
  setAssertsStatusState: PropTypes.func.isRequired,
  notificationPlace: PropTypes.string.isRequired,
};

export default AppHeader;
