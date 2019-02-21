import React from 'react';
import PropTypes from 'prop-types';
import EthIcon from 'static/eth-icon-small.svg';
import MybitIcon from 'static/mybit-small.svg';
import Spin from 'static/spin.svg';
import StyledAccountInfo from './styledAccountInfo';
import StyledBalance from './styledBalance';
import StyledBalanceHeader from './styledBalanceHeader';
import StyledBalanceInfo from './styledBalanceInfo';
import StyledSpin from './styledSpin';

const Balance = ({
  myBitBalance,
  ethBalance,
  isMobile,
  noInfo,
}) => {
  if(noInfo){
    myBitBalance = 0;
    ethBalance = 0;
  }
  return (
    <StyledBalance>
      {!isMobile && (
        <StyledBalanceHeader>ACCOUNT BALANCE</StyledBalanceHeader>
      )}
      {(!ethBalance || !myBitBalance) && !noInfo ? (
        <StyledSpin>
          <Spin />
        </StyledSpin>
      ) : (
        <StyledBalanceInfo
          isMobile={isMobile}
        >
          <div>
            <MybitIcon />
            <span>
              <b>
                {parseFloat(Number(myBitBalance).toFixed(4)).toLocaleString()}
              </b>
              {' '} MYB
            </span>
          </div>
          <div>
            <EthIcon />
            <span>
              <b>
                {parseFloat(Number(ethBalance).toFixed(4)).toLocaleString()}
              </b>
              {' '} ETH
            </span>
          </div>
        </StyledBalanceInfo>
      )}
    </StyledBalance>
)};

Balance.defaultProps = {
  myBitBalance: '',
  ethBalance: '',
  noInfo: false,
  isMobile: false,
};

Balance.propTypes = {
  myBitBalance: PropTypes.string,
  ethBalance: PropTypes.string,
  noInfo: PropTypes.boolean,
  isMobile: PropTypes.boolean,
};

export default React.memo(Balance);
