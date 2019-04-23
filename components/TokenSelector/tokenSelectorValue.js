import styled from 'styled-components';

const TokenSelectorValue = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 1px;
  color: ${({theme}) => theme.colors.blackish};
}`

export default TokenSelectorValue;
