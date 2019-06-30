import { compose } from 'recompose'
import { withBlockchainContextPageWrapper } from 'components/BlockchainContext'
import { withMetamaskContext } from 'components/MetamaskContext';
import { LocalStorageKeys } from 'constants/localStorageKeys';
import {
  getValueFromLocalStorage,
} from 'utils/helpers';
import AssetExplorer from 'components/AssetExplorer';
import Loading from 'components/Loading';
import { METAMASK_ERRORS } from 'components/MetamaskContext/constants';
import MetamaskErrors from 'components/MetamaskErrors';

const Explore = ({
  blockchainContext,
  metamaskContext,
}) => {
  const {
    assets,
    loading,
    handleAssetFavorited,
  } = blockchainContext;

  const hasMetamaskErrors = metamaskContext.metamaskErrors();
  if(hasMetamaskErrors.error &&hasMetamaskErrors.error !== METAMASK_ERRORS.NO_METAMASK){
    return (
      <MetamaskErrors
        shouldRenderComponent={false}
      />
    )
  }
  if (loading.assets) {
    return <Loading message="Loading assets" />;
  } else if(!hasMetamaskErrors.error || (hasMetamaskErrors.error === METAMASK_ERRORS.NO_METAMASK)){
    return (
      <AssetExplorer
        assets={assets}
        handleAssetFavorited={handleAssetFavorited}
        EXPLORE_PAGE_FUNDING_ACTIVE={LocalStorageKeys.EXPLORE_PAGE_FUNDING_ACTIVE}
        EXPLORE_PAGE_SORT_BY={LocalStorageKeys.EXPLORE_PAGE_SORT_BY}
        EXPLORE_PAGE_SELECTED_FILTERS={LocalStorageKeys.EXPLORE_PAGE_SELECTED_FILTERS}
        useLocalStorage
      />
    )
  }
};

const enhance = compose(
  withBlockchainContextPageWrapper,
  withMetamaskContext,
);

export default enhance(Explore);
