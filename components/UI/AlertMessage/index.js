import PropTypes from 'prop-types';
import {
  Alert,
} from 'antd';
import StyledAlertMessage from './styledAlertMessage';

const AlertMessage = props => (
  <StyledAlertMessage>
    <Alert
      type={props.type}
      message={props.message}
      onClose={props.handleAlertClosed}
      showIcon
      closable={props.closable}
    />
  </StyledAlertMessage>
);

export default AlertMessage;

AlertMessage.defaultProps = {
  className: undefined,
  closable: true,
  handleAlertClosed: undefined,
};

AlertMessage.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  handleAlertClosed: PropTypes.func,
  className: PropTypes.string,
  closable: PropTypes.bool,
};
