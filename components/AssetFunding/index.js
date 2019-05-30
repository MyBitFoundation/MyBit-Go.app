import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
} from 'antd';
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
import {
  DEFAULT_TOKEN_MAX_DECIMALS,
} from 'constants/app';

import { TERMS_OF_SERVICE } from 'constants/termsOfService';
import { withTermsOfServiceContext } from 'components/TermsOfServiceContext';
import BN from 'bignumber.js';
BN.config({ EXPONENTIAL_AT: 80 });

class AssetFunding extends React.Component {
  state = {
    selectedAmountEth: null,
    selectedOwnership: null,
    assetHasExpired: this.props.asset.pastDate,
    step: 0,
    selectedMaxValue: false,
    renderToS: false,
  };

  handleOnChangeEthValue = (number, maxInvestment, totalSupply, maxPercentageAfterFees) => {
    // detect whether the user selected the max,
    // in that case we pass the availableShares as the contribution amount later
    if(number >= maxInvestment.toFixed(DEFAULT_TOKEN_MAX_DECIMALS)){
      this.setState({
        selectedAmountEth: maxInvestment.toFixed(DEFAULT_TOKEN_MAX_DECIMALS),
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
        selectedAmountEth: number !== '' ? parseFloat((totalSupply * (number / 100)).toFixed(DEFAULT_TOKEN_MAX_DECIMALS)) : null,
      })
    }
  }

  handleOnChangeSlider = (number, totalSupply, maxPercentageAfterFees, maxInvestment) => {
    this.setState({
      selectedAmountEth: number,
      selectedOwnership: parseFloat(((number / totalSupply) * 100).toFixed(2)),
      selectedMaxValue: number >= maxInvestment.toFixed(DEFAULT_TOKEN_MAX_DECIMALS) ? true : false,
    })
  }

  changeStep = (step) => this.setState({step});

  resetStep = () => this.changeStep(0);

  handleDeadlineHit = () => {
    console.log("Hit deadline");
  }

  fundAsset = (amountToPay, amountContributed, paymentToken, paymentTokenSymbol) => {
    const {
      readToS,
      setReadToS,
   } = this.props.ToSContext;

    const handleUIUpdate = () => {
      this.changeStep(2);

      this.props.fundAsset(
        this.props.asset.assetId,
        amountToPay,
        amountContributed,
        paymentToken,
        paymentTokenSymbol,
      );
    }

    if(!readToS){
      this.setState({
        renderToS: (
          <Modal
            visible={true}
            okButtonProps={{
              type: 'primary',
              text: 'Confirm',
            }}
            okText="I Agree"
            onOk={() => {
              this.setState({renderToS: undefined});
              handleUIUpdate(),
              setReadToS();
            }}
            onCancel={() => this.setState({renderToS: undefined})}
            title={`Terms of Service`}
          >
            {TERMS_OF_SERVICE}
          </Modal>
        ),
      })
    } else {
      handleUIUpdate();
    }
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
      renderToS,
    } = this.state;

    const {
      asset,
      handleAssetFavorited,
      fundAsset,
      updateNotification,
      loadingUserInfo,
      gasPrice,
      ToSContext,
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

    const { readToS } = ToSContext;

    const {
      name,
    } = defaultData;

    const ended = pastDate || funded || assetHasExpired;

    let maxInvestment = Number(availableShares.toFixed(2));

    let minInvestment = 0.01;

    if(ended){
      minInvestment = 0;
      maxInvestment = 0;
    } else if (maxInvestment < 0.01) {
      minInvestment = 0.01;
      maxInvestment = 0.01;
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
        {renderToS || null}
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
            selectedAmountEth={maxInvestment ===  0.01 && minInvestment === 0.01 ? 0.01 : selectedAmountEth}
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
            gasPrice={gasPrice}
            readToS={readToS}
          />
        )}
        {step === 2 && (
          <AssetFundingConfirming cancel={this.resetStep}/>
        )}
      </AssetFundingWrapper>
    );
  }
}


export default withTermsOfServiceContext(AssetFunding);
