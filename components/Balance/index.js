import React from 'react';
import PropTypes from 'prop-types';
import Spin from 'static/spin.svg';
import StyledSpin from './styledSpin';
import BalanceLabel from './balanceLabel';
import BalanceAmount from './balanceAmount';

const Balance = (props) => {
  const {
    balance,
    isMobile,
    noInfo,
  } = props;
  return (
    <div>
      {!balance && !noInfo ? (
        <StyledSpin>
          <Spin />
        </StyledSpin>
      ) : (
        <div>
          <BalanceLabel
            isMobile={isMobile}
          >
            Account Balance:{' '}
          </BalanceLabel>
          <BalanceAmount
            isMobile={isMobile}
          >
            {balance > 0 ? '~' : ''} {balance} {' '} DAI
          </BalanceAmount>
        </div>
      )}
    </div>
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
