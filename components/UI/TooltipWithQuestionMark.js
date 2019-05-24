import questionTooltip from "static/list-asset/questionTooltip.png";
import Tooltip from 'ui/Tooltip';

const TooltipWithQuestionMark = (props) => (
  <Tooltip {...props}>
    <img src={questionTooltip} />
  </Tooltip>
)

export default TooltipWithQuestionMark;
