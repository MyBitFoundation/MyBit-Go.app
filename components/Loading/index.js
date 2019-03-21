import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Spin from 'static/spin.svg';
import LoadingWrapper from './loadingWrapper';
import LoadingMessage from './loadingMessage';
import BackButton from 'ui/BackButton';

const Loading = ({ message, hasBackButton }) => (
  <div>
    {hasBackButton && <BackButton />}
    <LoadingWrapper>
      <Spin style={{ height: '64px', width: '64px' }} />
      <LoadingMessage>
        {message}
      </LoadingMessage>
    </LoadingWrapper>
  </div>
);

Loading.propTypes = {
  message: PropTypes.string.isRequired,
  hasBackButton: PropTypes.bool,
  history: PropTypes.shape({ params: PropTypes.object }).isRequired,
};

Loading.defaultProps = {
  hasBackButton: false,
};

export default Loading;
