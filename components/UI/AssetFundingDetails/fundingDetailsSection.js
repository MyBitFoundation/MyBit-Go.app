import styled from 'styled-components';

const FundingDetailsSection = styled.div`
  padding-right: 10px;
  ${({theme}) => theme.mobileL`
    padding-right: 40px;
  `}
}`

export default FundingDetailsSection;
