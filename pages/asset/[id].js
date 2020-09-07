import React from 'react';
import { useRouter } from 'next/router';
import { compose } from 'recompose';
import AssetDetails from 'components/AssetDetails';
import { withThreeBoxContext } from 'components/ThreeBoxContext';
import { withBlockchainContextPageWrapper } from 'components/BlockchainContext';
import { withMetamaskContextPageWrapper } from 'components/MetamaskContext';
import { withAssetsContextPageWrapper } from 'components/AssetsContext';
import GoBackTextAndArrow from 'components/GoBackTextAndArrow';
import Loading from 'components/Loading';
import ErrorPage from 'components/ErrorPage';

const AssetPage = (props) => {
  const {
    assetsContext,
    blockchainContext,
    threeBoxContext,
    metamaskContext,
  } = props;
  const { query: { id: assetId } } = useRouter();
  const {
    loadingAssets,
    assets = [],
    loadingUserInfo,
  } = assetsContext;

  const {
    fundAsset,
    updateNotification,
    gasPrice,
  } = blockchainContext;

  const { user } = metamaskContext;

  const {
    getPosts,
    getProfile,
    loadingThreeBox,
    getAvatar,
    syncingThreeBox,
  } = threeBoxContext;

  if (loadingAssets) {
    return (
      <Loading
        message="Loading asset information"
        hasBackButton
      />
    );
  }

  const asset = assets.find(a => a.assetId === assetId);
  let toRender;
  if (!asset) {
    toRender = (
      <ErrorPage
        title="Asset not found"
        description="If you feel like this is an error, please contact us."
      />
    );
  } else {
    toRender = (
      <AssetDetails
        asset={asset}
        fundAsset={fundAsset}
        updateNotification={updateNotification}
        loadingUserInfo={loadingUserInfo}
        gasPrice={gasPrice}
        getPosts={getPosts}
        loadingThreeBox={loadingThreeBox}
        syncingThreeBox={syncingThreeBox}
        getProfile={getProfile}
        getAvatar={getAvatar}
        blockchainContext={blockchainContext}
        isAssetManager={asset.assetManager === user.address}
      />
    );
  }

  return (
    <React.Fragment>
      <GoBackTextAndArrow />
      {toRender}
    </React.Fragment>
  );
};

export const getInitialProps = async ctx => ({ props: { assetId: ctx.query.id } });

const enhance = compose(
  withThreeBoxContext,
  withBlockchainContextPageWrapper,
  withMetamaskContextPageWrapper,
  withAssetsContextPageWrapper,
);

export default enhance(AssetPage);
