import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const NotificationLink = ({ location, setAssetsStatus, text }) => {
  if (location.pathname !== '/portfolio') {
    return (
      <Link
        to="/portfolio"
        href="/portfolio"
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
};

export default withRouter(NotificationLink);
