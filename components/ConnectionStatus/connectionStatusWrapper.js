import styled, { css } from 'styled-components';

const ConnectionStatusWrapper = styled.div`
  position: relative;
  padding-left: 15px;

  :before{
    content: ' ';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #24F281;
    position: absolute;
    left: 0px;
    top: 7px;
  }

  ${props => !props.connected && css`
    :before{
      background-color: red;
    }
  `}
}`

export default ConnectionStatusWrapper;
