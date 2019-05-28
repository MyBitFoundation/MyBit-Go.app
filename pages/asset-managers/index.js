import styled from 'styled-components';
import { compose } from 'recompose'
import { withMetamaskContext } from 'components/MetamaskContext';
import { withBlockchainContext } from 'components/BlockchainContext'
import AssetManagerFullProfile from 'components/AssetManagerFullProfile';

const AssetManager = ({
  blockchainContext,
  metamaskContext,
  managerAddress,
}) => {
  if(!managerAddress){
    return (
      <p>browse all asset managers!</p>
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
