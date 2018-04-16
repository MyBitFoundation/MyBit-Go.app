import React from 'react';
import { Loading } from 'carbon-components-react';
import Jazzicon from 'react-jazzicon';

export const Address = ({ address }) => {
  return (
    <div className="AppHeader__address">
      {!address ? (
        <div>
          <Loading
            className="AppHeader__address--is-loading"
            small
            withOverlay={false}
          />
          <span className="AppHeader_address--is-loading-text">
            Loading account
          </span>
        </div>
      ) : (
        <div>
          <Jazzicon diameter={39} seed={Math.random(100).toString()} />
          <p className="AppHeader__address-value">{address}</p>
        </div>
      )}
    </div>
  );
};
