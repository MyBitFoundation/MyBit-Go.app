import styled, { css } from 'styled-components';

const AssetTemplateImageHolder = styled.div`
  ${props => props.backgroundImage && css`
      background-image: url('${props => props.backgroundImage}');
  `}
  ${props => props.height && css`
      height: ${props => props.height};
  `}

  background-size: cover;
  background-position: center;
  position: relative;
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

  ${props => props.onClick && css`
    cursor: pointer;
  `}
}`

export default AssetTemplateImageHolder;
