import styled from 'styled-components';

const AssetFundingWrapper = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  position: relative;
  ${({theme}) => theme.tablet`
    padding: 20px;
    padding-top: 10px;
  `}
}`

export default AssetFundingWrapper;
