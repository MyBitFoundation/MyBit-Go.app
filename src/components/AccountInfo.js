import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';
import Web3 from 'web3';

import Address from './Address';
import '../styles/AccountInfo.css';

const IS_DAPP_VERSION_ONE = true;

const AccountInfo = ({ myBitBalance, ethBalance, userName }) => {
  let myBitBalanceToRender = '0';
  if (
    !IS_DAPP_VERSION_ONE &&
    (myBitBalance !== 0 || myBitBalance !== 'undefined')
  ) {
    const myBitBalanceString = myBitBalance.toString();
    myBitBalanceToRender = Web3.utils.fromWei(myBitBalanceString, 'ether');
  }
  return (
    <div className="AccountInfo">
      <div className="AccountInfo__balance">
        <p className="AccountInfo__balance-header">ACCOUNT BALANCE</p>
        {!ethBalance || !myBitBalanceToRender ? (
          <Loading
            className="AccountInfo__balance--is-loading"
            small
            withOverlay={false}
          />
        ) : (
          <span className="AccountInfo__balance-info">
            {myBitBalanceToRender}{' '}
            <b className="AccountInfo__balance-myb">MYB</b>
            {Number(ethBalance).toFixed(4)} <b>ETH</b>
          </span>
        )}
      </div>
    </div>
  );
};

AccountInfo.defaultProps = {
  myBitBalance: '',
  ethBalance: '',
  userName: '',
};

AccountInfo.propTypes = {
  myBitBalance: PropTypes.string,
  ethBalance: PropTypes.string,
  userName: PropTypes.string,
};

export default AccountInfo;
