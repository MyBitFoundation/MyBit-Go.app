import styled, { css } from 'styled-components';

const StyledOnboardingColoredSpan = styled.span`
  ${props => props.isBlue && css`
    color: rgb(24, 144, 255);
  `}

  ${props => props.isRed && css`
    color: red;
  `}
}`

export default StyledOnboardingColoredSpan;
