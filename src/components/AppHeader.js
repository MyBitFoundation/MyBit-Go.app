import React from 'react';
import PropTypes from 'prop-types';

import '../styles/AppHeader.css';
import Logo from './Logo';
import ExchangeRate from './ExchangeRate';
import AccountInfo from './AccountInfo';
import Address from './Address';
import Bancor from './Bancor';

const AppHeader = ({ user, prices }) => (
  <div className="AppHeader">
    <div className="AppHeader__logo-and-info">
      <Logo className="AppHeader__logo" />
      <ExchangeRate {...prices} />
      {/* <Bancor /> */}
      <AccountInfo {...user} />
    </div>
    <Address {...user} />
  </div>
);

export default AppHeader;

AppHeader.propTypes = {
  prices: PropTypes.shape({ params: PropTypes.object }).isRequired,
  user: PropTypes.shape({ params: PropTypes.object }).isRequired,
};
