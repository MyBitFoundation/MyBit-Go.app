import styled, { css } from 'styled-components';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

const StyledAssetManagerSlideButton = styled(Button)`
  ${props => props.isContinue && css`
    min-width: 154px;
    font-weight: 500;
    float: right;
  `}

  ${props => props.isBack && css`
    font-weight: 500;
    float: left;
  `}

  ${props => props.isCentered && css`
    min-width: 154px;
    font-weight: 500;
  `}

}`

export default StyledAssetManagerSlideButton;
