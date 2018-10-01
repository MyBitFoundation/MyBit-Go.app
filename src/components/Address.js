import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import Jazzicon from 'react-jazzicon';
import '../styles/Address.css';

const Address = ({ userName }) => (
  <div className="Address">
    {!userName ? (
      <div className="Address__loader">
        <Spin />
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
};

Address.propTypes = {
  userName: PropTypes.string,
};

export default Address;
