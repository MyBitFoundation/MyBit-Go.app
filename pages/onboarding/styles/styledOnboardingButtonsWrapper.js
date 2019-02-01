import styled from 'styled-components';

const StyledOnboardingButtonsWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;

  @media(max-width: 600px){
    position: relative;
    bottom: 0px;
    right: 0px;
  }
}`

export default StyledOnboardingButtonsWrapper;
