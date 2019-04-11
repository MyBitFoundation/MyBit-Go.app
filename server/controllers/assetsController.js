import regeneratorRuntime from "regenerator-runtime";
require('dotenv').config();
import dayjs from 'dayjs';
import Web3 from 'web3';
import BN from 'bignumber.js';
import * as AirTableController from './airTableController';

BN.config({ EXPONENTIAL_AT: 80 });

const web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`));

const fromWeiToEth = weiValue => Number(web3.utils.fromWei(weiValue.toString(), 'ether'));

const SDK_CONTRACTS = require("@mybit/contracts/networks/ropsten/Contracts");

let Network;

export let assets = [];

export const getAssets = async () => {
  try{
    if(AirTableController.assetsById){
      console.log("getting assets...")
      assets = await fetchAssets(undefined, AirTableController.assetsById);
    }
  }catch(err){
    console.log(err)
  }
}

const FundingStages = {
  FUNDED: 'funded',
  FAILED: 'failed',
  IN_PROGRESS: 'in_progress',
};

const getFundingStage = (fundingStageNumber) => {
  switch(fundingStageNumber){
    case 0:
      return FundingStages.FUNDED;
    case 1:
      return FundingStages.FAILED;
    case 2:
      return FundingStages.IN_PROGRESS;
  }
}

const fetchAssets = async (userAddress, assetsAirTableById) =>
  new Promise(async (resolve, reject) => {
    try {
      if(!Network){
        Network = require('@mybit/network.js')(web3, SDK_CONTRACTS);
      }
      const realAddress = userAddress && web3.utils.toChecksumAddress(userAddress);
      const api = await Network.api();
      const assetManagerFunds = await Network.assetManagerFunds();

      const database = await Network.database();
      const events = await Network.events();

      let assets = await Network.getTotalAssets();
      assets =
        assets
          .filter(assetContractAddress => assetsAirTableById[assetContractAddress] !== undefined)
          .map(assetContractAddress => {
            return {
              ...assetsAirTableById[assetContractAddress],
              assetId: assetContractAddress,
            }
          });

      const assetDetails = await Promise.all(assets.map(async asset =>  {
        const {
          assetId,
        } = asset;
        let [
          dividendTokenETH,
          platformFee,
          assetOperator,
          crowdsaleFinalized,
          fundingDeadline,
          fundingGoal,
          assetManager,
          assetInvestors,
          fundingProgress,
          managerPercentage
        ] = await getAssetDetails(api, assetId);

        const escrowId = await api.methods.getAssetManagerEscrowID(assetId, assetManager).call();
        const escrow = await api.methods.getAssetManagerEscrow(escrowId).call();
        const isAssetManager = assetManager === realAddress;
        let daysSinceItWentLive = 1;
        let assetIncome = 0;
        let managerHasToCallPayout = false;
        let totalShares = 0;
        let availableShares = 0;
        let owedToInvestor = 0;
        let owedToAssetManager = 0;
        let assetIncomeForCollateral = 0;

        managerPercentage = BN(managerPercentage);
        platformFee = BN(platformFee);
        fundingGoal = BN(fundingGoal);
        fundingProgress = BN(fundingProgress);
        totalShares = fundingGoal.plus(managerPercentage).plus(platformFee);
        availableShares = totalShares.minus(managerPercentage).minus(platformFee).minus(fundingProgress);
        managerPercentage = managerPercentage.div(totalShares).toNumber();
        platformFee = platformFee.div(totalShares).toNumber();
        fundingGoal = fundingGoal.toNumber();

        availableShares = availableShares.toNumber();
        if(availableShares < 0){
          availableShares = 0;
        }
        totalShares = totalShares.toNumber();

        let percentageOwnedByUser = 0;
        let balanceOfUser = 0;
        let userInvestment = 0;

        const isInvestor = realAddress && assetInvestors.includes(realAddress);
        const [
          remainingEscrow,
          escrowRedeemed,
          assetManagerCollateral,
        ] = await Promise.all([
          api.methods.getAssetManagerEscrowRemaining(escrowId).call(),
          api.methods.getAssetManagerEscrowRedeemed(escrowId).call(),
          api.methods.getAssetManagerEscrow(escrowId).call(),
        ])

        if(isInvestor){
          balanceOfUser = await dividendTokenETH.methods.balanceOf(realAddress).call();
          userInvestment = fromWeiToEth(BN(balanceOfUser).toString());
          percentageOwnedByUser = BN(balanceOfUser).div(totalShares).toNumber();
        }

        if(crowdsaleFinalized){
          const timestamp = await Network.getTimestampOfFundedAsset(assetId)
          // no timestamp means payout has to be called (asset manager does it)
          if(timestamp){
            fundingProgress = fundingProgress - ((managerPercentage + platformFee) * fundingProgress)
            if(isInvestor){
              assetIncome = await dividendTokenETH.methods.assetIncome().call();
              owedToInvestor = await dividendTokenETH.methods.getAmountOwed(realAddress).call();
            }
            if(isAssetManager){
              assetIncome = await dividendTokenETH.methods.assetIncome().call();
              daysSinceItWentLive = dayjs().diff(dayjs(timestamp * 1000), 'day');
              daysSinceItWentLive = daysSinceItWentLive === 0 ? 1 : daysSinceItWentLive;
              assetIncomeForCollateral = fromWeiToEth(assetIncome) * (1 - platformFee - managerPercentage);
              owedToAssetManager = await assetManagerFunds.methods.viewAmountOwed(assetId, realAddress).call();
            }

          } else if(isAssetManager) {
            managerHasToCallPayout = true;
          }
        }

        // determine whether asset has expired
        const dueDate = dayjs(fundingDeadline * 1000);
        const pastDate = dayjs() >= dueDate ? true : false;

        const fundingStageTmp = crowdsaleFinalized ? 0 : (!pastDate && !crowdsaleFinalized) ? 2 : 1;
        const fundingStage = getFundingStage(fundingStageTmp);

        const fundingProgressFormatted = fromWeiToEth(fundingProgress);
        const availableSharesFormatted = fromWeiToEth(availableShares);
        return {
          ...asset,
          managerHasToCallPayout,
          fundingStage,
          pastDate,
          isAssetManager,
          assetManager,
          percentageOwnedByUser,
          daysSinceItWentLive,
          assetIncomeForCollateral,
          owedToInvestor,
          userInvestment,
          managerPercentage,
          fundingGoal: fromWeiToEth(fundingGoal),
          fundingProgress: (availableSharesFormatted < 0.01 && availableSharesFormatted > 0 && !crowdsaleFinalized) ? fundingProgressFormatted - 0.01 : fundingProgressFormatted,
          assetIncome: fromWeiToEth(assetIncome),
          owedToAssetManager: fromWeiToEth(owedToAssetManager),
          remainingEscrow: fromWeiToEth(remainingEscrow),
          assetManagerCollateral: fromWeiToEth(assetManagerCollateral),
          escrowRedeemed: fromWeiToEth(escrowRedeemed),
          totalSupply: fromWeiToEth(totalShares),
          availableShares: availableSharesFormatted,
          fundingDeadline: dueDate,
          numberOfInvestors: assetInvestors.length,
          funded: fundingStage === FundingStages.FUNDED,
          defaultData: {
            ...asset["defaultData"],
            assetIDs: undefined,
            fundingGoal: undefined,
          }
        };
      }));

      resolve(assetDetails);
    } catch (error) {
      console.log(error)
      reject(error);
    }
  });

const getAssetDetails = (api, assetId) => {
  return Promise.all([
      Network.dividendTokenETH(assetId),
      api.methods.getAssetPlatformFee(assetId).call(),
      Network.getAssetOperator(assetId),
      api.methods.crowdsaleFinalized(assetId).call(),
      api.methods.getCrowdsaleDeadline(assetId).call(),
      Network.getFundingGoal(assetId),
      Network.getAssetManager(assetId),
      Network.getAssetInvestors(assetId),
      Network.getFundingProgress(assetId),
      api.methods.getAssetManagerFee(assetId).call(),
    ]);
}

// Refresh assets every 30 seconds
setInterval(getAssets, 30000)
