import styled, { css } from 'styled-components';

const StyledOnboardingList = styled.ul`
  margin-top: 20px;
  padding: 0px;
  list-style: none;

  & li{
    font-weight: normal;
    width: 90%;
    font-size: 18px;
    position: relative;
    line-height: 34px;
    margin: 0px 0px 0px 18px;

    @media(max-width: 600px) {
      font-size: 16px;
      line-height: 28px;
    }

    &::before {
      content: "•";
      font-size: 28px;
      position: absolute;
      top: 0px;
      left: -18px;
      color: #1890ff;
    }
  }

  ${props => props.isSmall && css`
    margin-top: 36px;
    padding: 0px;

    & li{
      width: 85%;
      line-height: 19px;
      margin: 16px 0px 16px 18px;
    }
  `}

  ${props => props.isSecurity && css`
    margin-top: 25px;
    padding: 0px;

    & li{
      width: 85%;
      font-size: 18px;
      line-height: normal;
      margin: 16px 0px 16px 18px;

      &::before {
        top: -6px;
      }
    }
  `}
}`

export default StyledOnboardingList;
