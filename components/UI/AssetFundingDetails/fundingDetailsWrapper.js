import styled from 'styled-components';

const FundingDetailsWrapper = styled.div`
  text-align: left;
  display: flex;
  justify-content: space-between;

  ${({theme}) => theme.mobileL`
    justify-content: start;
  `}
}`

export default FundingDetailsWrapper;
