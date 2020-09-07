import styled from 'styled-components';

export const CarouselSlideLabel = styled.p`
  margin: 0 auto;
  margin-bottom: 10px;

  ${({ theme }) => theme.tablet`
      width: 80%;
  `}

  ${props => props.required && `&::before {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '*';
  }
  `}
`;
