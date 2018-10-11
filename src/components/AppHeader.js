import React from 'react';
import PropTypes from 'prop-types';

import '../styles/AppHeader.css';
import Logo from './Logo';
import ExchangeRate from './ExchangeRate';
import AccountInfo from './AccountInfo';
import Address from './Address';

const AppHeader = ({ user, prices, userHasMetamask }) => {
  console.log(userHasMetamask)
  return (
  <div className="AppHeader">
    <div className="AppHeader__logo-and-info">
      <Logo className="AppHeader__logo" />
        <ExchangeRate
          {...prices}
          userHasMetamask={userHasMetamask}
        />
        {userHasMetamask && (
          <AccountInfo
            {...user}
            userHasMetamask={userHasMetamask}
          />
        )}
    </div>
    {userHasMetamask && (
      <Address
        {...user}
        userHasMetamask={userHasMetamask}
      />
    )}
  </div>
)};

export default AppHeader;

AppHeader.propTypes = {
  prices: PropTypes.shape({ params: PropTypes.object }).isRequired,
  user: PropTypes.shape({ params: PropTypes.object }).isRequired,
  userHasMetamask: PropTypes.bool.isRequired,
};
