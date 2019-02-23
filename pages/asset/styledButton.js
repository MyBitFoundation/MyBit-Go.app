import styled from 'styled-components';
import {
  Button,
} from 'antd';

const StyledButton = styled(Button)`
  display: none;
  margin-bottom: 40px;

  ${({theme}) => theme.tablet`
    display: block;
  `}
}`

export default StyledButton;
