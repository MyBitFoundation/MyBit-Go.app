import styled from 'styled-components';
import ConnectionStatusWrapper from './connectionStatusWrapper';
import TooltipWithQuestionMark from 'ui/TooltipWithQuestionMark';

const StyledTooltip = styled(TooltipWithQuestionMark)`
  margin-left: 10px;
  width: 15px;
  height: 15px;
  position: relative;
  top: -1px;
`
const ConnectionStatus = ({
  metamaskErrors,
}) => {
  const connected = !metamaskErrors.error || false;

  return connected ? null : (
    <ConnectionStatusWrapper
      connected={connected}
    >
      <div>
        {connected ? 'Connected' : 'Not connected'}
        {!connected && (
          <StyledTooltip
            tooltipProps={{
              placement: 'bottomLeft',
            }}
            title={metamaskErrors.render}
          />
        )}
      </div>
    </ConnectionStatusWrapper>
  )
}

export default ConnectionStatus;
