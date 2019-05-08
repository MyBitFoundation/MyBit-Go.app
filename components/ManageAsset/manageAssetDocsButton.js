import styled, { css } from 'styled-components';
import {
  Button,
} from 'antd';

const ManageAssetDocsButton = styled(Button)`
  ${props => props.selected && css`
    color: #40a9ff;
    background-color: #fff;
    border-color: #40a9ff;
  `}
}`

export default ManageAssetDocsButton;
