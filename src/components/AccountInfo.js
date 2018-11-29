import React from 'react';
import PropTypes from 'prop-types';

import '../styles/AccountInfo.css';
import EthIcon from '../images/eth-icon-small.svg';
import MybitIcon from '../images/mybit-small.svg';
import Spin from '../images/spin.svg';

const AccountInfo = ({ myBitBalance, ethBalance }) => (
  <div className="AccountInfo">
    <div className="AccountInfo__balance">
      <p className="AccountInfo__balance-header">ACCOUNT BALANCE</p>
      {!ethBalance || !myBitBalance ? (
        <Spin style={{ margin: '0 auto', width: '32px', height: '32px' }} className="AccountInfo__loader" />
      ) : (
        <span className="AccountInfo__balance-info">
          <MybitIcon />
          <span>
            <b>
              {parseFloat(Number(myBitBalance).toFixed(4)).toLocaleString()}
            </b>
            {' '} MYB
          </span>
          <EthIcon />
          <span>
            <b>
              {parseFloat(Number(ethBalance).toFixed(4)).toLocaleString()}
            </b>
            {' '} ETH
          </span>
        </span>
      )}
    </div>
  </div>
);

AccountInfo.defaultProps = {
  myBitBalance: '',
  ethBalance: '',
};

AccountInfo.propTypes = {
  myBitBalance: PropTypes.string,
  ethBalance: PropTypes.string,
};

export default AccountInfo;
