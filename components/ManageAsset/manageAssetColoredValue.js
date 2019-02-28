import styled, { css } from 'styled-components';

const ManageAssetColoredValue = styled.b`
  ${props => props.isBlue && css`
    color: #1890FF;
  `}

  ${props => props.isGreen && css`
    color: #52C41A;
  `}

}`

export default ManageAssetColoredValue;
