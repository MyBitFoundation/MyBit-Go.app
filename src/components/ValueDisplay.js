import React from 'react';
import classnames from 'classnames';

import '../styles/ValueDisplay.css';

const ValueDisplay = ({value, text, icon, hasIcon, hasSeparator, hasShadow, className, isBlue, isGreen}) => (
  <div className={classnames({
    ValueDisplay: true,
    'ValueDisplay--has-shadow': hasShadow,
  })}>
    {hasIcon && (
      <span className="ValueDisplay__icon">{icon}</span>
    )}
    {text}
    {hasSeparator && (
      <div className="ValueDisplay__separator" />
    )}
    <b className={classnames({
      'ValueDisplay__value': true,
      'ValueDisplay__value--is-green': isGreen,
      'ValueDisplay__value--is-blue': isBlue,
    })}>{value}</b>
  </div>
)

export default ValueDisplay;
