import styled, { css } from 'styled-components';
import {
  Button,
} from 'antd';

const AssetFundingButton = styled(Button)`
  width: 100%;
  height: 48px;
  font-weight: 500;
  line-height: 48px !important;

  ${props => props.type === 'default' && css`
     border: 1px solid ${({theme}) => theme.colors.red} !important;
     background-color: #FFFFFF !important;
     color: ${({theme}) => theme.colors.black2} !important;
  `}
}`

export default AssetFundingButton;
