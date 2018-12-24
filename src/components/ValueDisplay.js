import React from 'react';

import '../styles/ValueDisplay.css';

const ValueDisplay = ({value, text, icon, hasIcon, hasSeparator, className}) => (
  <div className={`ValueDisplay ${className}`}>
    {hasIcon && (
      <span className="ValueDisplay__icon">{icon}</span>
    )}
    {text}
    {hasSeparator && (
      <div className="ValueDisplay__separator" />
    )}
    <b className="ValueDisplay__value">{value}</b>
  </div>
)

export default ValueDisplay;
