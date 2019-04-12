
import React from 'react';
import styled from 'styled-components';
import LostMan from 'static/lost-man.svg';

const DocumentsManagerNoFilesWrapper = styled.div`
  margin: 0 auto;
  display: block;
  text-align: center;
  margin-top: 40px;
}`

const DocumentsManagerNoFiles = () => (
  <DocumentsManagerNoFilesWrapper>
    <LostMan />
    <div>Nothing here yet!</div>
  </DocumentsManagerNoFilesWrapper>
);

export default DocumentsManagerNoFiles;
