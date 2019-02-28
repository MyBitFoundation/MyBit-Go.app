import styled from 'styled-components';

const ManageAssetContentWrapper = styled.div`
  margin-top: 20px;

  ${({theme}) => theme.tablet`
    display: flex;
    > div:nth-child(1){
      margin-right: 30px;
    }
  `}

  ${({theme}) => theme.laptop`
    > div:nth-child(1){
      margin-right: 50px;
    }
  `}
}`

export default ManageAssetContentWrapper;
