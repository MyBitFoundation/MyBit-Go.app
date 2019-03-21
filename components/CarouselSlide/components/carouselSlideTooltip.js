import styled, { css } from 'styled-components';
import {
  Tooltip as TooltipAnt,
} from 'antd';
import questionTooltip from "static/list-asset/questionTooltip.png";

const Tooltip = styled(TooltipAnt)`
  font-size: 10px;
  transition: all 0.5s ease 0s;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  transform: translate(-0%, -50%);
  margin-left: 10px;
  display: inline-block !important;
`;

export const CarouselSlideTooltip = (props) => (
  <Tooltip {...props}>
    <img src={questionTooltip} />
  </Tooltip>
)
