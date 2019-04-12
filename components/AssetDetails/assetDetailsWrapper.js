import styled from 'styled-components';
import {
  Row,
} from 'antd';

const AssetDetailsWrapper = styled(Row)`
  margin-bottom: 50px;

  .ant-slider{
    margin: 0px 0px;
    padding: 0px 0px;
    margin-top: 30px;
  }

  ${({theme}) => theme.tablet`
    margin-top: 20px;
  `}

  .ant-slider-track{
    background-color: #1890ff;
  }

  .ant-slider-handle{
    border: solid 2px #1890ff;
  }

  .ant-slider-handle:focus{
    box-shadow: none;
  }

  @media(max-width: 500px) {
    .ant-input-group-wrapper{
      width: 50% !important;
      display: block;
    }
  }
}`

export default AssetDetailsWrapper;
