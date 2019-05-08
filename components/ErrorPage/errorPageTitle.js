import styled from 'styled-components';

const ErrorPageTitle = styled.p`
  padding: 0% 5%;
  font-size: 32px;
  font-weight: bold;
  line-height: normal;
  color: #111111;
  margin-top: 10px;
  margin-bottom: 10px;

  ${({theme}) => theme.tablet`
    font-size: 34px;
    padding: 0px 0px;
  `}
}`

export default ErrorPageTitle;
