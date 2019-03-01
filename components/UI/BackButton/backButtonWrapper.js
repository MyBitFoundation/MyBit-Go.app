import styled from 'styled-components';

const BackButtonWrapper = styled.span`
  display: none;

  ${({theme}) => theme.tablet`
    display: block;
  `}
}`

export default BackButtonWrapper;
