import React from 'react';
import PropTypes from 'prop-types';
import Spin from 'static/spin.svg';
import ExchangeRateContainer from './exchangeRateContainer';
import ExchangeRateHeader from './exchangeRateHeader';
import ExchangeRateSpin from './exchangeRateSpin';
import ExchangeRatePercentage from './exchangeRatePercentage';
import { formatMonetaryValue } from 'utils/helpers';

const ExchangeRate = ({ price, priceChangePercentage }) => {
  const isRed = priceChangePercentage < 0;
  return (
    <ExchangeRateContainer>
      <ExchangeRateHeader>MYB TOKEN PRICE</ExchangeRateHeader>
      { price ? (
        <b>
          {`${formatMonetaryValue(price, 3)}`}
          <ExchangeRatePercentage
            isRed={isRed}
          >
            {' '}({priceChangePercentage.toFixed(2)}%)
          </ExchangeRatePercentage>
        </b>
        ) : (
        <ExchangeRateSpin>
          <Spin
            style={{ width: '32px', height: '32px' }}
          />
        </ExchangeRateSpin>
      )}
    </ExchangeRateContainer>
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

export default React.memo(ExchangeRate);
