import styled, { css } from 'styled-components';

const StyledValueDisplay = styled.div`
  background: #FFFFFF;
  border-radius: 4px;
  padding: 3px;
  display: flex;
  align-items: center;
  width: max-content;
  padding-left: 10px;
  height: 40px;

  ${props => props.hasShadow && css`
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
  `}
  ${props => props.style && props.style}
}`

export default StyledValueDisplay;
