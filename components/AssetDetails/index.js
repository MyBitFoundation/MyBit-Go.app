import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import AssetDetailsManagerInfo from 'components/AssetDetailsManagerInfo';
import AssetDetailsInfo from 'components/AssetDetailsInfo';
import ContributionPopup from 'components/ContributionPopup';
import AssetState from 'ui/AssetState';
import AssetFundingDetails from 'ui/AssetFundingDetails';
import AssetCalculator from 'ui/AssetCalculator';
import {
  formatMonetaryValue,
  shortenAddress,
  fromWeiToEth,
} from 'utils/helpers';
import {
  InternalLinks,
} from 'constants';
import StyledAssetDetailsContributeButton from './styledAssetDetailsContributeButton';
import StyledAssetDetailsRightCol from './styledAssetDetailsRightCol';
import StyledAssetDetailsLeftCol from './styledAssetDetailsLeftCol';
import StyledAssetDetails from './styledAssetDetails';

class AssetDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedAmountUsd: null,
      selectedAmountEth: null,
      selectedOwnership: null,
      daysToGo: 0,
      timeToGo: '',
      endingAt: '',
      isPopupOpen: false,
    };
  }

  componentDidMount = () => {
    if(this.props.asset){
      this.setDateDetails();
    }
  }

  componentWillUnmount = () => {
    this.clearInterval();

  }

  clearInterval = () => {
    clearInterval(this.setDateInterval);
  }

  componentWillReceiveProps = () => {
    this.setDateDetails();
  }

  setDateDetails = () => {
    const {
      asset,
    } = this.props;

    const {
      fundingDeadline,
      amountToBeRaisedInUSD,
      amountRaisedInUSD,
      pastDate,
    } = asset;

    const maxInvestment =
      amountToBeRaisedInUSD - amountRaisedInUSD;

    // funding goal has been reached
    if (maxInvestment === 0 || asset.funded) {
      this.setState({
        timeToGo: 'Funding goal has been reached',
        daysToGo: 0,
        endingAt: 'Funding goal has been reached',
      });
      this.clearInterval();
      return;
    }
    // funding period has reached end date
    if (pastDate) {
      this.setState({
        daysToGo: -1,
        timeToGo: 'Funding period has ended',
        endingAt: `Funding period has ended on ${dayjs(fundingDeadline).format('dddd, MMMM D')}`,
      });
      this.clearInterval();
      return;
    }
    const days = fundingDeadline.diff(dayjs(), 'days');
    const seconds = fundingDeadline.diff(dayjs(), 'seconds');
    const calculateRemainingTime = dayjs()
      .startOf('day')
      .add(seconds, 'seconds');

    // less than 1 day until funding period ends
    if (days === 0) {
      const secondsToEndDate = fundingDeadline.diff(dayjs(), 'seconds');
      const aux = dayjs()
        .startOf('day')
        .add(86400, 'seconds');
      const secondsToMidnight = aux.diff(dayjs(), 'seconds');
      let day = 'today';
      if (secondsToEndDate > secondsToMidnight) day = 'tomorrow';

      this.setState({
        timeToGo: `Ending in ${calculateRemainingTime.hour()}h ${calculateRemainingTime.minute()}m ${calculateRemainingTime.second()}s`,
        daysToGo: 0,
        endingAt: `Funding period ends ${day} at ${dayjs(fundingDeadline).format('H:mm:ss')}`,
      });

      if (!this.setDateInterval || this.runningMinInterval) {
        this.setDateInterval = setInterval(() => {
          this.setDateDetails();
        }, 1000);
        this.runningMinInterval = false;
      }
    } else {
      // 1 or more days until funding period ends
      const dayString = days === 1 ? 'day' : 'days';
      this.setState({
        timeToGo: `${days} ${dayString} and ${calculateRemainingTime.hour()} hours to go`,
        daysToGo: days,
        endingAt: `Funding period ends on ${dayjs(fundingDeadline).format('dddd, MMMM D')}`,
      });
      if (!this.setDateInterval) {
        this.setDateInterval = setInterval(() => {
          this.setDateDetails();
        }, 60000);
        this.runningMinInterval = true;
      }
    }
  }

  getFilesToRender = (files, assetId) => {
    if(!files || files.length === 0){
      return <span>None</span>;
    }
    const toReturn = files.map(file => (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`${InternalLinks.S3}${assetId}:${file}`}
      >
        {file}
      </a>
    ))

    return toReturn;
  }

  handleOnChangeEthValue = (number, maxEther, currentEthInUsd, amountToBeRaisedInUSD) => {
    number > Number(maxEther) ?
      this.setState({
        selectedAmountEth: maxEther,
      })
      : this.setState({
          selectedAmountUsd: Number((number * currentEthInUsd).toFixed(2)),
          selectedAmountEth: number,
          selectedOwnership: (number * currentEthInUsd) && (
        (number * currentEthInUsd * 100) /
        amountToBeRaisedInUSD
      ).toFixed(2),
    })
  }

  handleOnChangeUsdValue = (number, maxInvestment, currentEthInUsd, amountToBeRaisedInUSD) => {
    number > Number(maxInvestment)
      ? this.setState({
        selectedAmountUsd: maxInvestment,
      })
      : this.setState({
        selectedAmountUsd: number,
        selectedAmountEth: Number(number / currentEthInUsd).toFixed(5),
        selectedOwnership: number && ((number * 100) / amountToBeRaisedInUSD).toFixed(2),
      })
  }

  handleOnChangePercentage = (number, maxOwnership, amountToBeRaisedInUSD, maxEther) => {
    number > Number(maxOwnership)
      ? this.setState({
          selectedOwnership: maxOwnership,
        })
      : this.setState({
        selectedAmountUsd: (amountToBeRaisedInUSD / 100) * number,
        selectedOwnership: number,
        selectedAmountEth: (Number(maxEther) * (number / 100)).toFixed(5),
      })
  }

  handleOnChangeSlider = (number, currentEthInUsd, amountToBeRaisedInUSD) => {
    this.setState({
      selectedAmountUsd: number,
      selectedAmountEth: Number(number / currentEthInUsd).toFixed(5),
      selectedOwnership: number && ((number * 100) / amountToBeRaisedInUSD).toFixed(2),
    })
  }

  handlePopupState = (value) => {
    this.setState({ isPopupOpen: value });
  }

  isPopupOpen = () => {
    return this.state.isPopupOpen;
  }

  render(){
    const {
      selectedAmountUsd,
      selectedAmountEth,
      selectedOwnership,
      daysToGo,
    } = this.state;

    const {
      currentEthInUsd,
      asset,
      handleAssetFavorited,
      fundAsset,
      updateNotification,
      loadingUserInfo,
    } = this.props;

    const {
      city,
      country,
      assetId,
      details,
      description,
      assetManager,
      numberOfInvestors,
      watchListed,
      files,
      managerPercentage,
      collateralPercentage,
      name,
      amountToBeRaisedInUSD,
      amountRaisedInUSD,
      imageSrc,
      funded,
      pastDate,
      ownershipUnits,
    } = asset;

    const filesToRender = this.getFilesToRender(files, assetId);

    const maxInvestment =
      funded || daysToGo < 0
        ? 0
        : Number((amountToBeRaisedInUSD - amountRaisedInUSD).toFixed(2));

    let minInvestment =
      daysToGo < 0 || maxInvestment === 0 ? 0 : 100;

    if (maxInvestment <= 100 && maxInvestment > 0 && daysToGo > 0) {
      minInvestment = 1;
    }

    const goalFormatted = formatMonetaryValue(amountToBeRaisedInUSD);

    const maxEther = Number(maxInvestment / currentEthInUsd).toFixed(5);
    const maxOwnership = maxInvestment && (
      (maxInvestment * 100) /
      amountToBeRaisedInUSD
    ).toFixed(2);

    let yourContributionUsd = 0;
    let yourContributionEth = 0;
    let yourOwnership = 0;

    if((pastDate || funded) && (ownershipUnits > 0)){
      const weiInEther = fromWeiToEth(ownershipUnits, 'ether');
      yourContributionUsd = weiInEther * currentEthInUsd;
      yourContributionEth = weiInEther;
      yourOwnership = (((weiInEther * currentEthInUsd) / amountToBeRaisedInUSD) * 100).toFixed(2);
      if (Number(yourContributionEth) > 100) {
        yourOwnership = 100;
      }
    }

    return (
      <StyledAssetDetails>
        {this.state.isPopupOpen && (
          <ContributionPopup
            amountUsd={formatMonetaryValue(selectedAmountUsd)}
            amountEth={this.state.selectedAmountEth}
            ownership={this.state.selectedOwnership}
            isPopupOpen={() => this.isPopupOpen()}
            handlePopupState={val => this.handlePopupState(val)}
            assetId={assetId}
            fundAsset={fundAsset}
            updateNotification={updateNotification}
            loadingUserInfo={loadingUserInfo}
          />
        )}
        <StyledAssetDetailsLeftCol xs={24} sm={24} md={24} lg={12} xl={12}>
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
        </StyledAssetDetailsLeftCol>
        <StyledAssetDetailsRightCol xs={24} sm={24} md={24} lg={12} xl={12}>
          <AssetState
            endingAt={this.state.endingAt}
          />
          <AssetFundingDetails
            amountRaisedInUSD={amountRaisedInUSD}
            goalFormatted={goalFormatted}
            numberOfInvestors={numberOfInvestors}
            funded={funded}
            formatMonetaryValue={formatMonetaryValue}
          />
          <AssetCalculator
            handleOnChangeEthValue={this.handleOnChangeEthValue}
            handleOnChangeUsdValue={this.handleOnChangeUsdValue}
            handleOnChangePercentage={this.handleOnChangePercentage}
            handleOnChangeSlider={this.handleOnChangeSlider}
            selectedAmountEth={selectedAmountEth}
            maxEther={maxEther}
            currentEthInUsd={currentEthInUsd}
            amountToBeRaisedInUSD={amountToBeRaisedInUSD}
            selectedAmountUsd={selectedAmountUsd}
            maxInvestment={maxInvestment}
            minInvestment={minInvestment}
            selectedOwnership={selectedOwnership}
            daysToGo={daysToGo}
            formatMonetaryValue={formatMonetaryValue}
            ended={pastDate || funded}
            yourContributionUsd={yourContributionUsd}
            yourContributionEth={yourContributionEth}
            yourOwnership={yourOwnership}
            maxOwnership={maxOwnership}
            loadingUserInfo={loadingUserInfo}
          />
          {(!pastDate && !funded) && (
            <StyledAssetDetailsContributeButton
              type="primary"
              onClick={() => this.handlePopupState(true)}
              disabled={
                daysToGo < 0
                || maxInvestment === 0
                || selectedAmountUsd < minInvestment
              }
            >
              Contribute
            </StyledAssetDetailsContributeButton>
          )}
          <AssetDetailsManagerInfo
            address={assetManager}
            addressShortened={shortenAddress(assetManager, 5, 2)}
            managerPercentage={managerPercentage}
            collateralPercentage={collateralPercentage}
          />
        </StyledAssetDetailsRightCol>
      </StyledAssetDetails>
    );
  }
}

export default AssetDetails;
