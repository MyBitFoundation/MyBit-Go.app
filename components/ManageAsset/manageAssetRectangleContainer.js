import styled, { css } from 'styled-components';

const ManageAssetRectangleContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: ${props => props.height || "140px"};
  width: 48%;
  text-align: center;
  border-radius: 4px;

  ${props => props.isFontSizeSmall && css`
    font-size: 13px;
  `}

  ${props => props.alignHorizontally && css`
    flex-direction: row;
 `}

 ${props => props.isFullWidth && css`
    width: 100%;
    max-height: ${props => props.height ? 'auto' : '322px'};
  `}

  ${props => props.hasShadow && css`
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  `}

  ${(props => props.isLeftAligned && css`
    text-align: left;
  `)}
}`

export default ManageAssetRectangleContainer;
