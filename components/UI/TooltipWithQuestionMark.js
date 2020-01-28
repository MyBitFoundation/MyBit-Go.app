import styled from 'styled-components';
import questionTooltip from "public/list-asset/questionTooltip.png";
import Tooltip from 'ui/Tooltip';

const Img = styled.img`
  width: 20px;
  height: 20px;
`

const TooltipWithQuestionMark = (props) => (
  <Tooltip tooltipProps={{...props}}>
    <Img src={questionTooltip} />
  </Tooltip>
)

export default TooltipWithQuestionMark;
