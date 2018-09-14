import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';
import { USD_MYB_SYMBOL } from '../constants';

const ExchangeRate = ({ mybitPrice }) => (
  <div className="AppHeader__rate-container">
    {!mybitPrice && (
      <Loading
        className="AppHeader__exchange-rate--is-loading"
        small
        withOverlay={false}
      />
    )}

    <div className="AppHeader__exchange-rate">
      <p className="AppHeader__tokenprice-label">MYB TOKEN PRICE</p>
      {mybitPrice && `$${mybitPrice}`} <span> {USD_MYB_SYMBOL}</span>
    </div>
  </div>
);

ExchangeRate.defaultProps = {
  mybitPrice: undefined,
};

ExchangeRate.propTypes = {
  mybitPrice: PropTypes.number,
};

export default ExchangeRate;
