import styled from 'styled-components';

const HelpPageButtons = styled.div`
  display: none;

  ${({theme}) => theme.tablet`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    & a{
      margin: 0px 10px;
      width: max-content;
    }
  `}
}`

export default HelpPageButtons;
