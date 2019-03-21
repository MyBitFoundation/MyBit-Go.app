import React from 'react';
import PropTypes from 'prop-types';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import Spin from 'static/spin.svg';
import AddressWrapper from './addressWrapper';
import AddressLoader from './addressLoader';
import AddressText from './addressText';
import AddressJazzicon from './addressJazzicon';

const Address = ({ address, isLeft, isMobile }) => (
  <AddressWrapper>
    {!address ? (
      <Loader>
        <Spin style={{ height: '32px', width: '32px' }} />
        <span>Loading account</span>
      </Loader>
    ) : (
      <Jazzicon
        isLeft={isLeft}
        isMobile={isMobile}
      >
        <Jazzicon diameter={isMobile ? 31 : 39} seed={jsNumberForAddress(address)} />
        <Text
          isMobile={isMobile}
        >
          {address}
        </Text>
      </Jazzicon>
    )}
  </AddressWrapper>
);

Address.defaultProps = {
  address: undefined,
};

Address.propTypes = {
  address: PropTypes.string,
};

export default React.memo(Address);
