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

const Explore = ({ loading, assets }) => {

  // fundingStage 
  // = 1 open for funding
  // = 2 failed
  // = 3 success but needs confirmation, payout() needs to be called on it
  // = 4 live

  // new categories 
  // Crypto', 'Real Estate', 'Energy', 'Machinery', 'Transpotation'
  let filter = {
    fundingStage: '4', 
    category: 'other',
    category: 'solarenergy'
  };

  assets = assets.filter(function(item) {
    for (var key in filter) {
      if (item[key] === undefined || item[key] != filter[key])
        return false;
    }
    return true;
  });

  const loadingElement = (
    <LoadingPage message="Loading assets" />
  );
  const filterButtons = (
    <div>
      <Button>Crypto</Button>
      {/* <ToogleButton active=""> </ToggleButton> */}
      <Button>Real Estate</Button>
      <Button>Energy</Button>
      <Button>Machinery</Button>
    </div>
  );
  
  const FilterCategoryContainer = styled.div`
    margin-left: 20px;
  `
  const FilterFundingActiveContainer = styled.div`
    float: right;
  `


  const switchActive = (
    <div>
      <label>Funding Active</label>
      <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked />
    </div>
  );
  const assetsToRender = [
    // filterButtons,
    // switchActive,
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
      <FilterCategoryContainer>
        {filterButtons} 
      </FilterCategoryContainer>
      <FilterFundingActiveContainer>
        {switchActive}
      </FilterFundingActiveContainer>
        
        {toRender} 
    </div> 
  )
};

Explore.PropTypes = {
  loading: PropTypes.shape({ params: PropTypes.object }).isRequired,
  assets: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Explore;