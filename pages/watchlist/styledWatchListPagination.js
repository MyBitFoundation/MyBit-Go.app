import styled from 'styled-components';
import Pagination from 'antd/lib/pagination';
import 'antd/lib/pagination/style/index.css';

const StyledWatchListPagination = styled(Pagination)`
  position: absolute;
  top: 100%;

  @media(min-width: 768px){
    left: 10px;
  }
}`

export default StyledWatchListPagination;
