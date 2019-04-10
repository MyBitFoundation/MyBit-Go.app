/* eslint-disable no-confusing-arrow */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
} from 'antd';
import WatchIcon from 'static/watch.svg';
import WatchWrapper from './watchWrapper';

const Watch = ({
  active,
  handleClick,
  assetId,
}) => (
  <WatchWrapper active={active} onClick={(e) => {
    e.stopPropagation();
    handleClick(assetId);
  }}>
    <Tooltip
      placement="topRight"
      title={active ? 'Remove from watchlist.' : 'Add to watchlist.'}
      overlayClassName="Watch__tooltip"
      arrowPointAtCenter
    >
      <WatchIcon />
    </Tooltip>
  </WatchWrapper>
);

export default Watch;
