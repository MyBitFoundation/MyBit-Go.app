/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import axios from 'axios';
import dayjs from 'dayjs';
import { ErrorTypes } from 'constants/errorTypes';
import { ExternalLinks } from 'constants/links';
import {
  FundingStages,
  getFundingStage
} from 'constants/fundingStages';
import {
  BLOCK_NUMBER_CONTRACT_CREATION,
  getDefaultTokenContract,
  CROWDSALE_DURATION,
} from 'constants/app';
import {
  generateRandomURI,
  debug,
  fromWeiToEth,
  toWei,
} from '../utils/helpers';
import { CONTRACTS } from 'constants/supportedNetworks';

import BN from 'bignumber.js';
BN.config({ EXPONENTIAL_AT: 80 });

const GAS = require("@mybit/network.js/gas");

let Network;

export const initialiseSDK = (contractAddresses, blockNumber) => {
  Network = require('@mybit/network.js')(window.web3js, contractAddresses, blockNumber);
}

export const fetchTransactionHistory = async userAddress =>
  new Promise(async (resolve, reject) => {
    try {
      /*
    *  results from etherscan come in lower case
    *  its cheaper to create a var to hold the address in lower case,
    *  than it is to keep converting it for every iteration
    */
      const userAddressLowerCase = userAddress.toLowerCase();
      const endpoint = ExternalLinks.ETHERSCAN_TX_BY_ADDR_ENDPOINT(userAddress);
      const result = await fetch(endpoint);
      const jsonResult = await result.json();
      if (
        !jsonResult.message ||
        (jsonResult.message &&
          jsonResult.message !== 'No transactions found' &&
          jsonResult.message !== 'OK')
      ) {
        throw new Error(jsonResult.result);
      }

      const ethTransactionHistory = jsonResult.result
        .filter(txResult =>
          txResult.to === userAddressLowerCase || txResult.from === userAddressLowerCase)
        .map((txResult, index) => {
          const multiplier = txResult.from === userAddressLowerCase ? -1 : 1;
          let status = 'Confirmed';
          if (txResult.isError === '1') {
            status = 'Error';
          } else if (txResult.confirmations === 0) {
            status = 'Pending';
          }
          return {
            amount: window.web3js.utils.fromWei(txResult.value, 'ether') * multiplier,
            type: 'ETH',
            txId: txResult.hash,
            status,
            date: txResult.timeStamp * 1000,
            key: `${txResult.hash} ${index}`,
          };
        });

      resolve(ethTransactionHistory);
    } catch (error) {
      reject(error);
    }
  });

const roiEscrow = async assetId =>
  new Promise(async (resolve, reject) => {
    try {
      const assetCollateralContract = new window.web3js.eth.Contract(
        AssetCollateral.ABI,
        AssetCollateral.ADDRESS,
      );

      const response = await assetCollateralContract.methods
        .roiEscrow(assetId).call();
        debug(response)
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });

export const withdrawAssetManager = async (
  userAddress,
  assetId,
  onTransactionHash,
  onReceipt,
  onError,
  gasPrice,
) => {
  try {
    const assetManagerFunds = await Network.assetManagerFunds();
    assetManagerFunds.methods.withdraw(assetId)
      .send({ from: userAddress, gas: '200000', gasPrice})
      .on('transactionHash', (transactionHash) => {
        onTransactionHash();
      })
      .on('error', (error) => {
        processErrorType(error, onError);
      })
      .then(receipt => onReceipt(receipt.status));

  } catch (error) {
    processErrorType(error, onError)
  }
}

export const withdrawEscrow = async (
  userAddress,
  assetId,
  onTransactionHash,
  onReceipt,
  onError,
  gasPrice,
) => {
  try {
    const assetManagerEscrow = await Network.assetManagerEscrow();
    assetManagerEscrow.methods.unlockEscrow(assetId)
      .send({ from: userAddress, gas: '200000', gasPrice})
      .on('transactionHash', (transactionHash) => {
        onTransactionHash();
      })
      .on('error', (error) => {
        processErrorType(error, onError);
      })
      .then(receipt => onReceipt(receipt.status));
  } catch (error) {
    processErrorType(error, onError)
  }
}

export const fetchRevenueLogsByAssetId = async assetId => {
  try{
    return Network.getAssetIncome(assetId);
  }catch(err){
    debug(err);
    reject(err);
  }
}

export const createAsset = async (onCreateAsset, onApprove, params, network) => {
  try {
    const {
      userAddress,
      managerPercentage,
      collateral,
      amountToBeRaised,
      paymentTokenAddress,
      gasPrice,
      ipfs,
      modelId,
    } = params;

    const randomURI = generateRandomURI(window.web3js);
    const api = await Network.api();
    const response = await Network.createAsset({
      escrow: toWei(collateral),
      assetURI: randomURI,
      assetManager: userAddress,
      fundingLength: CROWDSALE_DURATION,
      amountToRaise: toWei(amountToBeRaised),
      assetManagerPercent: managerPercentage,
      fundingToken: getDefaultTokenContract(network),
      paymentToken: paymentTokenAddress,
      ipfs,
      modelID: modelId,
      createAsset: {
        onTransactionHash: onCreateAsset.onTransactionHash,
        onError: error => processErrorType(error, onCreateAsset.onError),
        gasPrice,
      },
      approve: {
        onTransactionHash: onApprove.onTransactionHash,
        onError: error => processErrorType(error, onApprove.onError),
        onReceipt: receipt => onApprove.onReceipt(receipt.status),
        gasPrice,
      }
    })

    onCreateAsset.onReceipt(response.asset);
  } catch (error) {
    debug(error)
  }
}

export const payoutAsset = ({
  userAddress,
  assetId,
  onTransactionHash,
  onReceipt,
  onError,
  gasPrice,
}) => {
  try {
    Network.payout({
      asset: assetId,
      from: userAddress,
      onTransactionHash,
      onError: error => processErrorType(error, onError),
      onReceipt,
      gasPrice,
    })
  } catch(error) {
    processErrorType(error, onError)
  }
}

export const withdrawInvestorProfit = async (
  userAddress,
  assetId,
  onTransactionHash,
  onReceipt,
  onError,
  gasPrice,
) => {
  try {
    const dividendToken = await Network.dividendToken(assetId);
    const response = await dividendToken.methods.withdraw()
      .send({from: userAddress, gas: '200000', gasPrice})
      .on('transactionHash', (transactionHash) => {
        onTransactionHash();
      })
      .on('error', (error) => {
        processErrorType(error, onError);
      })
      .then((receipt) => {
        onReceipt(receipt.status);
      });
  } catch (error) {
    processErrorType(error, onError)
  }
}

export const fundAsset = async (onFundAsset, onApprove, params) => {
  try {
    const {
      userAddress,
      assetId,
      amount,
      paymentToken,
      gasPrice,
    } = params;
    const response = await Network.fundAsset({
      asset: assetId,
      investor: userAddress,
      paymentToken,
      amount: toWei(amount),
      gasPrice,
      buyAsset: {
        onTransactionHash: onFundAsset.onTransactionHash,
        onError: error => processErrorType(error, onFundAsset.onError),
      },
      approve: {
        onTransactionHash: onApprove.onTransactionHash,
        onError: error => processErrorType(error, onFundAsset.onError),
        onReceipt: receipt => onApprove.onReceipt(receipt.status),
      }
    })

    onFundAsset.onReceipt(response.status);
  } catch (error) {
    processErrorType(error, onFundAsset.onError)
  }
}

const processErrorType = (error, handleError) => {
  console.log(error)
  if(error.message.includes("User denied transaction signature")){
    handleError(ErrorTypes.METAMASK);
  } else{
    handleError(ErrorTypes.ETHEREUM);
  };
}

const getAssetDetails = (api, assetId, blockNumber) => {
  try{
    return Promise.all([
      Network.dividendToken(assetId),
      api.methods.getAssetPlatformFee(assetId).call(),
      Network.getAssetOperator(assetId),
      api.methods.crowdsaleFinalized(assetId).call(),
      api.methods.getCrowdsaleDeadline(assetId).call(),
      Network.getFundingGoal(assetId),
      Network.getAssetInvestors(assetId),
      Network.getFundingProgress(assetId),
      api.methods.getAssetManagerFee(assetId).call(),
      window.web3js.eth.getBlock(blockNumber),
      api.methods.getAssetModelID(assetId).call(),
      api.methods.getAssetFundingToken(assetId).call(),
    ]);
  } catch(err){
    console.log("getAssetDetails error: ", err)
  }
}

const getExtraAssetDetails = (ownershipUnitsTmp, isAssetManager, apiContract, asset, userAddress) => {
  return Promise.all([
    getNumberOfInvestors(asset.assetId),
    ownershipUnitsTmp > 0 ? apiContract.methods.getAmountOwed(asset.assetId, userAddress).call() : 0,
    isAssetManager ? Promise.all([
          getManagerIncomeEarned(userAddress, asset.assetId),
          getManagerIncomeWithdraw(userAddress, asset.assetId)
        ]) : [0, 0],
    ]);
}

export const issueDividends = async (
  onDividendsIssued,
  onApprove,
  params,
) => {
  const {
    amount,
    address,
    assetId,
    gasPrice,
  } = params;
  try{
    const response = await Network.issueDividends({
      asset: assetId,
      account: address,
      amount: toWei(amount),
      gasPrice,
      buyAsset: {},
      issueDividends: {
        onTransactionHash: onDividendsIssued.onTransactionHash,
        onError: error => processErrorType(error, onDividendsIssued.onError),
      },
      approve: {
        onTransactionHash: onApprove.onTransactionHash,
        onError: error => processErrorType(error, onDividendsIssued.onError),
        onReceipt: receipt => onApprove.onReceipt(receipt.status),
      }
    })

    onDividendsIssued.onReceipt(response.status);
  } catch(error){
    processErrorType(error, onDividendsIssued.onError)
  }
}

export const getOperators = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const platformOperators = await Network.getOperators();
      return platformOperators;
    } catch(err){
      return {}
    }
  })

export const updateAssetListingIpfs = async ({
  userAddress,
  fundingToken,
  assetId,
  onTransactionHash,
  onReceipt,
  onError,
  gasPrice,
  ipfs,
}) => {
  try{
    const assetCreationContract = !fundingToken ? Network.crowdsaleGeneratorETH() : Network.crowdsaleGeneratorERC20()
    assetCreationContract.methods.updateIPFS(assetId,ipfs)
      .send({from: userAddress, gas: '80000', gasPrice: gasPrice})
      .on('error', error => processErrorType(error, onError))
      .on('transactionHash', onTransactionHash)
      .on('receipt', receipt => onReceipt(receipt.status))
  } catch(error){
    processErrorType(error, onError)
  }
}

export const fetchAsset = async (asset, userAddress) => {
  try{
    const api = await Network.api();
    const assetManagerFunds = await Network.assetManagerFunds();
    const {
      assetId,
      assetManager,
      blockNumber,
    } = asset;

    let [
      dividendToken,
      platformFee,
      assetOperator,
      crowdsaleFinalized,
      fundingDeadline,
      fundingGoal,
      assetInvestors,
      fundingProgress,
      managerPercentage,
      blockInfo,
      modelId,
      fundingToken,
    ] = await getAssetDetails(api, assetId, blockNumber);
    const listingDate = blockInfo.timestamp * 1000;
    const escrowId = await api.methods.getAssetManagerEscrowID(assetId, assetManager).call();
    const isAssetManager = assetManager === userAddress;

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
    totalShares = totalShares.toNumber();

    let percentageOwnedByUser = 0;
    let balanceOfUser = 0;
    let userInvestment = 0;

    const isInvestor = userAddress && assetInvestors.includes(userAddress);
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
      balanceOfUser = await dividendToken.methods.balanceOf(userAddress).call();
      userInvestment = fromWeiToEth(BN(balanceOfUser).toString());
      percentageOwnedByUser = BN(balanceOfUser).div(totalShares).toNumber();
    }

    if(crowdsaleFinalized){
      const timestamp = await Network.getTimestampOfFundedAsset(assetId)
      // no timestamp means payout has to be called (asset manager does it)
      if(timestamp){
        fundingProgress = fundingProgress - ((managerPercentage + platformFee) * fundingProgress)
        if(isInvestor){
          assetIncome = await dividendToken.methods.assetIncome().call();
          owedToInvestor = await dividendToken.methods.getAmountOwed(userAddress).call();
        }

        assetIncome = await dividendToken.methods.assetIncome().call();
        if(isAssetManager){
          daysSinceItWentLive = dayjs().diff(dayjs(timestamp * 1000), 'day');
          daysSinceItWentLive = daysSinceItWentLive === 0 ? 1 : daysSinceItWentLive;
          assetIncomeForCollateral = fromWeiToEth(assetIncome) * (1 - platformFee - managerPercentage);
          owedToAssetManager = await assetManagerFunds.methods.viewAmountOwed(assetId, userAddress).call();
        }

      } else if(isAssetManager) {
        managerHasToCallPayout = true;
      }
    }

    const searchQuery = `mybit_watchlist_${assetId}`;
    const watchListed = window.localStorage.getItem(searchQuery) === 'true';

    // determine whether asset has expired
    const dueDate = dayjs(fundingDeadline * 1000);
    const pastDate = dayjs() >= dueDate ? true : false;

    const fundingStageTmp = crowdsaleFinalized ? 0 : (!pastDate && !crowdsaleFinalized) ? 2 : 1;
    const fundingStage = getFundingStage(fundingStageTmp);

    const fundingProgressFormatted = fromWeiToEth(fundingProgress);
    const availableSharesFormatted = fromWeiToEth(availableShares);
    return {
      ...asset,
      modelId,
      managerHasToCallPayout,
      fundingStage,
      pastDate,
      isAssetManager,
      percentageOwnedByUser,
      daysSinceItWentLive,
      assetIncomeForCollateral,
      owedToInvestor,
      watchListed,
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
      fundingDeadline: fundingDeadline * 1000,
      numberOfInvestors: assetInvestors.length,
      funded: fundingStage === FundingStages.FUNDED,
      listingDate,
      fundingToken,
    }
  }catch(err){
    console.log(err)
  }

}

export const fetchAssets = async (userAddress,network, updateFunction) => {
  try {
    const [
      assets,
      operators,
      assetModels,
    ] = await Promise.all([
      Network.getTotalAssetsWithBlockNumberAndManager(),
      Network.getOperators(),
      Network.getAssetModels(getDefaultTokenContract(network)),
    ])

    console.log("operators")
    console.log(operators)
    console.log("assetModels")
    console.log(assetModels)
    console.log("assets")
    console.log(assets)

    const assetsRenamed =
      assets
        .map(({
          address,
          blockNumber,
          manager,
          ipfs,
        })=> {
          return {
            assetId: address,
            assetManager: manager,
            blockNumber,
            ipfs,
          }
        });

    const assetDetails = await Promise.all(assetsRenamed.map(asset => fetchAsset(asset, userAddress)));

    const objectToReturn = {};
    assetDetails.forEach(asset => objectToReturn[asset.assetId] = asset);
    updateFunction({
      assetListings: objectToReturn,
      operators,
      assetModels,
    });
  } catch (error) {
    debug('failed to fetch assets, error: ', error);
  }
}

export const subscribe = (onError, onUpdate, blockNumber) => Network.subscribe(onError, onUpdate, blockNumber)
