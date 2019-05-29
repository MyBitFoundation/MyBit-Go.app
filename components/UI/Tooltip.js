import styled, { createGlobalStyle } from 'styled-components';
import {
  Tooltip as TooltipAnt,
} from 'antd';

const GlobalStyle = createGlobalStyle`
  .CustomLightColorTooltip .ant-tooltip-content {
    box-shadow: 1px 5px 20px 2px rgba(0,0,0,0.2);
    border-radius: 4px;
  }
  .CustomLightColorTooltip .ant-tooltip-inner {
    background-color: #ffffff;
    color: #4a4a4a;
    padding: 10px;
  }
  .CustomLightColorTooltip .ant-tooltip-arrow {
    border-top-color: #ffffff;
    border-bottom-color: #ffffff;
  }
`

const Tooltip = ({
  tooltipProps,
  children,
}) => (
  <React.Fragment>
    <GlobalStyle />
    <TooltipAnt overlayClassName="CustomLightColorTooltip" {...tooltipProps}>
      {children}
    </TooltipAnt>
  </React.Fragment>
)


export default Tooltip;
