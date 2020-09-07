import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Assistant', sans-serif;
    src: url('https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700&display=swap') format('opentype');
    font-weight: bold;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Assistant', sans-serif;
    position: relative;
    font-weight: normal;
    background-color: #ffffff;
    font-weight: 400;
    overflow-x: hidden;
  }

  [class*='ant'] {
    font-family: 'Assistant', sans-serif;
  }

  html, body {
    height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;}

  html {
    box-sizing: border-box; }

  p{
    letter-spacing: normal !important;
  }


  b{
    font-weight: bold;
  }

  .ant-menu-submenu-popup{
    z-index: 3 !important;

    a{
      text-decoration: none !important;
    }

    .ant-menu-item-selected svg g{
      fill: #1890ff;
    }

    .ant-menu-item-active svg g{
      fill: #1890ff;
    }

  }

  #outer-container{
    overflow: visible !important;
  }

  .bm-burger-button{
    display: none;
  }

  .MetaMaskErrors{
    background-color: orange;
    color: white;
    text-align: center;
    font-family: 'Assistant', sans-serif;
    font-weight: 600;
    position: relative;
    top: 0px;
    padding: 0px 10px;

    & p{
      padding: 2px 0px;
    }

    & a{
      color: white;
      text-decoration: underline;
      cursor: pointer;

      &:hover{
        color: white;
        text-decoration: underline;
      }
    }
  }

  .christmas.ant-btn-primary:before{
    display: none !important;
  }

  .MetamaksErrors__connect{
    text-decoration: underline;

    &:hover{
      cursor: pointer;
    }
  }

  .Watch__tooltip .ant-tooltip-inner{
    background-color: #ffffff;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-family: 'Assistant', sans-serif;
  }
  .Watch__tooltip .ant-tooltip-arrow{
    border-top-color: #ffffff !important;
  }

  .ant-upload {
    height: auto !important;
  }

`

export default GlobalStyle;
