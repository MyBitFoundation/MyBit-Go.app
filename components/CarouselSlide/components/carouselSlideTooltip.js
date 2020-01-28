import styled, { css } from 'styled-components';
import Tooltip from 'ui/Tooltip';
import questionTooltip from "public/list-asset/questionTooltip.png";
import TooltipWithQuestionMark from 'ui/TooltipWithQuestionMark';

const TooltipWrapper = styled(TooltipWithQuestionMark)`
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
  <TooltipWrapper {...props} />
)
