import styled, { css } from 'styled-components';
import {
  Tooltip
} from 'antd';
import questionTooltip from "static/list-asset/questionTooltip.png";

const StyledTooltip = styled(Tooltip)`
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

export const StyledCarouselSlideTooltip = (props) => (
  <StyledTooltip {...props}>
    <img src={questionTooltip} />
  </StyledTooltip>
)
