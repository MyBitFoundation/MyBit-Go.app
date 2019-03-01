import styled, { css } from 'styled-components';

const ManageAssetSection = styled.div`
  width: 100%;
  position: relative;

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

  ${props => props.hasShadow && css`
    ${({theme}) => theme.tablet`
      border-radius: 4px;
      box-shadow: 0 4px 12px 0 rgba(0,0,0,0.1);
    `}
  `}
}`

export default ManageAssetSection;
