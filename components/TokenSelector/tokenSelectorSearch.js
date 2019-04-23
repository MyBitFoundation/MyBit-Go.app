import styled from 'styled-components';
import {
  Input,
} from 'antd';
const Search = Input.Search;

const TokenSelectorSearch = styled(Search)`
  color: ${({theme}) => theme.colors.blackish};
  width: calc(100% - 20px);
  margin: 0 auto;
  display: block;
  margin-bottom: 10px;
  margin-top: 10px;
  input{
    background-color: #F5F5F5;
    border: none;
  }
}`

export default TokenSelectorSearch;
