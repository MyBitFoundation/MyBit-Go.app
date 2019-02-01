import styled, { css } from 'styled-components';

const StyledContributionPopupEthAmount = styled.span`
  margin-left: 10px;
  font-weight: 500;

  ${props => props.hasMobileFix && css`
    @media(max-width: 600px){
      display: block;
    }
  `}
}`

export default StyledContributionPopupEthAmount;
