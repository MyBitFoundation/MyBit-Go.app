import React from 'react';
import QuestionTooltip from "public/info.svg";
import Tooltip from 'ui/Tooltip';

const TooltipWithQuestionMarkGrey = (props) => (
  <Tooltip tooltipProps={{...props}}>
    <QuestionTooltip />
  </Tooltip>
)

export default TooltipWithQuestionMarkGrey;
