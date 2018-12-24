import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'antd/lib/button';
import 'antd/lib/button/style';
import Row from 'antd/lib/row';
import 'antd/lib/row/style';

import '../../styles/ExploreAssetsPage.css';
import Asset from '../Asset';
import NotFoundPage from './NotFoundPage';
import LoadingPage from './LoadingPage';
import { getPrettyCategoryName } from '../../util/helpers';


const ExploreAssetsPage = ({ loading, assets, match, categoriesAirTable }) => {
  const { category } = match.params;

  if (!category) {
    return <NotFoundPage />;
  }

  const loadingAssets = loading.assets;
  const assetsInCategory = assets.filter(asset => asset.category === match.params.category);

  const backButton = (
    <Link key="/explore" to="/explore" href="/explore">
      <Button className="ExploreAssetsPage__back-button">Back</Button>
    </Link>
  );

  const assetsToRender = [
    backButton,
    <div key="ExploreAssetsPage__assets">
      {assetsInCategory.map(asset => (
        <Asset
          key={asset.assetID}
          id={asset.assetID}
          funded={asset.amountRaisedInUSD}
          goal={asset.amountToBeRaisedInUSD}
          city={asset.city}
          country={asset.country}
          name={asset.name}
          category={getPrettyCategoryName(asset.category, categoriesAirTable)}
          backgroundImage={asset.imageSrc}
          fundingStage={asset.fundingStage}
          pastDate={asset.pastDate}
        />
      ))}
    </div>,
  ];

  const loadingElement = loadingAssets && (
    <LoadingPage
      message="Loading assets"
      hasBackButton
    />
  );

  let renderedOutput = null;
  if (loadingAssets) {
    renderedOutput = loadingElement;
  } else if (assetsInCategory.length === 0) {
    renderedOutput = (
      <NotFoundPage message="The desired category could not be found. Assets previously listed under this category may no longer exist." />
    );
  } else {
    renderedOutput = assetsToRender;
  }

  return <Row className="ExploreAssetsPage">{renderedOutput}</Row>;
};

ExploreAssetsPage.propTypes = {
  loading: PropTypes.shape({ params: PropTypes.object }).isRequired,
  assets: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({ params: PropTypes.object }).isRequired,
};

export default ExploreAssetsPage;
