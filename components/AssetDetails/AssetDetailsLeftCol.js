import styled from 'styled-components';
import {
  Col,
} from 'antd';

const AssetDetailsLeftCol = styled(Col)`
  ${({theme}) => theme.tablet`
    padding-right: 10px;
  `}
}`

export default AssetDetailsLeftCol;

