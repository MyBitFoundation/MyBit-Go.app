import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import BN from 'bignumber.js';
import AssetDetailsManagerInfo from 'components/AssetDetailsManagerInfo';
import AssetDetailsInfo from 'components/AssetDetailsInfo';
import AssetFunding from 'components/AssetFunding';
import {
  shortenAddress,
} from 'utils/helpers';
import AssetDetailsRightCol from './assetDetailsRightCol';
import AssetDetailsLeftCol from './assetDetailsLeftCol';
import AssetDetailsWrapper from './assetDetailsWrapper';

const AssetDetails = ({
  asset,
  handleAssetFavorited,
  fundAsset,
  updateNotification,
  loadingUserInfo,
}) => {
  const {
    city,
    country,
    assetId,
    assetManager,
    numberOfInvestors,
    watchListed,
    files,
    managerPercentage,
    collateralPercentage,
    funded,
    pastDate,
    percentageOwnedByUser,
    defaultData,
    fundingGoal,
    fundingProgress,
    userInvestment,
  } = asset;

  const {
    imageSrc,
    name,
    details,
    description,
  } = defaultData;

  return (
    <AssetDetailsWrapper>
      <AssetDetailsLeftCol xs={24} sm={24} md={24} lg={12} xl={12}>
        <AssetDetailsInfo
          name={name}
          imageSrc={imageSrc}
          city={city}
          country={country}
          details={details}
          description={description}
          assetId={assetId}
          watchListed={watchListed}
          handleAssetFavorited={handleAssetFavorited}
        />
        <AssetDetailsManagerInfo
          address={assetManager}
          addressShortened={shortenAddress(assetManager, 5, 2)}
          managerPercentage={managerPercentage}
          collateralPercentage={collateralPercentage}
          files={files}
          style={{
            marginTop: '20px',
          }}
        />
      </AssetDetailsLeftCol>
      <AssetDetailsRightCol xs={24} sm={24} md={24} lg={12} xl={12}>
        <AssetFunding
          asset={asset}
          fundAsset={fundAsset}
          updateNotification={updateNotification}
          loadingUserInfo={loadingUserInfo}
        />
      </AssetDetailsRightCol>
    </AssetDetailsWrapper>
  )
}
export default AssetDetails;
