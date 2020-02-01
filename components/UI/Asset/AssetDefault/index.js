import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import ThreeBoxProfile from 'components/ThreeBoxProfile';
import {
  Progress,
  Icon,
} from 'antd';
import{
  PLATFORM_TOKEN,
} from 'constants/app';
import AssetDefaultDetailsContainer from './assetDefaultDetailsContainer';
import AssetDefaultFunded from './assetDefaultFunded';
import AssetDefaultGoal from './assetDefaultGoal';
import AssetDefaultContributeButton from './assetDefaultContributeButton';
import {
  formatMonetaryValue,
} from 'utils/helpers';

import AssetManagerTooltip from 'ui/AssetManagerTooltip';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`

const AssetDefault = ({
  fundingGoal,
  fundingProgress,
  pastDate,
  funded,
  assetId,
  assetManager,
  assetManagerData,
}) => {
  const {
    totalRevenue,
    totalAssets,
    startDate,
    collateralLocked,
  } = assetManagerData;

  const barWidth = funded ? 100 : parseFloat(((fundingProgress * 100) / fundingGoal).toFixed(2));
  const goalFormatted = formatMonetaryValue(fundingGoal);
  const progressFormatted = formatMonetaryValue(fundingProgress);
  let buttonText = 'Contribute';
  let buttonType = 'primary';
  if (funded || pastDate) {
    buttonText = 'View Asset';
    buttonType = 'default';
  }

  return (
    <AssetDefaultDetailsContainer
      funded={funded}
      failed={!funded && pastDate}
    >
      <AssetDefaultFunded>
        Funded:{' '}
        <b>{progressFormatted}</b>
      </AssetDefaultFunded>
      <AssetDefaultGoal>
        Goal:{' '}
        <b>{goalFormatted}</b>
      </AssetDefaultGoal>
      <div>
        <Progress percent={barWidth} />
        {barWidth === 100 && (
          <Icon
            type="check-circle"
            theme="filled"
          />
        )}
        {(pastDate && !funded) && (
          <Icon
            type="close-circle"
            theme="filled"
          />
        )}
      </div>

      <Container>
        <ProfileContainer>
          <AssetManagerTooltip
            totalAssets={totalAssets}
            startDate={startDate}
            totalRevenue={formatMonetaryValue(totalRevenue)}
            collateralLocked={formatMonetaryValue(collateralLocked, PLATFORM_TOKEN)}
          >
          <ThreeBoxProfile address={assetManager} icon />
          <Link href={`/asset-managers?id=${assetManager}`}>
            <a>
              <ThreeBoxProfile address={assetManager} name />
            </a>
          </Link>
          </AssetManagerTooltip>
        </ProfileContainer>
        <Link href={`/asset?id=${assetId}`}
        >
          <AssetDefaultContributeButton
            type={buttonType}
          >
            {buttonText}
          </AssetDefaultContributeButton>
        </Link>
      </Container>
    </AssetDefaultDetailsContainer>
  )
};

export default React.memo(AssetDefault);
