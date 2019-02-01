import React from 'react';
import classnames from 'classnames';
import StyledValueDisplay from './styledValueDisplay';
import StyledValueDisplayIcon from './styledValueDisplayIcon';
import StyledValueDisplaySeparator from './styledValueDisplaySeparator';
import StyledValueDisplayValue from './styledValueDisplayValue';

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
    <StyledValueDisplay
      hasShadow={hasShadow}
      style={style}
    >
      {hasIcon && (
        <StyledValueDisplayIcon>
          {icon}
        </StyledValueDisplayIcon>
      )}
      {text}
      {hasSeparator && (
        <StyledValueDisplaySeparator />
      )}
      <div>
        <StyledValueDisplayValue
          isGreen={isGreen}
          isBlue={isBlue}
          coloredBackground={coloredBackground}
          hasIcon={hasIcon}
        >
          {value}
        </StyledValueDisplayValue>
      </div>
    </StyledValueDisplay>
  </div>
)

export default ValueDisplay;
