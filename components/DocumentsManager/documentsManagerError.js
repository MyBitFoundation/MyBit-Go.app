import styled from 'styled-components';

const DocumentsManagerError = styled.div`
  position: absolute;
  bottom: 5px;
  width: 100%;
  left: 0px;
  padding: 0% 10%;

  span{
    margin-left: 10px;
    padding-right: 10px;
  }

  i:nth-child(1) svg{
    fill: orange;
  }

  i:nth-child(3){
    cursor: pointer;
  }
}`

export default DocumentsManagerError;
