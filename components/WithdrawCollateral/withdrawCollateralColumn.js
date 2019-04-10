import styled from 'styled-components';

const WithdrawCollateralColumn = styled.div`
  display: block;
  position: relative;
  height: 172px;
  width: 36px;
  background: #EFEFEF;
  border-radius: 4px;

  div{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 36px;
    height: ${props => props.height};
    background: #1890FF;
    border-radius: 4px;
  }
}`

export default WithdrawCollateralColumn;
