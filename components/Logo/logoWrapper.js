import styled from 'styled-components';

const LogoWrapper = styled.div`
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

export default LogoWrapper;
