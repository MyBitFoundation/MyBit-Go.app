import styled from 'styled-components';
import AssetExplorer from 'components/AssetExplorer';
import Loading from 'components/Loading';
import AssetManagerProfile from 'ui/AssetManagerProfile';
import Theming from 'components/Theme/theming';
import {
  ExternalLinks,
} from 'constants/links';
import Divider from 'ui/Divider';
import GoBackTextAndArrow from 'components/GoBackTextAndArrow';
import { formatMonetaryValue } from 'utils/helpers';
const Colors = Theming.colors;

const ProfileWrapper = styled.div`
  background-color: #FFFFFF;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12), 0px 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 0px 0px 4px 4px;
  width: 650px;
  margin: 0 auto;
  padding: 10px;
`

const Title = styled.p`
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
`

const AddressWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const AssetManagerFullProfile = ({
  blockchainContext,
  metamaskContext,
  managerAddress,
}) => {
  const {
    loading,
    assets,
    assetManagers,
  } = blockchainContext;

  const {
    network,
  } = metamaskContext;

  if (loading.assets) {
    return (
      <Loading
        message="Loading Asset Manager"
      />
    );
  }

  const assetManager = assetManagers[managerAddress];
  if(!assetManager){
    return <p>this manager doesnt exist.</p>
  }

  const assetsByManager = assets.filter(asset => asset.assetManager === managerAddress)
  return (
    <div>
      <GoBackTextAndArrow
        text="Back to All Managers"
        href="/asset-managers"
        style={{
          margin: 'auto',
          marginBottom: '10px',
        }}
      />
      <ProfileWrapper>
        <Title>Asset manager</Title>
        <AddressWrapper>
          {managerAddress}
          <a
            href={ExternalLinks.getEtherscanAddressURL(network, managerAddress)}
            target="_blank"
            rel="noreferrer"
          >View on etherscan</a>
        </AddressWrapper>
        <Divider />
        <AssetManagerProfile
          {...assetManager}
          totalRevenue={formatMonetaryValue(assetManager.totalRevenue)}
          styling={{
            labelColor: Colors.grayBase,
            valueColor: Colors.black,
          }}
        />
      </ProfileWrapper>
      <div style={{height: '50px'}} />
      <AssetExplorer
        assets={assetsByManager}
      />
    </div>
  )
}

export default AssetManagerFullProfile;
