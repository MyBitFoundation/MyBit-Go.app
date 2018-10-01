import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';

const ExchangeRate = ({ price, priceChangePercentage }) => (
  <div className="AppHeader__rate-container">
    <div className="AppHeader__exchange-rate">
      <p className="AppHeader__tokenprice-label">MYB TOKEN PRICE</p>
      {price ? <b>{`$${price}`} <span className={priceChangePercentage < 0 && 'AppHeader__tokenprice-label--is-red'}>({priceChangePercentage > 0 ? `+ ${priceChangePercentage}` : priceChangePercentage}%)</span></b>
      :
      <Loading
        className="AppHeader__exchange-rate--is-loading"
        small
        withOverlay={false}
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
  price: PropTypes.string,
  priceChangePercentage: PropTypes.number,
};

export default ExchangeRate;
