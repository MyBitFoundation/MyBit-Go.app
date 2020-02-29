import React from 'react';
import { compose } from 'recompose'
import { withMetamaskContext } from 'components/MetamaskContext';
import { withBlockchainContext } from 'components/BlockchainContext';
import { withAssetsContext } from 'components/AssetsContext';
import { withThreeBoxContext } from 'components/ThreeBoxContext';
import {
  fromWeiToEth,
} from 'utils/helpers';
import ERRORS from './errors';
import * as Brain from '../../apis/brain';
import dayjs from 'dayjs';
import BN from 'bignumber.js';
BN.config({ EXPONENTIAL_AT: 80 });

class ManageAssetModule extends React.Component{
  state = {
    loading: true,
  }

  load3BoxSpaces = async (props, asset) => {
    const {
      threeBoxContext,
      metamaskContext
    } = props;

    const {
      user
    } = metamaskContext;

    const {
      openSpace,
      openBox,
      logout,
      postThread,
      getPostsFromThread,
      hasAuthorizedThreeBox,
      syncingThreeBox,
      syncingThreeBoxThread,
      loadingThreeBoxThreadAPIAuthorization,
      loadingThreeBoxSpaceAuthorization,
      loadingThreeBoxThreadPostRequest,
      hasOpenedGoSpace
    } = threeBoxContext;

    this.setState({
      threeBox: {
        hasAuthorizedThreeBox: hasAuthorizedThreeBox,
        hasOpenedGoSpace: hasOpenedGoSpace,
        syncingThreeBox: syncingThreeBox,
        syncingThreeBoxThread: syncingThreeBoxThread,
        loadingThreeBoxThreadPostRequest: loadingThreeBoxThreadPostRequest,
        loadingThreeBoxSpaceAuthorization: loadingThreeBoxSpaceAuthorization,
        loadingThreeBoxThreadAPIAuthorization: loadingThreeBoxThreadAPIAuthorization,
        methods: {
          authorizeThreeBoxSpace: () => user && user.address && openBox(user.address),
          openThreeBoxSpace: () => openSpace(),
          postUpdateOnThread: (update, callback) => postThread(asset.assetId, update, callback),
          getPostsFromCurrentThread: () => getPostsFromThread(asset.assetId)
        }
      }
    })
  }

  processAssetInfo = async (props, asset) => {
    if(this._processingAssetInfo){
      return;
    } else {
      this._processingAssetInfo = true;
    }
    const {
      blockchainContext,
      metamaskContext,
    } = props;

    const {
      withdrawingCollateral,
      withdrawingAssetManager,
      withdrawCollateral,
      withdrawProfitAssetManager,
      callingPayout,
      payoutAsset,
    } = blockchainContext;

    try{
      const {
        assetId,
        assetIncome,
        assetIncomeForCollateral,
        daysSinceItWentLive,
        assetManager,
        managerPercentage,
        fundingGoal,
        escrowRedeemed,
        remainingEscrow,
        assetManagerCollateral,
        owedToAssetManager,
        model,
        managerHasToCallPayout,
      } = asset;

      // calculate collateral data to be displayed
      const percentageWithdrawn = remainingEscrow !== assetManagerCollateral ? BN(100).minus(BN(remainingEscrow).times(100).div(assetManagerCollateral).toNumber()).toNumber() : 0;
      const percentageWithdrawableCollateral = ((assetIncomeForCollateral * 100) / fundingGoal) / 100;

      const collateralData = [];
      for(let i = 1; i < 5; i++){
        const required = (25 * i)/100 * fundingGoal;

        if(percentageWithdrawableCollateral >= (25 * i) / 100){
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
          if(percentageWithdrawableCollateral < maxValue && percentageWithdrawableCollateral > minValue){
            current = percentageWithdrawableCollateral * fundingGoal;
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
          amount: fromWeiToEth(revenue.payment),
          date: dayjs(revenue.timestamp * 1000),
        }
      })

      //calculate how much the asset manager can withdraw
      //const [totalIncome, totalWithdrawn] = await Promise.all([Brain.getManagerIncomeEarned(assetManager, asset.assetId), Brain.getManagerIncomeWithdraw(assetManager, asset.assetId)]);
      const totalIncome = assetIncome * managerPercentage;
      //set the state with the calculated data
      const profit = assetIncome * managerPercentage;
      let withdrawMax;
      let percentageMax;

      let alreadyWithdrawn = 0;
      collateralData.forEach((data, index) => {
        if(data.paidOut){
          alreadyWithdrawn += 1;
        }
        else if(data.withdrawable){
          withdrawMax = (assetManagerCollateral / 4) * (index + 1 - alreadyWithdrawn);
          percentageMax = 25 * (index + 1 - alreadyWithdrawn);
        }
      })

      const averageProfit = profit / daysSinceItWentLive;

      const isWithdrawingCollateral = withdrawingCollateral.includes(assetId);
      const isWithdrawingAssetManager = withdrawingAssetManager.includes(assetId);
      const isCallingPayout = callingPayout.includes(assetId);

      if(this._mounted !== false){
        this.setState({
          loading: false,
          assetInfo: {
            userAddress: metamaskContext.user.address,
            asset: asset,
            methods: {
              withdrawCollateral: !isWithdrawingCollateral ? () => withdrawCollateral(asset, percentageMax, withdrawMax) : undefined,
              withdrawProfitAssetManager: !isWithdrawingAssetManager ? () => withdrawProfitAssetManager(asset, owedToAssetManager) : undefined,
              payoutAsset: (!isCallingPayout && managerHasToCallPayout) ? () => payoutAsset({assetId, model}) : undefined,
            },
            finantialDetails: {
              assetManagerProfits,
              collateralData,
              revenueData,
              toWithdraw: owedToAssetManager,
              isWithdrawingCollateral,
              isWithdrawingAssetManager,
              profit,
              withdrawMax,
              percentageMax,
              averageProfit,
              isCallingPayout,
            }
          }
        });
      }
      this._processingAssetInfo = false;
    }catch(err){
      this._processingAssetInfo = false;
      console.error(err)
    }
  }

  componentDidMount = () => {
    if(window){
      this.getData();
    }
  }

  componentWillUnmount = () => {
    this._mounted = false;
    this.props.threeBoxContext.logout();
  }

  /*componentDidUpdate(prevProps) {
    console.log("ManageAssetModule componentDidUpdate")
    this.getData(prevProps);
  }*/

  getData = async (props) => {
    const {
      assetsContext,
      metamaskContext,
      assetId: requestedAssetId,
    } = props || this.props;

    const {
      loadingAssets,
      assets,
    } = assetsContext;

    const {
      user,
    } = metamaskContext;

    if(loadingAssets){
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
      } else {
        this.load3BoxSpaces(props || this.props, asset);
        this.processAssetInfo(props || this.props, asset);
      }

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

  render = () => this.props.children(this.state);
 }

const enhance = compose(
  withThreeBoxContext,
  withMetamaskContext,
  withBlockchainContext,
  withAssetsContext,
);

export default enhance(ManageAssetModule);
