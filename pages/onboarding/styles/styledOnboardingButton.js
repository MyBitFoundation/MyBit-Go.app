import styled, { css } from 'styled-components';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';

const StyledOnboardingButton = styled(Button)`
  font-style: normal;
  font-weight: normal;

  @media(max-width: 600px) {
    position: static;
  }

 ${props => props.isNext && css`
    font-weight: 500;
    line-height: 22px;
    font-size: 14px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    &-arrow{
        padding-top: 5px;
        padding-left: 15px;
        float: right;
    }
    @media(max-width: 600px) {
        position: static;
        display: block;
        margin: 10px auto;
    }
  `}

  ${props => props.isSkip && css`{
    border: none;
    color: #1890ff;
    line-height: 22px;
    font-size: 14px;
    margin-right: 10px;
    @media(max-width: 600px) {
        position: static;
        display: block;
        margin: 10px auto;
    }
  `}

  ${props => props.isBack && css`{
    position: absolute;
    bottom: 20px;
    left: -20px;
    line-height: 22px;
    font-size: 14px;
    padding-left: 20px;
    padding-right: 20px;
    color: color: rgba(0, 0, 0, 0.65);
    @media(max-width: 600px) {
      position: static;
      display: block;
      margin: 10px auto;
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
`

export default StyledOnboardingButton;
