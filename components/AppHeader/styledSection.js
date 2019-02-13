import styled, { css } from 'styled-components';

const StyledSection = styled.div`
  height: 100%;
  display: flex;
  padding-top: 25px;
  display: none;

  ${({theme}) => theme.tablet`
    display: block;
  `}

  ${props => props.noPadding && css`
    padding-top: 0px;
  `}

  ${props => props.isAddress && css`
    ${({theme}) => theme.tablet`
      position: absolute;
      right: 40px;
    `}
    @media(min-width: 769px){
      position: relative;
      right: 0px;
    }
  `}
}`

export default StyledSection;
