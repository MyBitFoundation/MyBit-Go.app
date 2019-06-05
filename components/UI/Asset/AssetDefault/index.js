import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withThreeBoxContext } from 'components/ThreeBoxContext';
import {
  Progress,
  Icon,
} from 'antd';
import{
  DEFAULT_TOKEN,
  PLATFORM_TOKEN,
} from 'constants/app';
import AssetDefaultDetailsContainer from './assetDefaultDetailsContainer';
import AssetDefaultFunded from './assetDefaultFunded';
import AssetDefaultGoal from './assetDefaultGoal';
import AssetDefaultContributeButton from './assetDefaultContributeButton';
import {
  formatMonetaryValue,
  shortenAddress,
} from 'utils/helpers';
import UserIcon from 'static/user.svg';
import AssetManagerTooltip from 'ui/AssetManagerTooltip';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const UserIconWrapper = styled(UserIcon)`
  position: relative;
  top: 2px;
  margin-right: 5px;
  margin-left: 0px;
`

class AssetDefault extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assetManagerProfile: {}
    }
  }

  async componentDidMount() {
    const { assetManager, threeBoxContext } = this.props;
    const { load3BoxProfile } = threeBoxContext;
    const assetManagerProfile = await load3BoxProfile(assetManager);
    this.setState({ assetManagerProfile })
  }

  render() {
    const {
      fundingGoal,
      fundingProgress,
      pastDate,
      funded,
      assetId,
      assetManager,
      assetManagerData,
      threeBoxContext
    } = this.props;

    const {
      assetManagerProfile
    } = this.state;

    const {
      loadingThreeBox,
    } = threeBoxContext;

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
        barWidth={barWidth}
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
        </div>

        <Container>
          <div>
            <AssetManagerTooltip
              totalAssets={totalAssets}
              startDate={startDate}
              totalRevenue={formatMonetaryValue(totalRevenue)}
              collateralLocked={formatMonetaryValue(collateralLocked, PLATFORM_TOKEN)}
            >
              <UserIconWrapper />
            </AssetManagerTooltip>
            <Link
              as={`/asset-managers/${assetManager}`}
              href={`/asset-managers?id=${assetManager}`}
            >
              <a>
                {
                  assetManagerProfile.name ?
                    assetManagerProfile.name :
                    shortenAddress(assetManager, 6, 10)
                }
              </a>
            </Link>
          </div>
          <Link
            as={`/asset/${assetId}`}
            href={`/asset?id=${assetId}`}
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
  }
};

export default withThreeBoxContext(React.memo(AssetDefault));