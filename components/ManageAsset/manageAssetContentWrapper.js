import styled from 'styled-components';
import {
  Row,
} from 'antd';

const ManageAssetContentWrapper = styled(Row)`
  margin-bottom: 50px;
  margin-top: 20px;

  > div:nth-child(1){
    @media (min-width: 991px) {
      padding-right: 10px;
      margin-top: 0px;
    }
  }

  > div:nth-child(2){
    @media (min-width: 991px) {
      padding-left: 10px;
      margin-top: 0px;
    }
  }
}`

export default ManageAssetContentWrapper;
