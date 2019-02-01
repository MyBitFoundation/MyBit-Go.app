import React from 'react';
import PropTypes from 'prop-types';
import EthIcon from '../../static/eth-icon-small.svg';
import MybitIcon from '../../static/mybit-small.svg';
import Spin from '../../static/spin.svg';
import StyledAccountInfo from './styledAccountInfo';
import StyledBalance from './styledBalance';
import StyledBalanceHeader from './styledBalanceHeader';
import StyledBalanceInfo from './styledBalanceInfo';
import StyledSpin from './styledSpin';

const Balance = ({ myBitBalance, ethBalance }) => (
    <StyledBalance>
      <StyledBalanceHeader>ACCOUNT BALANCE</StyledBalanceHeader>
      {!ethBalance || !myBitBalance ? (
        <StyledSpin>
          <Spin />
        </StyledSpin>
      ) : (
        <StyledBalanceInfo>
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
        </StyledBalanceInfo>
      )}
    </StyledBalance>
);

Balance.defaultProps = {
  myBitBalance: '',
  ethBalance: '',
};

Balance.propTypes = {
  myBitBalance: PropTypes.string,
  ethBalance: PropTypes.string,
};

export default Balance;
