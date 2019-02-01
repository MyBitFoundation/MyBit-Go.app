import styled, { css } from 'styled-components';

const StyledHelpPageButton = styled.a`
  ${props => props.isTelegram && css`
    background-image: linear-gradient(79deg, #001358, #125ac4);
    border-radius: 4px;

    button{
      background-color: transparent;
      border-color: transparent;

      &:hover{
        background-color: transparent;
        border-color: transparent;
      }
    }

    .anticon{
      margin: 0px 3px;
      position: relative;
      left: 8px;
      top: 1px;

      svg{
        fill: white;
      }
    }
  `}
}`

export default StyledHelpPageButton;
