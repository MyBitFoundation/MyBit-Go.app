import React from 'react';
import PropTypes from 'prop-types';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import Spin from 'static/spin.svg';
import StyledAddress from './styledAddress';
import StyledLoader from './styledLoader';
import StyledText from './styledText';
import StyledJazzicon from './styledJazzicon';

const Address = ({ address, isLeft, isMobile }) => (
  <StyledAddress>
    {!address ? (
      <StyledLoader>
        <Spin style={{ height: '32px', width: '32px' }} />
        <span>Loading account</span>
      </StyledLoader>
    ) : (
      <StyledJazzicon
        isLeft={isLeft}
        isMobile={isMobile}
      >
        <Jazzicon diameter={isMobile ? 31 : 39} seed={jsNumberForAddress(address)} />
        <StyledText
          isMobile={isMobile}
        >
          {address}
        </StyledText>
      </StyledJazzicon>
    )}
  </StyledAddress>
);

Address.defaultProps = {
  address: undefined,
};

Address.propTypes = {
  address: PropTypes.string,
};

export default React.memo(Address);
