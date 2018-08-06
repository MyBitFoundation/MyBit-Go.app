import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CirclesBackgroundWrapper.css';

const CirclesBackgroundWrapper = ({ children }) => (
  <div>
    <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    <div className="CirclesBackgroundWrapper">
      <div className="CirclesBackgroundWrapper__circle--is-right" />
      <div className="CirclesBackgroundWrapper__circle--is-left" />
    </div>
  </div>
);

CirclesBackgroundWrapper.propTypes = {
  children: PropTypes.element.isRequired
};

export default CirclesBackgroundWrapper;
