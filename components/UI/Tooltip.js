import styled, { css } from 'styled-components';
import {
  Tooltip as TooltipAnt,
} from 'antd';
import questionTooltip from "static/list-asset/questionTooltip.png";

const TooltipWrapper = styled(TooltipAnt)`
  font-size: 14px;
  transition: all 0.5s ease 0s;
  width: 20px;
  height: 20px;
`;

const Tooltip = (props) => (
  <TooltipWrapper {...props}>
    <img src={questionTooltip} />
  </TooltipWrapper>
)


export default Tooltip;
