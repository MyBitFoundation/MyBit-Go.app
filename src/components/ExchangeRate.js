import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';

const ExchangeRate = ({ mybitPrice, mybitPriceChange }) => (
  <div className="AppHeader__rate-container">
    <div className="AppHeader__exchange-rate">
      <p className="AppHeader__tokenprice-label">MYB TOKEN PRICE</p>
      {mybitPrice ? <b>{`$${mybitPrice}`} <span>({mybitPriceChange > 0 ? `+ ${mybitPriceChange}` : mybitPriceChange}%)</span></b>
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
  mybitPrice: undefined
};

ExchangeRate.propTypes = {
  mybitPrice: PropTypes.number
};

export default ExchangeRate;
