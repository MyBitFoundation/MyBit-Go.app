import styled, { css } from 'styled-components';

const StyledBalancedInfo = styled.span`
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-top: 5px;

  & svg:nth-child(3){
    margin-left: 5px;
  }

  & span{
    margin: 0px 5px;
  }

  ${props => !props.isMobile && css`
    ${({theme}) => theme.tablet`
      div {
        display: flex;
        align-items: center;
      }
    `}
  `}

  ${props => props.isMobile && css`
    flex-direction: column;
    margin-top: 10px;
    align-items: baseline;
    font-size: 16px;

    svg{
      width: 16px;
      height: 16px;
      position: relative;
      top: 2px;

      g{
        fill: black;
      }
    }

    div:nth-child(1){
      margin-bottom: 10px;
    }
  `}
}`

export default StyledBalancedInfo;
