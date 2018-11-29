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
      <BancorWidgetButton
        operation="buy"
        baseCurrencyId="5b164627ae2482321708eb93"
        pairCurrencyId="5937d635231e97001f744267"
      >
        Get MYB
      </BancorWidgetButton>
    </div>
    {!usingServer && (
      <Address {...user} />
    )}
  </div>
);

AppHeader.defaultProps = {
  prices: undefined,
};

AppHeader.propTypes = {
  prices: PropTypes.shape({ params: PropTypes.object }),
  user: PropTypes.shape({ params: PropTypes.object }).isRequired,
  usingServer: PropTypes.bool.isRequired,
  assetsNotification: PropTypes.shape({ params: PropTypes.object }).isRequired,
  setAssetsStatusState: PropTypes.func.isRequired,
  notificationPlace: PropTypes.string.isRequired,
};

export default AppHeader;
