import { compose } from 'recompose'
import { withMetamaskContext } from 'components/MetamaskContext';
import { withBlockchainContext } from 'components/BlockchainContext'
import AssetManagerFullProfile from 'components/AssetManagerFullProfile';
import { METAMASK_ERRORS } from 'components/MetamaskContext/constants';
import MetamaskErrors from 'components/MetamaskErrors';
import AllAssetManagers from 'components/AllAssetManagers';

const AssetManager = ({
  blockchainContext,
  metamaskContext,
  managerAddress,
}) => {
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
        blockchainContext={blockchainContext}
        network={metamaskContext.network}
      />
    )
  } else {
    return (
      <AssetManagerFullProfile
        blockchainContext={blockchainContext}
        metamaskContext={metamaskContext}
        managerAddress={managerAddress}
      />
    )
  }
}

AssetManager.getInitialProps = ctx => {
  return { managerAddress: ctx.query.id };
}

const enhance = compose(
  withBlockchainContext,
  withMetamaskContext,
);

export default enhance(AssetManager);
