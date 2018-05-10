import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';
import Jazzicon from 'react-jazzicon';
import '../styles/Address.css';

const Address = ({ address }) => (
  <div className="Address">
    {!address ? (
      <div>
        <Loading className="Address--is-loading" small withOverlay={false} />
        <span className="Address__loading-message">Loading account</span>
      </div>
      ) : (
        <div>
          <Jazzicon diameter={39} seed={Math.random(100).toString()} />
          <p className="Address__text">{address}</p>
        </div>
      )}
  </div>
);

Address.propTypes = {
  address: PropTypes.string.isRequired,
};

export default Address;
