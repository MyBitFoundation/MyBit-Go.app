import styled from 'styled-components';

const DocumentsManagerError = styled.div`
  margin: 0% 10%;
  position: relative;

  span{
    margin-left: 10px;
  }

  i:nth-child(1) svg{
    fill: orange;
  }

  i:nth-child(3){
    position: absolute;
    right: 0px;
    top: 3px;
    cursor: pointer;
  }
}`

export default DocumentsManagerError;
