import styled from 'styled-components';

const StyledAddress = styled.div`
  height: 100%;
  margin-right: 20px;
  margin-left: 20px;
  font-weight: 400;

  .AppHeader .paper{
    position: relative;
    display: inherit !important;
  }

  @media (max-width: 680px) {
    display: none;
  }
}`

export default StyledAddress;
