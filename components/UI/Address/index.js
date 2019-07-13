import React from 'react';
import PropTypes from 'prop-types';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import Spin from 'static/spin.svg';
import AddressWrapper from './addressWrapper';
import AddressLoader from './addressLoader';
import AddressText from './addressText';
import AddressJazzicon from './addressJazzicon';
import ThreeBoxProfile from 'components/ThreeBoxProfile';

const Address = ({ address, isMobile }) => (
  <AddressWrapper>
    {!address ? (
      <AddressLoader>
        <Spin style={{ height: '32px', width: '32px' }} />
        <span>Loading account</span>
      </AddressLoader>
    ) : (
      <AddressJazzicon>
        <Jazzicon diameter={isMobile ? 31 : 39} seed={jsNumberForAddress(address)} />
        <AddressText
          isMobile={isMobile}
        >
          <ThreeBoxProfile address={address} name />
        </AddressText>
      </AddressJazzicon>
    )}
  </AddressWrapper>
);

export default React.memo(Address);
