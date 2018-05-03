import React from 'react';
import { Loading } from 'carbon-components-react';
import Jazzicon from 'react-jazzicon';
import '../styles/Address.css';

export const Address = ({ address, className }) => {
  return (
    <div className={className}>
      <div className="Address">
        {!address ? (
          <div>
            <Loading
              className="Address--is-loading"
              small
              withOverlay={false}
            />
            <span className="Address__loading-message">Loading account</span>
          </div>
        ) : (
          <div style={{ height: '100%' }}>
            <Jazzicon diameter={39} seed={Math.random(100).toString()} />
            <p className="Address__text">{address}</p>
          </div>
        )}
      </div>
    </div>
  );
};
