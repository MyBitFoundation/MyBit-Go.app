import styled from 'styled-components';

const PortfolioPageNavButtons = styled.div`
  position: relative;
  margin-right: 0px;
  right: 0px;
  margin-bottom: 20px;

  ${({theme}) => theme.tablet`
    position: absolute;
    right: 35px;
    top: 0px;
    margin-top: 0px !important;
  `}

  ${({theme}) => theme.laptop`
    right: 55px;
  `}
}`

export default PortfolioPageNavButtons;
