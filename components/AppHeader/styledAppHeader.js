import styled, { css } from 'styled-components';

const StyledAppheader = styled.div`
  height: 90px;
  ${props => props.styling && props.styling.colors && css`
    background-image: ${props.styling.colors.backgroundGradientHorizontal};
  `}
  margin: 0px 0px;
  padding: 0 50px;
  color: white;
  display: flex;
  position: relative;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: hidden;
  font-family: 'Roboto';

  @media (max-width: 600px) {
    display: none;
  }
}`

export default StyledAppheader;
