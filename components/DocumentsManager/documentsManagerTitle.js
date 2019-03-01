import styled from 'styled-components';

const DocumentsManagerTitle = styled.span`
  line-height: 20px;
  font-size: 20px;
  text-align: center;
  color: #383838;
  display: block;

  margin-top: 50px;

  ${({theme}) => theme.tablet`
    margin-top: 20px;
  `}
}`

export default DocumentsManagerTitle;
