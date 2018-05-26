import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';
import Address from './Address';
import '../styles/AccountInfo.css';

const AccountInfo = ({ myBitBalance, ethBalance, userName }) => (
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
    <Address className="AccountInfo__address" userName={userName} />
  </div>
);

AccountInfo.defaultProps = {
  myBitBalance: undefined,
  ethBalance: undefined,
  userName: undefined,
};

AccountInfo.propTypes = {
  myBitBalance: PropTypes.number,
  ethBalance: PropTypes.number,
  userName: PropTypes.string,
};

export default AccountInfo;
