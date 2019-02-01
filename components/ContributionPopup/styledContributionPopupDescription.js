import styled, { css } from 'styled-components';

const StyledContributionPopupDescription = styled.p`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 0px;

  ${props => props.paddedTop && css`
    padding-top: 20px;
  `}

  ${props => props.hasMobileFix && css`
    @media(max-width: 600px){
      margin-top: 24px;
    }
  `}
}`

export default StyledContributionPopupDescription;
