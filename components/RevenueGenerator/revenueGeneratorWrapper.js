import styled from 'styled-components';

const RevenueGeneratorWrapper = styled.div`
  display: block;
  z-index: 1000;
  position: absolute;
  top: 196px;
  left: 100%;
  transform: translate(-100%, -100%);
  padding-right: 10px;
  padding-bottom: 10px;

  svg{
    width: 2em;
    height: 2em;
    fill: white;
    :hover{
      cursor: pointer;
    }
  }
}`

export default RevenueGeneratorWrapper;
