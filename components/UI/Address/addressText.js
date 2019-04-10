import styled, { css } from 'styled-components';

const AddressText = styled.p`
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 75px;
  line-height: 1;
  margin: 0px 0px;
  position: relative;
  margin-left: 15px;

  ${props => props.isMobile && css`
    margin-left: 10px;
    font-size: 16px;
  `}
}`

export default AddressText;
