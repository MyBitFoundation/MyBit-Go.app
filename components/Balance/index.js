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

const Balance = (props) => {
  const {
    myb,
    ether,
    isMobile,
    noInfo,
  } = props;

  return (
    <StyledBalance>
      {isMobile === false && (
        <StyledBalanceHeader>ACCOUNT BALANCE</StyledBalanceHeader>
      )}
      {(!ether || !myb) && !noInfo ? (
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
                {parseFloat(Number(myb).toFixed(4)).toLocaleString()}
              </b>
              {' '} MYB
            </span>
          </div>
          <div>
            <EthIcon />
            <span>
              <b>
                {parseFloat(Number(ether).toFixed(4)).toLocaleString()}
              </b>
              {' '} ETH
            </span>
          </div>
        </StyledBalanceInfo>
      )}
    </StyledBalance>
)};

Balance.defaultProps = {
  myb: '',
  ether: '',
  noInfo: false,
  isMobile: false,
};

Balance.propTypes = {
  myb: PropTypes.string,
  ether: PropTypes.string,
  noInfo: PropTypes.boolean,
  isMobile: PropTypes.boolean,
};

export default React.memo(Balance);
