import styled, { css } from 'styled-components';
import Button from 'antd/lib/button';
import {omit} from 'lodash';

const CarouselWithNavigationButton = styled(props => <Button {...omit(props, CarouselWithNavigationButton.OmitProps)}/>)`
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

CarouselWithNavigationButton.OmitProps = [
  'isCivicButton',
  'desktopAt',
  'isNext',
  'isBack',
]

export default CarouselWithNavigationButton;
