import styled, { css } from 'styled-components';

const ManageAssetColoredValue = styled.b`
  ${props => props.isBlue && css`
    color: ${({theme}) => theme.colors.blueMain};
  `}

  ${props => props.isGreen && css`
    color: ${({theme}) => theme.colors.green};
  `}

}`

export default ManageAssetColoredValue;
