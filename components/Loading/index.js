import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Spin from 'static/spin.svg';
import StyledBackButton from './styledBackButton';
import StyledWrapper from './styledWrapper';
import StyledMessage from './styledMessage';

const Loading = ({ message, hasBackButton }) => (
  <div>
    {hasBackButton && (
      <StyledBackButton
        type="secondary"
        onClick={Router.goBack}
      >
        Back
      </StyledBackButton>
    )}
    <StyledWrapper>
      <Spin style={{ height: '64px', width: '64px' }} />
      <StyledMessage>
        {message}
      </StyledMessage>
    </StyledWrapper>
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

export default React.memo(Loading);
