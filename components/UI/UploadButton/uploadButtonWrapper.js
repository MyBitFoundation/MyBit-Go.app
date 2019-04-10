import styled from 'styled-components';

const UploadButtonWrapper = styled.div`
  position: relative;
  display: block;
  cursor: pointer;

  input[type=file] {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    font-size: 16px;
  }
}`

export default UploadButtonWrapper;
