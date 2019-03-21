import styled, { css } from 'styled-components';

export const CarouselSlideParagraph = styled.p`
  font-size: 18px;
  color: #4a4a4a;
  line-height: 24px;
  line-height: normal;

  @media(max-width: 600px) {
    font-size: 16px;
    width: 100%;
  }

  ${props => props.isIntro && css`
    font-size: 20px;
    color: #4a4a4a;
    line-height: normal;
    width: 66%;
    margin: 20px 0px 15px 0px;
  `}

  ${props => props.isNoImagesSmall && css`
    font-size: 18px;
    color: #4a4a4a;
    line-height: 22px;
    width: 72%;
  `}

  ${props => props.isTitle && css`
    font-size: 18px;
    font-weight: 500;
    color: #4a4a4a;
    line-height: normal;
    width: 80%;
    margin: 0px 0px 20px 0px;
    @media(max-width: 600px) {
        width: 100%;
    }
  `}

  ${props => props.isBig && css`
    font-size: 20px;
    font-weight: 500;
    color: #4a4a4a;
    width: 80%;
    margin: 10px 0px 20px 0px;
    @media(max-width: 600px) {
        width: 100%;
    }
  `}

  ${props => props.isFullWidth && css`
    font-size: 20px;
    font-weight: 500;
    color: #4a4a4a;
    width: 100%;
    margin: 10px 0px 20px 0px;
  `}

  ${props => props.isShorter && css`
    width: 87%;

    @media(max-width: 600px) {
      width: 100%;
    }
  `}


  ${props => props.hasMarginTop && css`
    margin-top: 30px;
  `}

  ${props => props.isCentered && css`
    ${({theme}) => theme.tablet`
      text-align: center;
    `}
  `}
}`
