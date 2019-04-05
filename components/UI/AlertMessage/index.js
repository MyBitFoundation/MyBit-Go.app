import PropTypes from 'prop-types';
import {
  Alert,
} from 'antd';
import AlertMessageWrapper from './alertMessageWrapper';

const AlertMessage = props => (
  <AlertMessageWrapper>
    <Alert
      type={props.type}
      message={props.message}
      onClose={props.handleAlertClosed}
      showIcon
      closable={props.closable}
    />
  </AlertMessageWrapper>
);

export default React.memo(AlertMessage);
