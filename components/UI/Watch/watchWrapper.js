import styled, { css } from 'styled-components';

const WatchWrapper = styled.span`
  position: absolute;
  top: 15px;
  right: 16px;
  width: 22px;
  z-index: 1;
  cursor: pointer;

  svg{
    fill: ${props => props.active ? '#1890ff' : '#fff'};
  }

  svg:hover{
    fill: #40a9ff;
  }

  ${props => props.bottom && css`
    top: auto;
    bottom: 12px;
  `}
}`

export default WatchWrapper;
