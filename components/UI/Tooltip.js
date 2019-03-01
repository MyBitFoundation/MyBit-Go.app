import styled, { css } from 'styled-components';
import {
  Tooltip as TooltipAnt,
} from 'antd';
import questionTooltip from "static/list-asset/questionTooltip.png";

const StyledTooltip = styled(TooltipAnt)`
  font-size: 14px;
  transition: all 0.5s ease 0s;
  width: 20px;
  height: 20px;
`;

const Tooltip = (props) => (
  <StyledTooltip {...props}>
    <img src={questionTooltip} />
  </StyledTooltip>
)


export default Tooltip;
