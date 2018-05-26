import React from 'react';
import PropTypes from 'prop-types';
import '../styles/AppHeader.css';
import Logo from './Logo';
import ExchangeRate from './ExchangeRate';
import AccountInfo from './AccountInfo';

const AppHeader = ({
  state,
}) => (
  <div className="grid AppHeader">
    <Logo className="AppHeader__logo" />
    <ExchangeRate value={state.misc.currentMybitInUsd} />
    <AccountInfo
      myBitBalance={state.user.myBitBalance}
      ethBalance={state.user.ethBalance}
      userName={state.user.userName}
    />
  </div>
);

AppHeader.propTypes = {
  state: PropTypes.shape({ params: PropTypes.object }).isRequired,
};

export default AppHeader;
