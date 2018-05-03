import React from 'react';
import { Loading } from 'carbon-components-react';
import { Address } from './Address';
import '../styles/AccountInfo.css';

export const AccountInfo = ({ myBitBalance, ethBalance, address }) => {
  return (
    <div className="AccountInfo">
      <div className="AccountInfo__balance">
        <b className="AccountInfo__balance-header">Balance</b>
        {!ethBalance || !myBitBalance ? (
          <Loading
            className="AccountInfo__balance--is-loading"
            small
            withOverlay={false}
          />
        ) : (
          <span className="AccountInfo__balance-info">
            {myBitBalance} <b className="AccountInfo__balance-myb">MYB</b>
            {ethBalance} <b>ETH</b>
          </span>
        )}
      </div>
      <Address className="AccountInfo__address" address={address} />
    </div>
  );
};
