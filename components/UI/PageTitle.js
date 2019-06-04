import styled from 'styled-components';

const PageTitle = styled.div`
  display: none;
  font-size: 38px;
  line-height: 46px;
  text-align: center;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 20px;

  ${({theme}) => theme.tablet`
    display: block;
  `}
`

export default PageTitle;
