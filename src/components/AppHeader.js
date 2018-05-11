import React from 'react';
import PropTypes from 'prop-types';
import '../styles/AppHeader.css';
import Logo from './Logo';
import ExchangeRate from './ExchangeRate';
import AccountInfo from './AccountInfo';

const AppHeader = ({
  exchangeRate,
  myBitBalance,
  ethBalance,
  address,
}) => (
  <div className="grid AppHeader">
    <Logo className="AppHeader__logo" />
    <ExchangeRate value={exchangeRate} />
    <AccountInfo
      myBitBalance={myBitBalance}
      ethBalance={ethBalance}
      address={address}
    />
  </div>
);

AppHeader.propTypes = {
  exchangeRate: PropTypes.number.isRequired,
  myBitBalance: PropTypes.number.isRequired,
  ethBalance: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
};

export default AppHeader;
