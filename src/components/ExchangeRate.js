import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';
import { USD_MYB_SYMBOL } from '../constants';

const ExchangeRate = ({ value }) => (
  <div>
    {!value && (
    <Loading
      className="AppHeader__exchange-rate--is-loading"
      small
      withOverlay={false}
    />
      )}
    <span className="AppHeader__exchange-rate">
      {value && `$${value}`}
      <b>{USD_MYB_SYMBOL}</b>
    </span>
  </div>
);

ExchangeRate.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ExchangeRate;
