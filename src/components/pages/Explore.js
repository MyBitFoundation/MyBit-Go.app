import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
// import { Link } from 'react-router-dom';
import Button from 'antd/lib/button';
import 'antd/lib/button/style';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { Switch, Icon } from 'antd';
import 'antd/lib/switch/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';

import Asset from '../Asset';
// import NotFoundPage from './NotFoundPage';
import LoadingPage from './LoadingPage';
import  AssetsFilter from '../AssetsFilter.js';

const Explore = ({ loading, assets }) => {

  return (
    <div>
      <AssetsFilter assets={assets} loading={loading} />
    </div> 
  )
};

Explore.propTypes = {
  loading: PropTypes.shape({ params: PropTypes.object }).isRequired,
  assets: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Explore;