import styled, { css } from 'styled-components';
import Button from 'antd/lib/button';

const CarouselWithNavigationButton = styled(Button)`
  font-style: normal;
  font-weight: normal;

  @media(min-width: ${props => props.desktopAt || `${props.theme.sizes.tablet}px`}) {
    position: static;
  }

 ${props => props.isNext && css`
    font-weight: 500;
    line-height: 22px;
    font-size: 14px;
    position: static;
    display: block;
    height: 40px;

    &-arrow{
      padding-top: 5px;
      padding-left: 15px;
      float: right;
    }
    @media(min-width: ${props => props.desktopAt || `${props.theme.sizes.tablet}px`}) {
      position: absolute !important;
      bottom: 20px;
      right: 20px;
      height: 32px;
    }
  `}

  ${props => props.isSkip && css`{
    border: none;
    color: #1890ff;
    line-height: 22px;
    font-size: 14px;
    margin-right: 10px;
    @media(min-width: ${props => props.desktopAt || `${props.theme.sizes.tablet}px`}) {
      position: static;
      display: block;
      margin: 10px auto;
    }
  `}

  ${props => props.isBack && css`{
    line-height: 22px;
    font-size: 14px;
    position: static;
    display: block;
    height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    color: color: rgba(0, 0, 0, 0.65);
    @media(min-width: ${props => props.desktopAt || `${props.theme.sizes.tablet}px`}) {
      position: absolute;
      bottom: 20px;
      left: -20px;
      height: 32px;
    }
  `}

  ${props => props.isGet && css`{
    border: none;
    text-decoration: underline;
    color: #1890ff;
    display: inline-block;
    margin-left: 5px;
    font-size: 18px;
  `}

  ${props => props.isStatic && css`{
    position: relative;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
  `}

  ${props => props.isCivicButton && css `
    border-color: rgb(58, 176, 62);
    background-color: rgb(58, 176, 62);

    &::after{
      content: '';
      position: absolute;
      top: 16px;
      left: calc(100% - 20px);
      width: 25px;
      height: 25px;
      background: url(static/list-asset/civic.svg);
      display: block;
      background-repeat: no-repeat;
      transform: translate(-100%,0%);

      ${({theme}) => theme.tablet`
        top: 3px;
        left: calc(100% - 5px);
      `}
    }

    .anticon{
      visibility: hidden;
    }

    &:hover{
      border-color: rgb(0, 140, 4);
      background-color: rgb(0, 140, 4);
    }
  `}
`

export default CarouselWithNavigationButton;
