import styled, { css } from 'styled-components';

export const StyledCarouselSlideMainTitle = styled.h1`
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 40px;
  margin: 20px 0px;

  @media(max-width: 600px) {
    font-size: 34px;
    line-height: 38px;
  }

  ${props => props.isLong && css`
    font-size: 35px;
    line-height: 40px;
    font-weight: bold;
    font-style: normal;
  `}

  ${props => props.isSmallMobile && css`
    @media(max-width: 321px){
      font-size: 26px;
      line-height: 30px;
    }

    @media(max-width: 376px){
      font-size: 26px;
      line-height: 30px;
    }
  `}

  ${props => props.isBlue && css`
    color: '#1890ff';
  `}

  ${props => props.isRed && css`
    color: 'red';
  `}
}`
