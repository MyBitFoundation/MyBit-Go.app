import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose'
import { withMetamaskContext } from 'components/MetamaskChecker';
import { withBlockchainContext } from 'components/Blockchain';
import ERRORS from './errors';
import * as Brain from '../../apis/brain';
import dayjs from 'dayjs';

class ManageAssetModule extends React.Component{
  state = {
    loading: true,
  }

  processAssetInfo = async asset => {
    try{
      const {
        collateral,
        amountToBeRaisedInUSD,
        assetIncome,
        blockNumberitWentLive,
        assetManager,
      } = asset;

      // calculate collateral data to be displayed
      const remainingEscrow = window.web3js.utils.fromWei(await Brain.remainingEscrow(asset.assetId), 'ether');
      const percentageWithdrawn = remainingEscrow !== collateral ? 100 - ((remainingEscrow * 100) / collateral) : 0;
      const percentageWithdrawableCollateralUsd = ((assetIncome * 100) / amountToBeRaisedInUSD) / 100;
      const collateralData = [];
      for(let i = 1; i < 5; i++){
        const required = (25 * i)/100 * amountToBeRaisedInUSD;

        if(percentageWithdrawableCollateralUsd >= (25 * i) / 100){
          const withdrawable = ((25 * i) > percentageWithdrawn);
          collateralData.push({
            withdrawable,
            current: required,
            required,
            paidOut: !withdrawable,
          })
        } else {
          let current = 0;
          const minValue = i - 1 === 0 ? 0 : (25 * (i -1))/100;
          const maxValue = (25 * i)/100;
          if(percentageWithdrawableCollateralUsd < maxValue && percentageWithdrawableCollateralUsd > minValue){
            current = percentageWithdrawableCollateralUsd * amountToBeRaisedInUSD;
          }
          collateralData.push({
            withdrawable: false,
            current,
            required,
          })
        }
      }

      // calculate asset manager profits
      const assetManagerProfits = [];
      const revenueRawData = await Brain.fetchRevenueLogsByAssetId(asset.assetID);
      const revenueData = revenueRawData.map( revenue => {
        return {
          amount: fromWeiToEth(revenue.amount),
          date: dayjs(revenue.timestamp * 1000),
        }
      })

      let daysSinceItWentLive = 1;

      if(blockNumberitWentLive){
        const blockInfo = await window.web3js.eth.getBlock(blockNumberitWentLive);
        const timestamp = blockInfo.timestamp;

        daysSinceItWentLive = dayjs().diff(dayjs(timestamp * 1000), 'day');
        daysSinceItWentLive = daysSinceItWentLive === 0 ? 1 : daysSinceItWentLive;
      }

      //calculate how much the asset manager can withdraw
      const [totalIncome, totalWithdrawn] = await Promise.all([Brain.getManagerIncomeEarned(assetManager, asset.assetID), Brain.getManagerIncomeWithdraw(assetManager, asset.assetID)]);
      //set the state with the calculated data
      this.setState({
        loading: false,
        assetManagerProfits,
        collateralData,
        revenueData,
        daysSinceItWentLive,
        toWithdraw: totalIncome - totalWithdrawn,
      })
    }catch(err){
      console.log(err)
    }
  }

  componentDidMount = () => {
    this.getData();
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    const {
      blockchainContext,
      metamaskContext,
      assetId,
    } = this.props;

    const {
      loading,
      assets,
    } = blockchainContext;

    const {
      user,
    } = metamaskContext;

    const {
      blockchainContext: oldBlockchainContext,
      metamaskContext: oldMetamaskContext,
    } = prevProps;

    const {
      loading: oldLoading,
      assets: oldAssets,
    } = oldBlockchainContext;

    const {
      user: oldUser,
    } = oldMetamaskContext;

    if(user.address !== oldUser.address || loading.assets !== oldLoading.assets ||  oldAssets !== assets){
      console.log("Refreshing asset manager page");
      this.getData()
    }
  }

  getData = () => {
    const {
      blockchainContext,
      metamaskContext,
      assetId: requestedAssetId,
    } = this.props;

    const {
      loading,
      assets,
    } = blockchainContext;

    const {
      user,
    } = metamaskContext;

    if(loading.assets){
      this.setState({
        loading: true,
      })
    } else {
      const asset = assets.find(({ assetId }) => assetId === requestedAssetId);
      let errorType, assetInfo;
      if(!user.address){
        const metamaskErrorsToRender = false || metamaskContext.metamaskErrors('');
        this.setState({
          metamaskError: metamaskErrorsToRender,
        })
      }
      if(!asset){
        errorType = ERRORS.NO_ASSET;
      } else if (user.address !== asset.assetManager){
        errorType = ERRORS.NO_PERMISSION;
      } else if(!asset.funded && asset.pastDate){
        errorType = ERRORS.ASSET_FUNDING_FAILED;
      } else if(!asset.funded){
        errorType = ERRORS.ASSET_NOT_FUNDED;
      } else {
        assetInfo = this.processAssetInfo(asset);
      }
      this.setState({
        loading: false,
        error: {
          type: errorType,
        },
        assetInfo,
      })
    }
  }

  render = () => this.props.children(this.state);
 }

ManageAssetModule.propTypes = {
  assetId: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

const enhance = compose(
  withMetamaskContext,
  withBlockchainContext,
);

export default enhance(ManageAssetModule);;
