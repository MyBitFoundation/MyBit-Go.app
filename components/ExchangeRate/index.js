import React from 'react';
import PropTypes from 'prop-types';
import { formatMonetaryValue } from '../../utils/helpers';
import Spin from '../../static/spin.svg';
import StyledExchangeRate from './styledExchangeRate';
import StyledLabel from './styledLabel';
import StyledSpin from './styledSpin';
import StyledPercentage from './styledPercentage';

const ExchangeRate = ({ price, priceChangePercentage }) => {
  const isRed = priceChangePercentage < 0;
  return (
    <StyledExchangeRate>
      <StyledLabel>MYB TOKEN PRICE</StyledLabel>
      { price ? (
        <b>
          {`${formatMonetaryValue(price, 3)}`}
          <StyledPercentage
            isRed={isRed}
          >
            {' '}({priceChangePercentage}%)
          </StyledPercentage>
        </b>
        ) : (
        <StyledSpin>
          <Spin
            style={{ width: '32px', height: '32px' }}
          />
        </StyledSpin>
      )}
    </StyledExchangeRate>
  )
};

ExchangeRate.defaultProps = {
  price: undefined,
  priceChangePercentage: undefined,
};

ExchangeRate.propTypes = {
  price: PropTypes.number,
  priceChangePercentage: PropTypes.number,
};

export default ExchangeRate;
