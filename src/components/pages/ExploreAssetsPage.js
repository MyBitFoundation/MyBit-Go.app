import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'carbon-components-react';
import '../../styles/ExploreAssetsPage.css';
import Asset from '../Asset';
import NotFoundPage from './NotFoundPage';
import LoadingPage from './LoadingPage';
import { getPrettyCategoryName } from '../../util/helpers';

const ExploreAssetsPage = ({ loading, assets, match }) => {
  const { category } = match.params;

  if (!category) {
    return <NotFoundPage />;
  }

  const loadingAssets = loading.assets;
  const assetsInCategory = assets.filter(
    asset => asset.category === match.params.category
  );

  const backButton = (
    <Link key="/explore" to="/explore" href="/explore">
      <Button kind="secondary" className="ExploreAssetsPage__back-button">
        BACK
      </Button>
    </Link>
  );

  const assetsToRender = [
    backButton,
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {assetsInCategory.map(asset => (
        <Asset
          key={asset.assetID}
          id={asset.assetID}
          funded={asset.amountRaisedInUSD}
          goal={asset.amountToBeRaisedInUSD}
          city={asset.city}
          country={asset.country}
          name={asset.name}
          category={getPrettyCategoryName(asset.category)}
          backgroundImage={asset.imageSrc}
        />
      ))}
    </div>
  ];

  const loadingElement = loadingAssets && (
    <LoadingPage message="Loading assets" hasBackButton path="/explore" />
  );

  // const noElements =
  //   !loading && (
  //     <div style={{ width: '100%' }}>
  //       {backButton}
  //       <p
  //         className="ExploreAssetsPage__message-no-elements"
  //       >
  //         {`No assets found in the ${category} category.`}
  //       </p>
  //     </div>
  //   );

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

  return <div className="ExploreAssetsPage">{renderedOutput}</div>;
};

ExploreAssetsPage.propTypes = {
  loading: PropTypes.shape({ params: PropTypes.object }).isRequired,
  assets: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({ params: PropTypes.object }).isRequired
};

export default ExploreAssetsPage;
