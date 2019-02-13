import styled, { css } from 'styled-components';

const StyledNavigationBar = styled.div`
  display: none;

  a{
    text-decoration: none;
  }

  ul{
    transition: all 0.2s;
  }

  .ant-menu-item-selected svg g,
  .ant-menu-item-selected svg path{
    fill: #1890ff;
  }

  .ant-menu-item-active svg g,
  .ant-menu-item-active svg path{
    fill: #1890ff;
  }

  ${({theme}) => theme.tablet`
    display: block;
  `}

  @media (max-width: ${props => props.hideAt}) {
   ${props => !props.show && css`
    transition: all 0.2s;
    height: 0px;

    ul{
      height: 0px;
      overflow: hidden;
      transition: all 0.2s;
    }

    .ant-menu{
      border-bottom: none;
    }
  `}
  }
}`

export default StyledNavigationBar;
