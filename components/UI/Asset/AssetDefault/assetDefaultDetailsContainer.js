import styled, { css } from 'styled-components';

const AssetDefaultDetailsContainer = styled.div`
    background-color: #ffffff;
    padding: 5px 10px 0px 10px;

    ${props => props.barWidth === 100 && css`
      svg{
        fill: #52c41a;
        margin-left: 8px;
      }

      .ant-progress {
        padding-right: calc(1em + 8px);
        margin-right: calc(-1em - 8px);
      }
    `}
}`

export default AssetDefaultDetailsContainer;
