import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose'
import { withMetamaskContext } from 'components/MetamaskChecker';
import { withBlockchainContext } from 'components/Blockchain';
import { withTokenPricesContext } from 'components/TokenPrices';
import {
  formatMonetaryValue,
  fromWeiToEth,
} from 'utils/helpers';
import ERRORS from './errors';
import * as Brain from '../../apis/brain';
import dayjs from 'dayjs';

class ManageAssetModule extends React.Component{
  state = {
    loading: true,
  }

  processAssetInfo = async (props, asset) => {
    if(this._processingAssetInfo){
      return;
    } else {
      this._processingAssetInfo = true;
    }
    const {
      blockchainContext,
      pricesContext,
      metamaskContext,
    } = props;

    const {
      prices,
    } = pricesContext;

    const {
      withdrawingCollateral,
      withdrawingAssetManager,
      withdrawCollateral,
      withdrawProfitAssetManager,
    } = blockchainContext;

    try{
      const {
        assetId,
        collateral,
        amountToBeRaisedInUSD,
        assetIncome,
        blockNumberitWentLive,
        assetManager,
        managerPercentage,
      } = asset;

      console.log("Called processAssetInfo")

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
      const revenueRawData = await Brain.fetchRevenueLogsByAssetId(asset.assetId);
      const revenueData = revenueRawData.map(revenue => {
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
      const [totalIncome, totalWithdrawn] = await Promise.all([Brain.getManagerIncomeEarned(assetManager, asset.assetId), Brain.getManagerIncomeWithdraw(assetManager, asset.assetId)]);
      //set the state with the calculated data

      const mybitPrice = prices.mybit.price;
      const etherPrice = prices.ethereum.price;

      const profitUSD = assetIncome * (managerPercentage / 100);
      const profitETH = (profitUSD / etherPrice).toFixed(4);

      let withdrawMax;
      let percentageMax;

      let alreadyWithdrawn = 0;
      collateralData.forEach((data, index) => {
        if(data.paidOut){
          alreadyWithdrawn += 1;
        }
        else if(data.withdrawable){
          withdrawMax = (collateral / 4) * (index + 1 - alreadyWithdrawn);
          percentageMax = 25 * (index + 1 - alreadyWithdrawn);
        }
      })

      const averageProfitUSD = profitUSD / daysSinceItWentLive;
      const averageProfitETH = (profitETH / daysSinceItWentLive).toFixed(4);

      const toWithdraw = totalIncome - totalWithdrawn;
      const toWithdrawETH = window.web3js.utils.fromWei(toWithdraw.toString(), 'ether');
      const toWithdrawUSD = formatMonetaryValue(toWithdrawETH * etherPrice);

      const isWithdrawingCollateral = withdrawingCollateral.includes(assetId);
      const isWithdrawingAssetManager = withdrawingAssetManager.includes(assetId);

      console.log("isWithdrawingCollateral: ", isWithdrawingCollateral);
      this.setState({
        loading: false,
        assetInfo: {
          userAddress: metamaskContext.user.address,
          asset: asset,
          methods: {
            withdrawCollateral: !isWithdrawingCollateral ? () => withdrawCollateral(asset, percentageMax, withdrawMax) : undefined,
            withdrawProfitAssetManager: !isWithdrawingAssetManager ? () => withdrawProfitAssetManager(asset, toWithdrawUSD): undefined,
          },
          finantialDetails: {
            assetManagerProfits,
            collateralData,
            revenueData,
            toWithdrawETH,
            toWithdrawUSD,
            isWithdrawingCollateral,
            isWithdrawingAssetManager,
            profitUSD,
            profitETH,
            withdrawMax,
            percentageMax,
            averageProfitUSD,
            averageProfitETH,
          }
        }
      }, () => console.log(this.state));
      this._processingAssetInfo = false;
    }catch(err){
      this._processingAssetInfo = false;
      console.log(err)
    }
  }

  componentDidMount = () => {
    if(window){
      this.getData();
    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log("Refreshing asset manager page!");
    console.log("nextprops: ", nextProps);
    this.getData(nextProps);
  }

  getData = async (props) => {
    const {
      blockchainContext,
      metamaskContext,
      assetId: requestedAssetId,
      pricesContext,
    } = props || this.props;

    const {
      loading,
      assets,
    } = blockchainContext;

    const {
      user,
    } = metamaskContext;

    const {
      loading: loadingPrices,
      prices,
    } = pricesContext;

    if(loading.assets || loadingPrices){
      this.setState({
        loading: true,
      })
    } else {
      const asset = assets.find(({ assetId }) => assetId === requestedAssetId);
      let errorType, assetInfo;
      if(!asset){
        errorType = ERRORS.NO_ASSET;
      } else if (user.address !== asset.assetManager){
        errorType = ERRORS.NO_PERMISSION;
      } else if(!asset.funded && asset.pastDate){
        errorType = ERRORS.ASSET_FUNDING_FAILED;
      } else if(!asset.funded){
        errorType = ERRORS.ASSET_NOT_FUNDED;
      } else {
        this.processAssetInfo(props || this.props, asset);
      }

      console.log("errors: ", errorType)
      console.log("Loading: ", loading.assets || loadingPrices)

      if(errorType){
        this.setState({
          loading: false,
          error: {
            type: errorType,
          },
        })
      } else if(this.state.error){
        this.setState({
          loading: true,
          error: undefined,
        })
      }
    }
  }

  render = () => this.props.children({
    ...this.state,
    prices: this.props.pricesContext.prices,
  });
 }

ManageAssetModule.propTypes = {
  assetId: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

const enhance = compose(
  withMetamaskContext,
  withBlockchainContext,
  withTokenPricesContext,
);

export default enhance(ManageAssetModule);;
