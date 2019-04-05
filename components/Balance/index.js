import React from 'react';
import PropTypes from 'prop-types';
import Spin from 'static/spin.svg';
import StyledSpin from './styledSpin';
import BalanceLabel from './balanceLabel';
import BalanceAmount from './balanceAmount';
import {
  formatMonetaryValue,
} from 'utils/helpers';

const Balance = (props) => {
  const {
    balance,
    isMobile,
    noInfo,
  } = props;

  const balanceFormatted = formatMonetaryValue(balance);

  return (
    <div>
      {isNaN(balance) && !noInfo ? (
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
            {noInfo ? '0 DAI' : balance > 0 ? `~${balanceFormatted}` : balanceFormatted}
          </BalanceAmount>
        </div>
      )}
    </div>
)};

export default React.memo(Balance);
