import styled, { css } from 'styled-components';

const StyledAssetTemplateImageHolder = styled.div`
  ${props => props.backgroundImage && css`
      background-image: url('${props => props.backgroundImage}');
  `}
  ${props => props.height && css`
      height: ${props => props.height};
  `}

  background-size: cover;
  background-position: center;
  position: relative;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.1);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  &:after{
    content: ' ';
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.35), transparent 80px, transparent);
  }
}`

export default StyledAssetTemplateImageHolder;
