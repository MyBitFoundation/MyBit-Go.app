import React from 'react';
import { Loading } from 'carbon-components-react';
import { USD_MYB_SYMBOL } from '../constants';

export const ExchangeRate = ({ value }) => {
  return (
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
};
