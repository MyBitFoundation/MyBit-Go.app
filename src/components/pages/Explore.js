import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import Button from 'antd/lib/button';
import 'antd/lib/button/style';
import Row from 'antd/lib/row';
import { Switch, Icon } from 'antd';
import 'antd/lib/switch/style';
// import 'antd/lib/row/style';

import Asset from '../Asset';
// import NotFoundPage from './NotFoundPage';
import LoadingPage from './LoadingPage';

const Explore = ({ loading, assets }) => {

  const categories = ['Crypto', 'Real Estate', 'Energy', 'Machinery', 'Transpotation', 'Other'];
  const loadingElement = (
    <LoadingPage message="Loading assets" hasBackButton />
  );
  const filterButtons = (
    <div>
      <Button>Crypto</Button>
      <Button>Real Estate</Button>
      <Button>Energy</Button>
      <Button>Machinery</Button>
    </div>
  );
  const switchActive = (
    <div>
      <label>Funding Active</label>
      <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked />
    </div>
  );
  const assetsToRender = [
    filterButtons,
    switchActive,
    <div>
      {assets.map(asset => (
        <Asset
          key={asset.assetID}
          id={asset.assetID}
          funded={asset.amountRaisedInUSD}
          goal={asset.amountToBeRaisedInUSD}
          city={asset.city}
          country={asset.country}
          name={asset.name}
          backgroundImage={asset.imageSrc}
          fundingStage={asset.fundingStage}
          pastDate={asset.pastDate}
        />
      ))}
    </div>
  ];

  // const assetsInCategory = assets.filter(asset => asset.category === match.params.category);

  let toRender = null;

  if (loading.assets) {
    toRender = loadingElement;
  }
  else {
    toRender = assetsToRender;
  }

  return (
    <div>
      {toRender}
    </div>
  )
};

Explore.PropTypes = {
  loading: PropTypes.shape({ params: PropTypes.object }).isRequired,
  assets: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Explore;