import React from 'react';
import PropTypes from 'prop-types';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import Spin from 'static/spin.svg';
import StyledAddress from './styledAddress';
import StyledLoader from './styledLoader';
import StyledText from './styledText';
import StyledJazzicon from './styledJazzicon';

const Address = ({ userName, className, isLeft, isMobile }) => (
  <StyledAddress>
    {!userName ? (
      <StyledLoader>
        <Spin style={{ height: '32px', width: '32px' }} />
        <span>Loading account</span>
      </StyledLoader>
    ) : (
      <StyledJazzicon
        isLeft={isLeft}
        isMobile={isMobile}
      >
        <Jazzicon diameter={isMobile ? 31 : 39} seed={jsNumberForAddress(userName)} />
        <StyledText
          isMobile={isMobile}
        >
          {userName}
        </StyledText>
      </StyledJazzicon>
    )}
  </StyledAddress>
);

Address.defaultProps = {
  userName: undefined,
  className: '',
};

Address.propTypes = {
  userName: PropTypes.string,
  className: PropTypes.string,
};

export default Address;
