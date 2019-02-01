import styled, { css } from 'styled-components';

const StyledMainTitle = styled.h1`
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 40px;
  margin: 40px 0px 10px 0px;

  @media(max-width: 600px) {
    font-size: 32px;
    line-height: 38px;
  }

  ${props => props.isLong && css`
    font-size: 35px;
    line-height: 40px;
    font-weight: bold;
    margin-top: 40px;
    font-style: normal;
  `}

  ${props => props.isBlue && css`
    color: '#1890ff';
  `}

  ${props => props.isRed && css`
    color: 'red';
  `}

}`

export default StyledMainTitle;
