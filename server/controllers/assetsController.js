import regeneratorRuntime from "regenerator-runtime";
require('dotenv').config();
import dayjs from 'dayjs';
import Web3 from 'web3';
import BN from 'bignumber.js';
import * as AirTableController from './airTableController';

BN.config({ EXPONENTIAL_AT: 80 });

const web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`));

const fromWeiToEth = weiValue => Number(web3.utils.fromWei(weiValue.toString(), 'ether'));

// TODO Change to /networks/main/ once live on mainnet
const SDK_CONTRACTS = require("@mybit/contracts/networks/ropsten/Contracts");

let Network;

export let assets = [];

export const getAssets = async () => {
  try{
    assets = await fetchAssets(AirTableController.assetListings, AirTableController.assetModels);
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

const fetchAssets = async (assetListingsAirtable, assetModelsAirtable) =>
  new Promise(async (resolve, reject) => {
    try {
      if(!Network){
        Network = require('@mybit/network.js')(web3, SDK_CONTRACTS, 0);
      }
      const api = await Network.api();
      const assetManagerFunds = await Network.assetManagerFunds();

      let assets = await Network.getTotalAssetsWithBlockNumberAndManager();
      assets =
        assets
          .filter(({ address }) => assetListingsAirtable[address] !== undefined)
          .map(({
            address,
            blockNumber,
            manager,
            ipfs,
          })=> {
            return {
              ...assetListingsAirtable[address],
              assetId: address,
              assetManager: manager,
              blockNumber,
              ipfs,
            }
          });

      const assetDetails = await Promise.all(assets.map(async asset =>  {
        const {
          assetId,
        } = asset;
        let [
          dividendToken,
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
        let daysSinceItWentLive = 1;
        let totalShares = 0;
        let availableShares = 0;

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

        const [
          remainingEscrow,
          escrowRedeemed,
          assetManagerCollateral,
        ] = await Promise.all([
          api.methods.getAssetManagerEscrowRemaining(escrowId).call(),
          api.methods.getAssetManagerEscrowRedeemed(escrowId).call(),
          api.methods.getAssetManagerEscrow(escrowId).call(),
        ])

        if(crowdsaleFinalized){
          const timestamp = await Network.getTimestampOfFundedAsset(assetId)
          // no timestamp means payout has to be called (asset manager does it)
          if(timestamp){
            fundingProgress = fundingProgress - ((managerPercentage + platformFee) * fundingProgress)
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
          fundingStage,
          pastDate,
          assetManager,
          daysSinceItWentLive,
          managerPercentage,
          fundingGoal: fromWeiToEth(fundingGoal),
          fundingProgress: (availableSharesFormatted < 0.01 && availableSharesFormatted > 0 && !crowdsaleFinalized) ? fundingProgressFormatted - 0.01 : fundingProgressFormatted,
          remainingEscrow: fromWeiToEth(remainingEscrow),
          assetManagerCollateral: fromWeiToEth(assetManagerCollateral),
          escrowRedeemed: fromWeiToEth(escrowRedeemed),
          availableShares: availableSharesFormatted,
          fundingDeadline: dueDate,
          numberOfInvestors: assetInvestors.length,
          funded: fundingStage === FundingStages.FUNDED,
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
    Network.dividendToken(assetId),
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
