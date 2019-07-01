import styled from 'styled-components';
import TooltipWithQuestionMarkGrey from 'ui/TooltipWithQuestionMarkGrey';

const TooltipWrapper = styled(TooltipWithQuestionMarkGrey)`
  margin-left: 5px;
`
const LabelWithTooltipWrapper = styled.div`
  display: flex;
  align-items: center;
`

const LabelWithTooltip = ({
  title,
  tooltipText,
}) => (
  <LabelWithTooltipWrapper>
    {title}
    <TooltipWrapper
      arrowPointAtCenter
      placement="top"
      destroyTooltipOnHide
      title={tooltipText}
    />
  </LabelWithTooltipWrapper>
);

export default LabelWithTooltip;
