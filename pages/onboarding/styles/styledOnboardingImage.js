import styled, { css } from 'styled-components';

const StyledOnboardingImage = styled.img`
  position: absolute;
  top: 21px;
  right: 40px;

  @media(max-width: 600px) {
    display: none !important;
  }

  ${props => props.isDesk && css`
    top: 41px;
    right: 30px;
  `}

  ${props => props.isGlobe && css`
    top: 28px;
    right: 51px;
  `}

  ${props => props.isKey && css`
    top: 46px;
    right: 66px;
  `}

  ${props => props.isSetup && css`
    top: 158px;
    right: 29px;
  `}

  ${props => props.isStatic && css`
    margin: 0px auto;
    position: relative;
    top: 0px;
    right: 0px;
  `}

}`

export default StyledOnboardingImage;
