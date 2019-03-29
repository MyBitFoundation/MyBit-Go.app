import styled from 'styled-components';
import {
  Col,
} from 'antd';

const ManageAssetSection = styled(Col)`
  ${props => props.hasShadow && css`
    ${({theme}) => theme.tablet`
      border-radius: 4px;
      box-shadow: 0 4px 12px 0 rgba(0,0,0,0.1);
    `}
  `}
}`

export default ManageAssetSection;

