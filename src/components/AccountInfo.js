import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';
import Web3 from 'web3';

import '../styles/AccountInfo.css';
import EthIcon from '../images/eth-icon-small.svg';
import MybitIcon from '../images/mybit-small.svg';

const IS_DAPP_VERSION_ONE = true;

const AccountInfo = ({ myBitBalance, ethBalance }) => {
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
            <MybitIcon /><span><b>{myBitBalanceToRender}</b> MYB</span>{' '}
            <EthIcon /><span><b>{Number(ethBalance).toFixed(4)}</b> ETH</span>
          </span>
        )}
      </div>
    </div>
  );
};

AccountInfo.defaultProps = {
  myBitBalance: '',
  ethBalance: '',
};

AccountInfo.propTypes = {
  myBitBalance: PropTypes.string,
  ethBalance: PropTypes.string,
};

export default AccountInfo;
