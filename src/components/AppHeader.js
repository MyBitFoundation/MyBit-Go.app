import React from 'react';
import '../styles/AppHeader.css';
import { Logo } from './Logo';
import { ExchangeRate } from './ExchangeRate';
import { AccountInfo } from './AccountInfo';

export const AppHeader = ({
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
