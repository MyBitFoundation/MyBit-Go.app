import React from 'react';
import PropTypes from 'prop-types';
import Jazzicon from 'react-jazzicon';
import '../styles/Address.css';
import Spin from '../images/spin.svg';

const Address = ({ userName, className }) => (
  <div className={`Address ${className}`}>
    {!userName ? (
      <div className="Address__loader">
        <Spin style={{ height: '32px', width: '32px' }} />
        <span>Loading account</span>
      </div>
    ) : (
      <div className="Address__jazz-n-hex">
        <Jazzicon diameter={39} />
        <p className="Address__text">{userName}</p>
      </div>
    )}
  </div>
);

Address.defaultProps = {
  userName: undefined,
  className: '',
};

Address.propTypes = {
  userName: PropTypes.string,
  className: PropTypes.string,
};

export default Address;
