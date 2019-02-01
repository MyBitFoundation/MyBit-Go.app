import Router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';

import AssetDetails from '../../components/AssetDetails';
import { withBlockchainContext } from '../../components/Blockchain'

//import NotFoundPage from './NotFoundPage';
import Loading from '../../components/Loading';
import StyledButton from './styledButton';

class AssetPage extends React.Component {
componentDidMount = () => {
  Router.prefetch('/explore');
}

render(){
  const {
    blockchainContext,
    router,
  } = this.props;

  const {
    prices,
    assets,
    loading,
    user,
    handleAssetFavorited,
    fundAsset,
    userHasMetamask,
    userIsLoggedIn,
    network,
    extensionUrl,
    isBraveBrowser,
    updateNotification,
  } = blockchainContext;

  if (loading.assets || !prices.ether) {
    return (
      <Loading
        message="Loading asset information"
        hasBackButton
      />
    );
  }

  const asset = assets.find(({ assetId }) => assetId === router.query.id);
  let toRender;
  if (!asset) {
    toRender = (
      <p>not found</p>
    );
  } else {
    toRender = (
      <AssetDetails
        currentEthInUsd={prices.ether.price}
        user={user}
        asset={asset}
        handleAssetFavorited={handleAssetFavorited}
        fundAsset={fundAsset}
        userHasMetamask={userHasMetamask}
        userIsLoggedIn={userIsLoggedIn}
        network={network}
        extensionUrl={extensionUrl}
        isBraveBrowser={isBraveBrowser}
        updateNotification={updateNotification}
        loadingUserInfo={loading.userAssetsInfo}
      />
    )
  }

  return(
    <React.Fragment>
      <StyledButton onClick={() => Router.push('/explore')}>
        Back
      </StyledButton>
      {toRender}
    </React.Fragment>
  )}
}

AssetPage.defaultProps = {
  ether: undefined,
};

AssetPage.propTypes = {
  loading: PropTypes.shape({ params: PropTypes.object }).isRequired,
  assets: PropTypes.arrayOf(PropTypes.object).isRequired,
  ether: PropTypes.shape({ params: PropTypes.object }),
  match: PropTypes.shape({ params: PropTypes.object }).isRequired,
  user: PropTypes.shape({ params: PropTypes.object }).isRequired,
  history: PropTypes.shape({ params: PropTypes.object }).isRequired,
};

export default withBlockchainContext(withRouter(AssetPage));
