import styled from 'styled-components';
import {
  Pagination,
} from 'antd';

const WatchListPagination = styled(Pagination)`
  position: absolute;
  top: 100%;

  @media(min-width: 768px){
    left: 10px;
  }
}`

export default WatchListPagination;
