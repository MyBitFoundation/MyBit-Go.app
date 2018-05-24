import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';
import Jazzicon from 'react-jazzicon';
import '../styles/Address.css';

const Address = ({ userName, className }) => (
  <div className={className}>
    {!userName ? (
      <div>
        <Loading className="Address--is-loading" small withOverlay={false} />
        <span className="Address__loading-message">Loading account</span>
      </div>
      ) : (
        <div>
          <Jazzicon diameter={39} seed={Math.random(100).toString()} />
          <p className="Address__text">{userName}</p>
        </div>
      )}
  </div>
);

Address.defaultProps = {
  userName: undefined,
};

Address.propTypes = {
  userName: PropTypes.string,
  className: PropTypes.string.isRequired,
};

export default Address;
