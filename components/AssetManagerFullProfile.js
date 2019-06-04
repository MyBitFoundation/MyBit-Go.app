import styled from 'styled-components';
import Media from 'react-media';
import AssetExplorer from 'components/AssetExplorer';
import Loading from 'components/Loading';
import AssetManagerProfile from 'ui/AssetManagerProfile';
import Theming from 'components/Theme/theming';
import {
  ExternalLinks,
} from 'constants/links';
import { Sizes } from 'components/Theme/mediaQueries';
import Divider from 'ui/Divider';
import GoBackTextAndArrow from 'components/GoBackTextAndArrow';
import { 
  formatMonetaryValue,
  shortenAddress,
} from 'utils/helpers';
import ErrorPage from 'components/ErrorPage';
import PageTitle from 'ui/PageTitle';

const Colors = Theming.colors;

const ProfileWrapper = styled.div`
  background-color: #FFFFFF;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12), 0px 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 0px 0px 4px 4px;
  ${({theme}) => theme.tablet`
    width: 650px;
  `}
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
    return (
      <ErrorPage
        title="Asset Manager not found"
        description={`No assets have ever been listed by an Asset Manager with the provided address: ${managerAddress}`}
        href="/asset-managers"
        hasBackButton
      />
    )
  }

  const assetsByManager = assets.filter(asset => asset.assetManager === managerAddress)

  //if the asset manager does not have any live assets, then show all the funded assets instead
  const fundingActive = assetsByManager.find(asset => asset.funded === false) !== undefined

  return (
    <div>
      <PageTitle>Asset Manager</PageTitle>
      <GoBackTextAndArrow
        href="/asset-managers"
        style={{
          margin: 'auto',
          marginBottom: '10px',
        }}
      />
      <ProfileWrapper>
        <Title>Asset manager</Title>
        <AddressWrapper>
          <Media query={`(min-width: ${Sizes.tablet}px`}>
            {matches =>
              matches ? managerAddress : shortenAddress(managerAddress, 6, 4)
            }
          </Media>
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
        fundingActive={fundingActive}
      />
    </div>
  )
}

export default AssetManagerFullProfile;
