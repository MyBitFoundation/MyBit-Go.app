import styled from 'styled-components';

const StyledPercentage = styled.span`
  ${props => (props.priceChangePercentage && props.priceChangePercentage < 0) && css`
    color: red;
  `}
}`

export default StyledPercentage;
