import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';
import { USD_MYB_SYMBOL } from '../constants';

const ExchangeRate = ({ mybitPrice }) => (
  <div>
    {!mybitPrice && (
      <Loading
        className="AppHeader__exchange-rate--is-loading"
        small
        withOverlay={false}
      />
    )}
    <span className="AppHeader__exchange-rate">
      {mybitPrice && `$${mybitPrice}`}
      <b>{USD_MYB_SYMBOL}</b>
    </span>
  </div>
);

ExchangeRate.defaultProps = {
  mybitPrice: undefined,
};

ExchangeRate.propTypes = {
  mybitPrice: PropTypes.number,
};

export default ExchangeRate;
