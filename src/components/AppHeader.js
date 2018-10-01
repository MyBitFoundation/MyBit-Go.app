import React from 'react';
import PropTypes from 'prop-types';
import '../styles/AppHeader.css';
import Logo from './Logo';
import ExchangeRate from './ExchangeRate';
import AccountInfo from './AccountInfo';

const AppHeader = ({ user, prices }) => (
  <div className="grid AppHeader">
    <Logo className="AppHeader__logo" />
    <ExchangeRate {...prices} />
    <AccountInfo {...user} />
  </div>
);

export default AppHeader;

AppHeader.propTypes = {
  prices: PropTypes.shape({ params: PropTypes.object }).isRequired,
  user: PropTypes.shape({ params: PropTypes.object }).isRequired,
};
