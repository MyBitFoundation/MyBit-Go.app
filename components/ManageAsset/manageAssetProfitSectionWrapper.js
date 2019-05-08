import styled from 'styled-components';

const ManageAssetProfitSectionWrapper = styled.div`
  padding: 0% 5%;
  padding-bottom: 10px;

  ${({theme}) => theme.laptop`
    padding: 0% 10%;
    padding-bottom: 10px;
  `}

}`

export default ManageAssetProfitSectionWrapper;
