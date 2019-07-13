import styled from 'styled-components';

const AppHeaderAddress = styled.div`
  display: none;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #FFFFFF;

  ${({theme}) => theme.tablet`
    display: flex;
  `}

  > span{
    text-transform: capitalize;
  }

  > span:nth-child(1){
    :before {
      content: ' ';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #24F281;
      margin-left: 2px;
      margin-right: 7px;
      position: relative;
      top: -1px;
    }
  }

  div{
    background: #FFFFFF;
    opacity: 0.2;
    width: 1px;
    height: 24px;
    display: inline-block;
    margin: 0px 5px;
  }
}`

export default AppHeaderAddress;
