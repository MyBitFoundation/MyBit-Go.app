import styled, { css } from 'styled-components';

const StyledContributionPopupAmount = styled.span`
  position: absolute;
  right: 20px;
  font-size: 15px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.65);

  ${props => props.hasMobileFix && css`
    @media(max-width: 600px){
      text-align: right;
    }
  `}
}`

export default StyledContributionPopupAmount;
