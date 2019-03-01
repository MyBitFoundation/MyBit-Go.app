import styled from 'styled-components';
import {
  Button,
} from 'antd';

const BackButtonWrapper = styled(Button)`
  display: none;

  ${({theme}) => theme.tablet`
    display: block;
  `}
}`

export default BackButtonWrapper;
