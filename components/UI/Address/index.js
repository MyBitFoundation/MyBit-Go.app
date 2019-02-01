import React from 'react';
import PropTypes from 'prop-types';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import Spin from '../../../static/spin.svg';
import StyledAddress from './styledAddress';
import StyledLoader from './styledLoader';
import StyledText from './styledText';
import StyledJazzicon from './styledJazzicon';

const Address = ({ userName, className }) => (
  <StyledAddress>
    {!userName ? (
      <StyledLoader>
        <Spin style={{ height: '32px', width: '32px' }} />
        <span>Loading account</span>
      </StyledLoader>
    ) : (
      <StyledJazzicon>
        <Jazzicon diameter={39} seed={jsNumberForAddress(userName)} />
        <StyledText>{userName}</StyledText>
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
