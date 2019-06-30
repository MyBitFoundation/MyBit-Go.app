import React from 'react';
import styled from 'styled-components';
import QuestionTooltip from "static/info.svg";
import Tooltip from 'ui/Tooltip';

const Img = styled.img`
  width: 20px;
  height: 20px;
`

const TooltipWithQuestionMarkGrey = (props) => (
  <Tooltip tooltipProps={{...props}}>
    <QuestionTooltip />
  </Tooltip>
)

export default TooltipWithQuestionMarkGrey;
