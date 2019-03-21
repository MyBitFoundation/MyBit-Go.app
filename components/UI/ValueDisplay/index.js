import React from 'react';
import ValueDisplayWrapper from './valueDisplayWrapper';
import ValueDisplayIcon from './valueDisplayIcon';
import ValueDisplaySeparator from './valueDisplaySeparator';
import ValueDisplayValue from './valueDisplayValue';

const ValueDisplay = ({
  value,
  text,
  icon,
  hasIcon,
  hasSeparator,
  hasShadow,
  customClassName,
  isBlue,
  isGreen,
  coloredBackground,
  style,
}) => (
  <div className={customClassName}>
    <ValueDisplayWrapper
      hasShadow={hasShadow}
      style={style}
    >
      {hasIcon && (
        <ValueDisplayIcon>
          {icon}
        </ValueDisplayIcon>
      )}
      {text}
      {hasSeparator && (
        <ValueDisplaySeparator />
      )}
      <div>
        <ValueDisplayValue
          isGreen={isGreen}
          isBlue={isBlue}
          coloredBackground={coloredBackground}
          hasIcon={hasIcon}
        >
          {value}
        </ValueDisplayValue>
      </div>
    </ValueDisplayWrapper>
  </div>
)

export default ValueDisplay;
