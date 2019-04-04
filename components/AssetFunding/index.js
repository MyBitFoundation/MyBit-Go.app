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
import {
  MYBIT_FOUNDATION_SHARE,
  MYBIT_FOUNDATION_FEE,
} from 'constants/platformFees';
import BN from 'bignumber.js';
BN.config({ EXPONENTIAL_AT: 80 });

class AssetFunding extends React.Component {
  state = {
    selectedAmountEth: null,
    selectedOwnership: null,
    assetHasExpired: this.props.asset.pastDate,
    step: 0,
  };

  handleOnChangeEthValue = (number, maxOwnership, totalSupply, maxPercentageAfterFees) => {
    number > maxOwnership ?
      this.setState({
        selectedAmountEth: maxOwnership,
      })
      : this.setState({
          selectedAmountEth: number !== '0' ? Number(number) : null,
          selectedOwnership: number !== '0' ? parseFloat(((number / totalSupply) * 100).toFixed(2)) : null,
    })
  }

  handleOnChangePercentage = (number, maxOwnership, fundingGoal, maxInvestment, maxPercentageAfterFees, totalSupply) => {
    number > Number(maxOwnership)
      ? this.setState({
          selectedOwnership: maxOwnership,
        })
      : this.setState({
        selectedOwnership: Number(number),
        selectedAmountEth: totalSupply * (number / 100),
      })
  }

  handleOnChangeSlider = (number, totalSupply, maxPercentageAfterFees) => {
    this.setState({
      selectedAmountEth: number,
      selectedOwnership: parseFloat(((number / totalSupply) * 100).toFixed(2)),
    }, () => console.log(this.state))
  }

  changeStep = (step) => this.setState({step});

  resetStep = () => this.changeStep(0);

  handleDeadlineHit = () => {
    console.log("Hit deadline");
  }

  fundAsset = (amountToPay, amountContributed) => {
    this.changeStep(2);

    this.props.fundAsset(
      this.props.asset.assetId,
      amountToPay,
      amountContributed,
    );
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      asset: currentAsset,
    } = this.props;

    const {
      asset: newAsset,
    } = nextProps;

    if(!currentAsset.funded && newAsset.funded){
      this.changeStep(0);
    }
  }

  render(){
    const {
      selectedAmount,
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
      availableShares,
      totalSupply,
    } = asset;

    const {
      name,
    } = defaultData;

    const ended = pastDate || funded || assetHasExpired;

    const maxInvestment =
      ended
        ? 0
        : Number(availableShares.toFixed(2));

    console.log("maxInvestment: ", maxInvestment)

    let minInvestment =
       maxInvestment === 0 ? 0 : 100;

    if (maxInvestment <= 100 && maxInvestment > 0) {
      minInvestment = 0.01;
    }

    // Total fee: manager fee + platform fees (1%)
    const maxPercentageAfterFees = 100 - (managerPercentage * 100 + (MYBIT_FOUNDATION_SHARE * 100));
    console.log("maxPercentageAfterFees: ", maxPercentageAfterFees)
    const maxOwnership = ((maxInvestment * maxPercentageAfterFees) / fundingGoal).toFixed(2);
    console.log("maxOwnership:", maxOwnership)
    console.log("maxInvestment:", maxInvestment)
    let yourContribution = 0;
    let yourOwnership = 0;

    if(ended && (percentageOwnedByUser > 0)){
      yourContribution = fundingGoal * (percentageOwnedByUser / 100);
      console.log("yourContribution: ", yourContribution)
      yourOwnership = percentageOwnedByUser;
      console.log("yourOwnership: ", yourOwnership)
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
            totalSupply={totalSupply}
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
            cancel={this.resetStep}
          />
        )}
        {step === 2 && (
          <AssetFundingConfirming cancel={this.resetStep}/>
        )}
      </AssetFundingWrapper>
    );
  }
}


export default AssetFunding;
