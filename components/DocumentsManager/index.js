import React from 'react';
import styled, { css } from 'styled-components';
import {
  Button,
  Icon,
} from 'antd';
import UploadButton from 'ui/UploadButton';
import {
  MAX_FILES_UPLOAD,
  MAX_FILE_SIZE,
  InternalLinks,
} from 'constants';
import FileImg from 'static/file-icon.svg';
import * as Brain from '../../apis/brain';
import DocumentsManagerTitle from './documentsManagerTitle';
import DocumentsManagerNav from './documentsManagerNav';
import DocumentsManagerDescription from './documentsManagerDescription';
import DocumentsManagerFile from './documentsManagerFile';
import DocumentsManagerList from './documentsManagerList';
import DocumentsManagerWarning from './documentsManagerWarning';
import DocumentsManagerWrapper from './documentsManagerWrapper';
import DocumentsManagerError from './documentsManagerError';
import DocumentsManagerNoFiles from './documentsManagerNoFiles';

class DocumentsManager extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      files: this.props.files || [],
      error: undefined,
    }
  }

  upload = async (files) => {
    try{
      const result =  await Brain.uploadFilesToAWS(this.props.assetId, files);
      if(result){
        this.setState({
          success: this.state.files.length,
        })
      };
    }catch(err){
      console.log(err);
    }
  }

  handleFileUploaded = (file) => {
    const {
      files: propsFiles,
    } = this.props;

    const uploadedFiles = file.target.files;
    const currentNumberOfFiles = propsFiles.length;
    const uploadedNumberOfFiles = uploadedFiles.length;
    const canUpload = MAX_FILES_UPLOAD - currentNumberOfFiles;

    let error;
    if(currentNumberOfFiles + uploadedNumberOfFiles > MAX_FILES_UPLOAD){
      error = 'A maximum of 5 files can be uploaded.'
    }
    const filesTmp = [];
    const actualFiles = [];
    let counter = 0;
    let hasRepeatedNames = false;
    for(file of Object.values(uploadedFiles)){
      if(propsFiles.includes(file.name)){
        error = `Some files have duplicate names. They were skipped.`
        hasRepeatedNames = true;
      } else if(file.size > MAX_FILE_SIZE) {
        error = `Some files are over 5MB. They were skipped.`
      } else {
        filesTmp.push(file.name);
        actualFiles.push(file);
        counter+=1;
        if(counter === canUpload && counter !== 1){
          error = `Only uploaded ${counter} file(s). Only 5 items (total) can be uploaded.`;
          break;
        }
      }
    }

    if(error){
      this.setState({
        error,
      })
    }

    if(actualFiles.length > 0){
      this.setState({
        files: propsFiles.concat(filesTmp),
      })
      this.upload(actualFiles);
    }
  }

  render = () => {
    const {
      files,
    } = this.props;

    const {
      error,
      success,
    } = this.state;

    const noFiles = true;

    return (
      <DocumentsManagerWrapper>
        <DocumentsManagerTitle>Supporting Documents</DocumentsManagerTitle>
        <DocumentsManagerNav>
          <UploadButton
            inputProps={{
              onChange: this.handleFileUploaded,
              multiple: true,
            }}
          >
            <Button
              size="large"
              type="file"
            >
              Upload Documents
            </Button>
          </UploadButton>
          <UploadButton
            inputProps={{
              onChange: this.handleFileUploaded,
              multiple: true,
            }}
          >
            <Icon type="upload" />
          </UploadButton>
          <DocumentsManagerDescription>
            Up to a maximum of 5 files* can be uploaded, a maximum of 5MB each.
          </DocumentsManagerDescription>
        </DocumentsManagerNav>
        {!noFiles && (
          <DocumentsManagerList>
            {this.state.files.map((file, index) => {
              return (
                <DocumentsManagerFile key={`file${index}`}>
                  <div>
                    <FileImg />
                    <a href={`${InternalLinks.S3}${this.props.assetId}:${file.name || file}`}>{file.name || file}</a>
                  </div>
                </DocumentsManagerFile>
              )
            })}
          </DocumentsManagerList>
        )}
        {noFiles && (
          <DocumentsManagerNoFiles />
        )}
        {error && (
          <DocumentsManagerError
            color="orange"
          >
            <Icon type="warning" />
            <span>{error}</span>
            <Icon type="cross" onClick={() => this.setState({error: undefined})}/>
          </DocumentsManagerError>
        )}
        {success && (
          <DocumentsManagerError
            color="green"
          >
            <Icon type="check" />
            <span>{`${success}(s) have been uploaded.`}</span>
            <Icon type="cross" onClick={() => this.setState({success: undefined})}/>
          </DocumentsManagerError>
        )}
        <DocumentsManagerWarning>
          * files can not be removed after they have been uploaded.
        </DocumentsManagerWarning>
      </DocumentsManagerWrapper>
    )
  }
}

export default DocumentsManager
