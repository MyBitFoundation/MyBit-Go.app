import styled, { css } from 'styled-components';

const StyledPageWrapper = styled.div`
  padding: 0px 20px;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 25px;
  position: relative;

  ${({theme}) => theme.tablet`
    margin-bottom: 50px;
    min-height: 600px;
  `}

  ${({theme}) => theme.laptop`
    padding: 0px 40px;
  `}

  ${props => props.isFullScreenPage && css`
    margin-top: 0px;
    padding: 0px;
  `}
}`

export default StyledPageWrapper;
