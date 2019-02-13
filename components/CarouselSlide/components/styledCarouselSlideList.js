import styled, { css } from 'styled-components';

export const StyledCarouselSlideList = styled.ul`
  padding: 0px;
  list-style: none;

  & li{
    font-weight: normal;
    font-size: 18px;
    position: relative;
    line-height: 25px;
    margin: 0px 0px 10px 18px;

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

  ${props => props.hasDescriptions && css`
    li{
      font-weight: 500;
      margin-bottom: 0px;
    }
    p{
      font-size: 16px;
      margin-left: 18px;
    }
  `}

  @media(min-width: 600px){
    margin: 20px;

    & li{
      width: 90%;
    }
  }

  ${props => props.isSmall && css`
    padding: 0px;

    & li{
      width: 85%;
      line-height: 19px;
      margin: 16px 0px 16px 18px;
    }
  `}
}`
