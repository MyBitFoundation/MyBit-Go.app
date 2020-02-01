import { compose } from 'recompose'
import { withMetamaskContextPageWrapper } from 'components/MetamaskContext';
import { withAssetsContextPageWrapper } from 'components/AssetsContext'
import AssetManagerFullProfile from 'components/AssetManagerFullProfile';
import { METAMASK_ERRORS } from 'components/MetamaskContext/constants';
import MetamaskErrors from 'components/MetamaskErrors';
import AllAssetManagers from 'components/AllAssetManagers';
import { withRouter } from 'next/router';
import isNil from "lodash/isNil";

const AssetManager = ({
  assetsContext,
  metamaskContext,
  managerAddress,
  router,
}) => {

  if (isNil(managerAddress) === true && isNil(router.query.id) === false) {
    managerAddress = router.query.id;
  }

  const hasMetamaskErrors = metamaskContext.metamaskErrors();
  if(hasMetamaskErrors.error &&hasMetamaskErrors.error !== METAMASK_ERRORS.NO_METAMASK){
    return (
      <MetamaskErrors
        shouldRenderComponent={false}
      />
    )
  }
  if(!managerAddress){
    return (
      <AllAssetManagers
        assetsContext={assetsContext}
        network={metamaskContext.network}
      />
    )
  } else {
    return (
      <AssetManagerFullProfile
        assetsContext={assetsContext}
        metamaskContext={metamaskContext}
        managerAddress={managerAddress}
      />
    )
  }
}

const enhance = compose(
  withAssetsContextPageWrapper,
  withMetamaskContextPageWrapper,
  withRouter,
);

export default enhance(AssetManager);
