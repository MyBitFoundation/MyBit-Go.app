import styled from 'styled-components';

const AssetFundingConfirmListWrapper = styled.div`
  margin-top: 50px;
  padding: 0% 2%;
  ${({theme}) => theme.mobileL`
    padding: 0% 10%;
  `}
}`

export default AssetFundingConfirmListWrapper;
