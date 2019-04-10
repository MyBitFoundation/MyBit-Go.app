import styled from 'styled-components';
import {
  Pagination as PaginationAnt,
} from 'antd';

const Pagination = styled(PaginationAnt)`
  position: relative;
  top: 100%;

  @media(min-width: 768px){
    left: 10px;
  }
}`

export default Pagination;
