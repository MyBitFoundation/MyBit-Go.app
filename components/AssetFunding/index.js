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
    selectedMaxValue: false,
  };

  handleOnChangeEthValue = (number, maxInvestment, totalSupply, maxPercentageAfterFees) => {
    // detect whether the user selected the mass,
    // in that case we pass the availableShares as the contribution amount later
    if(number >= maxInvestment.toFixed(2)){
      this.setState({
        selectedAmountEth: maxInvestment.toFixed(2),
        selectedMaxValue: true,
      })
    } else {
      this.setState({
        selectedAmountEth: number !== '' ? Number(number) : null,
        selectedOwnership: number !== '' ? parseFloat(((number / totalSupply) * 100).toFixed(2)) : null,
        selectedMaxValue: false,
      })
    }
  }

  handleOnChangePercentage = (number, maxOwnership, fundingGoal, maxInvestment, maxPercentageAfterFees, totalSupply) => {
    if(number >= Number(maxOwnership)){
      this.setState({
        selectedOwnership: maxOwnership,
        selectedMaxValue: true,
      })

    } else {
      this.setState({
        selectedMaxValue: false,
        selectedOwnership: number !== '' ? Number(number) : null,
        selectedAmountEth: number !== '' ? parseFloat((totalSupply * (number / 100)).toFixed(2)) : null,
      })
    }
  }

  handleOnChangeSlider = (number, totalSupply, maxPercentageAfterFees, maxInvestment) => {
    this.setState({
      selectedAmountEth: number,
      selectedOwnership: parseFloat(((number / totalSupply) * 100).toFixed(2)),
      selectedMaxValue: number >= maxInvestment.toFixed(2) ? true : false,
    })
  }

  changeStep = (step) => this.setState({step});

  resetStep = () => this.changeStep(0);

  handleDeadlineHit = () => {
    console.log("Hit deadline");
  }

  fundAsset = (amountToPay, amountContributed, paymentToken, paymentTokenSymbol) => {
    this.changeStep(2);

    this.props.fundAsset(
      this.props.asset.assetId,
      amountToPay,
      amountContributed,
      paymentToken,
      paymentTokenSymbol,
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
      selectedMaxValue,
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
        : Number(availableShares);

    let minInvestment =
       maxInvestment === 0 ? 0 : 100;

    if (maxInvestment <= 100 && maxInvestment > 0) {
      minInvestment = 0.01;
    }


    // Total fee: manager fee + platform fees (1%)
    const maxPercentageAfterFees = 100 - (managerPercentage * 100 + (MYBIT_FOUNDATION_SHARE * 100));
    const maxOwnership = ((maxInvestment * maxPercentageAfterFees) / fundingGoal).toFixed(2);
    let yourContribution = 0;
    let yourOwnership = 0;

    if(ended && (percentageOwnedByUser > 0)){
      yourContribution = fundingGoal * (percentageOwnedByUser / 100);
      yourOwnership = percentageOwnedByUser;
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
            minInvestment={maxInvestment < 0.01 ? 0 : 0.1}
            maxInvestment={maxInvestment < 0.01 ? 0.01 : maxInvestment}
            selectedAmountEth={maxInvestment < 0.01 ? 0.01 : selectedAmountEth}
            totalSupply={totalSupply}
            handleOnChangeSlider={this.handleOnChangeSlider}
            handleOnChangePercentage={this.handleOnChangePercentage}
            handleOnChangeEthValue={this.handleOnChangeEthValue}
            handleDeadlineHit={this.handleDeadlineHit}
            handleConfirmationClicked={() => this.changeStep(1)}
            selectedMaxValue={selectedMaxValue}
          />
        )}
        {step === 1 && (
          <AssetFundingConfirm
            selectedOwnership={selectedOwnership}
            amount={maxInvestment < 0.01 ? 0.01 : selectedMaxValue ? maxInvestment : selectedAmountEth}
            fundAsset={this.fundAsset}
            cancel={this.resetStep}
            selectedMaxValue={selectedMaxValue}
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
