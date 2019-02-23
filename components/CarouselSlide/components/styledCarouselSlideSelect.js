import styled from 'styled-components';
import {
  Select,
} from 'antd';

export const StyledCarouselSlideSelect = styled(Select)`
  width: 100%;

  ${({theme}) => theme.tablet`
    width: 80%;
  `}

  ${props => props.isCentered && `
    margin: 0 auto;
    display: block;
  `}

  margin-bottom: 20px;
`
