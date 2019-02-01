import styled from 'styled-components';

const StyledHelpPageButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  & a{
    margin: 0px 10px;
    width: max-content;

    @media(max-width: 670px) {
       margin: 10px 0px;
    }
  }

  @media(max-width: 670px) {
     flex-direction: column;
  }
}`

export default StyledHelpPageButtons;
