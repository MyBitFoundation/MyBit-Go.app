import styled, { css } from 'styled-components';

const StyledAssetManagerSlideImgWrapper = styled.div`
  width: 100%;
  padding: 31px 0px 15px 0px;

  ${props => props.isMyb && css`
    & img {
      width: 59px;
      height: 70px;
      margin: 0px auto;
    }
  `}

  ${props => props.isTools && css`
    & img {
      width: 155px;
      height: 99px;
      margin: 0px auto;
    }
  `}
}`

export default StyledAssetManagerSlideImgWrapper;
