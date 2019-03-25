import React from 'react';
import PropTypes from 'prop-types';
import AssetDetailsManagerInfo from 'components/AssetDetailsManagerInfo';
import AssetDetailsInfo from 'components/AssetDetailsInfo';
import AssetFundingSelector from 'components/AssetFundingSelector';
import AssetFundingWrapper from './assetFundingWrapper';
import AssetFundingConfirm from 'components/AssetFundingConfirm';
import AssetFundingConfirming from 'components/AssetFundingConfirming';
import {
  formatMonetaryValue,
  shortenAddress,
  fromWeiToEth,
  toWei,
} from 'utils/helpers';

class AssetFunding extends React.Component {
  state = {
    selectedAmountEth: null,
    selectedOwnership: null,
    assetHasExpired: this.props.asset.pastDate,
    step: 0,
  };

  handleOnChangeEthValue = (number, maxOwnership, fundingGoal, maxPercentageAfterFees) => {
    number > maxOwnership ?
      this.setState({
        selectedAmountEth: maxOwnership,
      })
      : this.setState({
          selectedAmountEth: number !== '0' ? Number(number) : null,
          selectedOwnership: number !== '0' ? parseFloat(((number * (maxPercentageAfterFees)) / fundingGoal).toFixed(2)) : null,
    })
  }

  handleOnChangePercentage = (number, maxOwnership, fundingGoal, maxInvestment, maxPercentageAfterFees) => {
    number > Number(maxOwnership)
      ? this.setState({
          selectedOwnership: maxOwnership,
        })
      : this.setState({
        selectedOwnership: Number(number),
        selectedAmountEth: parseFloat((maxInvestment * (number / (maxPercentageAfterFees))).toFixed(2)),
      })
  }

  handleOnChangeSlider = (number, fundingGoal, maxPercentageAfterFees) => {
    this.setState({
      selectedAmountEth: number,
      selectedOwnership: parseFloat(((number * (maxPercentageAfterFees)) / fundingGoal).toFixed(2)),
    })
  }

  changeStep = (step) => this.setState({step});

  handleDeadlineHit = () => {
    console.log("Hit deadline");
  }

  handleConfirmClicked = () => {
    const {
      metamaskContext,
    } = this.props;

    const {
      userHasMetamask,
      network,
      userIsLoggedIn,
      extensionUrl,
      privacyModeEnabled,
    } = metamaskContext;

    if (!this.state.acceptedTos) {
      this.setState({
        alertType: 'error',
        alertMessage: 'Please accept the Terms and Conditions before continuing.',
      });
      return null;
    }

    const metamaskErrorsToRender = false || metamaskContext.metamaskErrors();
    if(metamaskErrorsToRender.error){
      this.setState({
        alertType: 'error',
        alertMessage: metamaskErrorsToRender.render,
      });
      return null;
    }

    this.setState({
      isLoading: true,
    })

    this.props.fundAsset(
      this.props.assetId,
      this.props.amount,
      this.onSuccess,
      this.onFailure,
    );

    this.props.handlePopupState(false);

    return null;
  }

  fundAsset = () => {
    this.changeStep(2);

    this.props.fundAsset(
      this.props.asset.assetId,
      this.state.selectedAmountEth,
    );
  }

  render(){
    const {
      selectedAmountUsd,
      selectedAmountEth,
      selectedOwnership,
      assetHasExpired,
      step,
    } = this.state;

    const {
      asset,
      handleAssetFavorited,
      fundAsset,
      updateNotification,
      loadingUserInfo,
    } = this.props;

    const {
      assetId,
      managerPercentage,
      funded,
      pastDate,
      percentageOwnedByUser,
      defaultData,
      fundingGoal,
      fundingProgress,
    } = asset;

    const {
      name,
    } = defaultData;

    const ended = pastDate || funded || assetHasExpired;

    const maxInvestment =
      ended
        ? 0
        : fundingGoal - fundingProgress;

    let minInvestment =
       maxInvestment === 0 ? 0 : 100;

    if (maxInvestment <= 100 && maxInvestment > 0) {
      minInvestment = 0.01;
    }

    // Total fee: manager fee + platform fees (1%)
    const maxPercentageAfterFees = 100 - (managerPercentage * 100 - 1);
    const maxOwnership = ((maxInvestment * maxPercentageAfterFees) / fundingGoal).toFixed(2);
    let yourContribution = 0;
    let yourOwnership = 0;

    if(ended && (percentageOwnedByUser > 0)){
      yourContribution = fundingGoal * (percentageOwnedByUser / 100);
      yourOwnership = (yourContribution * 100) / fundingGoal;
    }

    return (
      <AssetFundingWrapper>
        {step === 0 && (
          <AssetFundingSelector
            maxPercentageAfterFees={maxPercentageAfterFees}
            asset={asset}
            ended={ended}
            loadingUserInfo={loadingUserInfo}
            maxOwnership={maxOwnership}
            yourOwnership={yourOwnership}
            yourContribution={yourContribution}
            formatMonetaryValue={formatMonetaryValue}
            selectedOwnership={selectedOwnership}
            minInvestment={minInvestment}
            maxInvestment={maxInvestment}
            selectedAmountEth={selectedAmountEth}
            handleOnChangeSlider={this.handleOnChangeSlider}
            handleOnChangePercentage={this.handleOnChangePercentage}
            handleOnChangeEthValue={this.handleOnChangeEthValue}
            handleDeadlineHit={this.handleDeadlineHit}
            handleConfirmationClicked={() => this.changeStep(1)}
          />
        )}
        {step === 1 && (
          <AssetFundingConfirm
            selectedOwnership={selectedOwnership}
            amount={selectedAmountEth}
            fundAsset={this.fundAsset}
          />
        )}
        {step === 2 && (
          <AssetFundingConfirming />
        )}
      </AssetFundingWrapper>
    );
  }
}


export default AssetFunding;
