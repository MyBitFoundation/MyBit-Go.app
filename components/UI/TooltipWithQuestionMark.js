import styled from 'styled-components';
import Tooltip from 'ui/Tooltip';

const Img = styled.img`
  width: 20px;
  height: 20px;
`

const TooltipWithQuestionMark = (props) => (
  <Tooltip tooltipProps={{...props}}>
    <Img src="/list-asset/questionTooltip.png" />
  </Tooltip>
)

export default TooltipWithQuestionMark;
