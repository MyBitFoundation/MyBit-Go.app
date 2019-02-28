import styled, { css } from 'styled-components';

const ManageAssetSection = styled.div`
  width: 100%;

  ${({theme}) => theme.tablet`
    width: 48%;

    ${props => props.hasGraphs && css`
      width: 56%;
    `}
  `}

  ${({theme}) => theme.laptop`
    width: 45%;
  `}

  ${({theme}) => theme.laptopL`
    width: 43%;
  `}
}`

export default ManageAssetSection;
