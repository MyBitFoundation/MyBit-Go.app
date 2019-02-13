import styled from 'styled-components';

const StyledLogo = styled.div`
  svg:nth-child(1){
    display: none;
  }

  ${({theme}) => theme.tablet`
    svg:nth-child(1){
      display: block;
    }
    svg:nth-child(2){
      display: none;
    }
  `}
}`

export default StyledLogo;
