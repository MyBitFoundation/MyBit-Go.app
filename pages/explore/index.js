import { withBlockchainContext } from 'components/BlockchainContext'
import { LocalStorageKeys } from 'constants/localStorageKeys';
import {
  getValueFromLocalStorage,
} from 'utils/helpers';
import AssetExplorer from 'components/AssetExplorer';
import Loading from 'components/Loading';

const Explore = withBlockchainContext(({
  blockchainContext,
}) => {
  const {
    assets,
    loading,
    handleAssetFavorited,
  } = blockchainContext;

  if (loading.assets) {
    return <Loading message="Loading assets" />;
  }

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
});

export default Explore;
