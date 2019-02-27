import Router from 'next/router';
import PropTypes from 'prop-types';
import { compose } from 'recompose'
import AssetDetails from 'components/AssetDetails';
import { withBlockchainContext } from 'components/Blockchain'
import { withTokenPricesContext } from 'components/TokenPrices'

//import NotFoundPage from './NotFoundPage';
import Loading from 'components/Loading';
import StyledButton from './styledButton';

class AssetPage extends React.Component {
  static async getInitialProps (ctx) {
    return {assetId: ctx.query.id};
  }
  render(){
    const {
      blockchainContext,
      pricesContext,
      router,
    } = this.props;

    const {
      assets,
      loading,
      handleAssetFavorited,
      fundAsset,
      updateNotification,
    } = blockchainContext;

    const {
      prices,
    } = pricesContext;

    if (loading.assets || prices.loading) {
      return (
        <Loading
          message="Loading asset information"
          hasBackButton
        />
      );
    }

    const asset = assets.find(({ assetId }) => assetId === this.props.assetId);
    let toRender;
    if (!asset) {
      toRender = (
        <p>not found</p>
      );
    } else {
      toRender = (
        <AssetDetails
          currentEthInUsd={prices.ethereum.price}
          asset={asset}
          handleAssetFavorited={handleAssetFavorited}
          fundAsset={fundAsset}
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
    )
  }
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

const enhance = compose(
  withBlockchainContext,
  withTokenPricesContext,
);

export default enhance(AssetPage);
