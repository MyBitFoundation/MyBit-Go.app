import styled, { css } from 'styled-components';

const StyledAssetDetailsInfoImage = styled.div`
  height: 266px;
  background-position: bottom;
  background-size: cover;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(270deg,#0b3f9c,#0083ff);
  ${props => props.background && css`
    background-image: url(${props.background});
  `}
}`

export default StyledAssetDetailsInfoImage;
