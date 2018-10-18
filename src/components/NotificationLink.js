import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/NotificationLink.css';

const NotificationLink = ({
  location,
  setAssetsStatus,
  text,
  to,
}) => {
  if (encodeURI(location.pathname) !== to) {
    return (
      <Link
        className="NotificationLink"
        to={to}
        href={to}
        onClick={() => {
      setAssetsStatus({
        alertType: undefined,
      });
    }}
      >{text}
      </Link>);
  }

  return null;
};

NotificationLink.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  setAssetsStatus: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default withRouter(NotificationLink);
