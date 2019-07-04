import styled, { css } from 'styled-components';

const ValueDisplayValue = styled.b`
  padding: 7px;
  border-radius: 4px;
  font-size: 16px;

  ${props => props.isGreen && css`
    color: ${({theme}) => theme.colors.green};
    ${props => props.coloredBackground && css`
      background-color: #F6FFED;
    `}
  `}

  ${props => props.isBlue && css`
    color: #1890FF;
    ${props => props.coloredBackground && css`
      background-color: rgba(24, 144, 255, 0.1);
    `}
  `}

  ${props => !props.hasIcon && css`
    margin-left: 5px;
  `}
}`

export default ValueDisplayValue;
