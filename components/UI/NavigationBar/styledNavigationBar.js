import styled from 'styled-components';

const StyledNavigationBar = styled.div`
  a{
    text-decoration: none;
  }

  .ant-menu-item-selected svg g,
  .ant-menu-item-selected svg path{
    fill: #1890ff;
  }

  .ant-menu-item-active svg g,
  .ant-menu-item-active svg path{
    fill: #1890ff;
  }
  @media(max-width: 600px) {
    overflow-y: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    .ant-menu-item {
      display: inline-block !important;
    }
    .ant-menu-submenu {
      display: none !important;
    }
  }
}`

export default StyledNavigationBar;
