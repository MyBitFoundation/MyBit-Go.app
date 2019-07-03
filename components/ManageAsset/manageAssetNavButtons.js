import styled from 'styled-components';

const ManageAssetNavButtons = styled.div`

  button{
    margin-right: 10px;
    margin-bottom: 10px;
  }

  button:nth-child(1){
    display: none;
  }

  ${({theme}) => theme.mobileL`
    display: flex;

    button{
      margin-bottom: 0px;
    }
  `}

  ${({theme}) => theme.tablet`
    button:nth-child(1){
      display: block;
    }
  `}
}`

export default ManageAssetNavButtons;
