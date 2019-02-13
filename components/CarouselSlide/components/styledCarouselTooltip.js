import styled from 'styled-components';
import {
  Tooltip
} from 'antd';
import questionTooltip from "static/list-asset/questionTooltip.png";

const StyledTooltip = styled(Tooltip)`
  opacity: 0;
  position: absolute;
  font-size: 10px;
  top: 8px;
  right: 8px;
  transition: all 0.5s ease 0s;
  width: 20px;
  height: 20px;
`;

export const StyledCarouselTooltip = (props) => (
  <StyledTooltip {...props}>
    <img src={questionTooltip} />
  </StyledTooltip>
)
