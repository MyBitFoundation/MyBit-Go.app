/* eslint-disable no-confusing-arrow */

import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'antd/lib/tooltip';
import 'antd/lib/tooltip/style/index.css';
import WatchIcon from '../../../static/watch.svg';
import StyledWatch from './styledWatch';

const Watch = ({
  active,
  handleClick,
  assetId,
}) => (
  <StyledWatch active={active} onClick={() => handleClick(assetId)}>
    <Tooltip
      placement="topRight"
      title={active ? 'Remove from watchlist.' : 'Add to watchlist.'}
      overlayClassName="Watch__tooltip"
      arrowPointAtCenter
    >
      <WatchIcon />
    </Tooltip>
  </StyledWatch>
);

Watch.propTypes = {
  active: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  assetId: PropTypes.string.isRequired,
};

export default Watch;
