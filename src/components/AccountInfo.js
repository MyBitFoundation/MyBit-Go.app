import React from 'react';
import { Loading } from 'carbon-components-react';
import { Address } from './Address';

export const AccountInfo = ({ myBitBalance, ethBalance, address }) => {
  return (
    <div className="AppHeader__account-info">
      <div className="AppHeader__balance">
        <b className="AppHeader__balance-header">Balance</b>
        {!ethBalance || !myBitBalance ? (
          <Loading
            className="AppHeader__balance--is-loading"
            small
            withOverlay={false}
          />
        ) : (
          <span className="AppHeader__balance-info">
            {myBitBalance} <b className="AppHeader__balance-myb">MYB</b>
            {ethBalance} <b>ETH</b>
          </span>
        )}
      </div>
      <Address address={address} />
    </div>
  );
};
