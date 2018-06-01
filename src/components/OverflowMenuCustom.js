import React from 'react';
import PropTypes from 'prop-types';
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';

const OverflowMenuCustom = ({ url }) => (
  <OverflowMenu className="Transactions__overflowOption" floatingMenu>
    <OverflowMenuItem
      onClick={() => { window.open(url, '_blank'); }}
      itemText="View on Etherscan"
      primaryFocus
    />
  </OverflowMenu>
);

OverflowMenuCustom.propTypes = {
  url: PropTypes.string.isRequired,
};

export default OverflowMenuCustom;
