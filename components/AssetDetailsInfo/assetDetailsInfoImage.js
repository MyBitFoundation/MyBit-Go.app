import styled, { css } from 'styled-components';

const AssetDetailsInfoImage = styled.div`
  height: 266px;
  background-position: bottom;
  background-size: cover;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  ${props => props.background && css`
    background-image: url(${props.background});
  `}
}`

export default AssetDetailsInfoImage;
