import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';
import Address from './Address';
import '../styles/AccountInfo.css';

const AccountInfo = ({ myBitBalance, ethBalance, address }) => (
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

AccountInfo.propTypes = {
  myBitBalance: PropTypes.number.isRequired,
  ethBalance: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
};

export default AccountInfo;
