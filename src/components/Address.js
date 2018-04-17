import React from 'react';
import { Loading } from 'carbon-components-react';
import Jazzicon from 'react-jazzicon';
import '../styles/Address.css';

export const Address = ({ address }) => {
  return (
    <div className="Address">
      {!address ? (
        <div>
          <Loading className="Address--is-loading" small withOverlay={false} />
          <span className="Address__text--is-loading">Loading account</span>
        </div>
      ) : (
        <div>
          <Jazzicon diameter={39} seed={Math.random(100).toString()} />
          <p className="Address__value">{address}</p>
        </div>
      )}
    </div>
  );
};
