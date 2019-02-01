import styled, { css } from 'styled-components';

const StyledContributionPopup = styled.span`
  height: 513px;
  width: 348px;
  background-color: #ffffff;

  ${props => props.transactionStatus === 1 && css`
    .ant-modal-footer{
      div {
        button:first-of-type{
          display: none;
        }
      }
  `}

  a:focus{
    text-decoration: none;
  }
}`

export default StyledContributionPopup;
