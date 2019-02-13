import styled, { css } from 'styled-components';

const StyledJazzicon = styled.div`
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${props => props.isLeft && css`
    justify-content: start;
  `}

  ${props => props.isMobile && css`
    height: auto;
  `}
`;

export default StyledJazzicon;
