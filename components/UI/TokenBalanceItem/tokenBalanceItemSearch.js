import styled from 'styled-components';
import {
  Input,
} from 'antd';
const Search = Input.Search;

const TokenBalanceItemSearch = styled(Search)`
  background-color: #F5F5F5;
  color: ${({theme}) => theme.colors.blackish};
}`

export default TokenBalanceItemSearch;
