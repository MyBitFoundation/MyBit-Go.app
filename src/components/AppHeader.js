import React from 'react';
import PropTypes from 'prop-types';

import '../styles/AppHeader.css';
import Logo from './Logo';
import ExchangeRate from './ExchangeRate';
import AccountInfo from './AccountInfo';
import Address from './Address';

const AppHeader = ({ user, prices, usingServer }) => (
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
    {!usingServer && (
      <Address
        {...user}
      />
    )}
  </div>
);

AppHeader.propTypes = {
  prices: PropTypes.shape({ params: PropTypes.object }).isRequired,
  user: PropTypes.shape({ params: PropTypes.object }).isRequired,
  usingServer: PropTypes.bool.isRequired,
};

export default AppHeader;
