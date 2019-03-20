import styled from 'styled-components';
import {
  Col,
} from 'antd';

const StyledAssetDetailsLeftCol = styled(Col)`
  ${({theme}) => theme.tablet`
    padding-right: 10px;
  `}
}`

export default StyledAssetDetailsLeftCol;

