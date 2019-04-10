import styled from 'styled-components';

const Separator = styled.div`
  background-color: ${props => props.color || props.theme.colors.grayUltraLight};
  width: 100%;
  height: 1px;
  ${props => props.style}
}`

export default Separator;
