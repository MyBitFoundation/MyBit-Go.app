import { createGlobalStyle } from 'styled-components'
import 'antd/dist/antd.min.css';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Gilroy';
    src: url('/static/fonts/gilroy-extrabold.otf') format('opentype');
    font-weight: bold;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto' !important;
    position: relative;
    font-weight: normal;
    background-color: #ffffff;
    font-weight: 400;
  }

  [class*='ant'] {
    font-family: 'Roboto' !important;
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
    font-family: Roboto;
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

  .ant-tooltip {
    .ant-tooltip-content {
      box-shadow: 1px 5px 20px 2px rgba(0,0,0,0.2);
      border-radius: 4px;
      .ant-tooltip-inner {
        background-color: #ffffff;
        color: #4a4a4a;
        padding: 10px;
      }
      .ant-tooltip-arrow {
        border-top-color: #ffffff;
      }
    }
  }

  .Notifications{
    position: fixed;
    z-index: 10;
    bottom: 0px;
    right: 0px;
    display: flex;
    flex-direction: column-reverse;


    .ant-alert-with-description{
      padding: 15px 35px 15px 64px;
    }

    .ant-alert{
      position: relative;
      z-index: 100000;
      right: 20px;
      max-width: 500px;
      margin-bottom: 20px;

      & a:focus{
        text-decoration: none;
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

  .ManagedAsset__error{
    text-align: center;
    font-size: 26px;
    margin-top: 100px;
    padding: 0px 40px;
  }

  .ant-tooltip-content {
      box-shadow: 1px 5px 20px 2px rgba(0,0,0,0.2);
      border-radius: 4px;
  }
  .ant-tooltip-inner {
      background-color: #ffffff;
      color: #4a4a4a;
      padding: 10px;
      max-width: 200px;
  }
  .ant-tooltip-arrow {
      border-top-color: #ffffff;
  }

  .Watch__tooltip .ant-tooltip-inner{
    background-color: #ffffff;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-family: 'Roboto';
  }
  .Watch__tooltip .ant-tooltip-arrow{
    border-top-color: #ffffff !important;
  }

`

export default GlobalStyle;
