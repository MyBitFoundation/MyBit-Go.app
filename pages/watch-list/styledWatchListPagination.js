import styled from 'styled-components';
import {
  Pagination,
} from 'antd';

const StyledWatchListPagination = styled(Pagination)`
  position: absolute;
  top: 100%;

  @media(min-width: 768px){
    left: 10px;
  }
}`

export default StyledWatchListPagination;
