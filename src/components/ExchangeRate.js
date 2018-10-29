import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { formatMonetaryValue } from '../util/helpers';

const ExchangeRate = ({ price, priceChangePercentage }) => (
  <div className="AppHeader__rate-container">
    <div className="AppHeader__exchange-rate">
      <p className="AppHeader__tokenprice-label">MYB TOKEN PRICE</p>
      {price ? <b>{`${formatMonetaryValue(price, 3)}`} <span className={priceChangePercentage < 0 ? 'AppHeader__tokenprice-label--is-red' : undefined}>({priceChangePercentage > 0 ? `+ ${priceChangePercentage}` : priceChangePercentage}%)</span></b>
      :
      <Spin
        className="AppHeader__exchange-rate--is-loading"
      />
      }
    </div>
  </div>
);

ExchangeRate.defaultProps = {
  price: undefined,
  priceChangePercentage: undefined,
};

ExchangeRate.propTypes = {
  price: PropTypes.number,
  priceChangePercentage: PropTypes.number,
};

export default ExchangeRate;
