import styled, { css } from 'styled-components';

const AssetTemplateWrapper = styled.div`
  margin: 0px;
  margin-bottom: 20px;
  padding: 0px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: relative;

  @media(min-width: 1200px){
    margin: ${props => props.margin}
  }

  @media(min-width: 768px){
   margin: ${props => props.margin}
  }

  .ant-progress-text{
    display: none;
  }

  .ant-progress-show-info .ant-progress-outer{
    padding-right: 0px;
    margin-right: 0px;
  }
}`

export default AssetTemplateWrapper;
