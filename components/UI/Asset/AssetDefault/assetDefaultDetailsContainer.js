import styled, { css } from 'styled-components';

const AssetDefaultDetailsContainer = styled.div`
  background-color: #ffffff;
  padding: 5px 10px 0px 10px;
  ${props => (props.funded || props.failed) && css`
    i > svg{
      fill: ${props => props.funded ? props.theme.colors.green : props.theme.colors.red};
      margin-left: 8px;
      top: 1px;
      position: relative;
    }

    .ant-progress {
      padding-right: calc(1em + 8px);
      margin-right: calc(-1em - 8px);
    }

    .ant-progress-bg{
      background-color: ${props => props.funded ? props.theme.colors.green : props.theme.colors.red}
    }
  `}
}`

export default AssetDefaultDetailsContainer;
