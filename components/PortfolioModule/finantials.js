import BN from 'bignumber.js';
import {
  fromWeiToEth,
} from 'utils/helpers';

BN.config({ EXPONENTIAL_AT: 80 });

export const getAllUserAssets = (assets, address) => assets
  .filter(asset => (asset.percentageOwnedByUser !== 0 || asset.isAssetManager));

const calculateAssetValue = (asset, toCalculate) => {
  if (asset.percentageOwnedByUser !== 0) {
    toCalculate.totalAssetValue = BN(toCalculate.totalAssetValue).plus(BN(asset.percentageOwnedByUser).times(asset.fundingGoal)).toNumber();
  }
};

const calculateAssetRevenue = (asset, toCalculate) => {
  const assetManagerRevenue = asset.isAssetManager ? asset.assetIncome : 0;
  toCalculate.totalAssetRevenue = BN(toCalculate.totalAssetRevenue).plus(assetManagerRevenue).toNumber();
};

const getInvestmentDetailsFromAsset = (asset, toCalculate) => {
  const {
    assetId,
    name,
    owedToInvestor,
    assetIncome,
    percentageOwnedByUser,
  } = asset;

  if (percentageOwnedByUser === 0) {
    return null;
  }

  const unrealizedProfit = fromWeiToEth(owedToInvestor);
  const totalProfit = BN(percentageOwnedByUser).times(assetIncome).toNumber();
  toCalculate.realisedProfitInvestor = BN(toCalculate.realisedProfitInvestor).plus(BN(totalProfit).minus(unrealizedProfit).toNumber()).toNumber();
  toCalculate.unrealisedProfitInvestor = BN(toCalculate.unrealisedProfitInvestor).plus(unrealizedProfit).toNumber();

  return {
    ...asset,
    totalProfit,
    ownership: percentageOwnedByUser,
    unrealizedProfit,
  };
};

const getManagerDetailsFromAsset = (asset, toCalculate) => {
  if (!asset.isAssetManager) {
    return null;
  }
  const {
    managerPercentage,
    managerTotalIncome,
    assetIncome,
    owedToAssetManager,
  } = asset;

  const totalProfitAssetManager = BN(assetIncome).times(managerPercentage).toNumber();
  toCalculate.realisedProfitManager = BN(toCalculate.realisedProfitManager).plus(BN(totalProfitAssetManager).minus(owedToAssetManager).toNumber()).toNumber();
  toCalculate.unrealisedProfitManager = BN(toCalculate.unrealisedProfitManager).plus(owedToAssetManager).toNumber();

  return {
    ...asset,
    totalProfitAssetManager,
    toWithdraw: owedToAssetManager,
  };
};

export const getPortfolioAssetDetails = (assets, cb) => {
  const toCalculate = {
    unrealisedProfitInvestor: 0,
    unrealisedProfitManager: 0,
    realisedProfitInvestor: 0,
    realisedProfitManager: 0,
    totalAssetValue: 0,
    totalAssetRevenue: 0,
  };
  const assetData = assets.map((asset) => {
    calculateAssetValue(asset, toCalculate);
    calculateAssetRevenue(asset, toCalculate);
    const managerDetails = getManagerDetailsFromAsset(asset, toCalculate);
    const investmentDetails = getInvestmentDetailsFromAsset(asset, toCalculate);

    return {
      investmentDetails,
      managerDetails,
      assetId: asset.assetId,
    };
  });

  const toReturn = {
    stats: {
      ...toCalculate,
    },
    assets: assetData,
  };

  return cb ? cb(toReturn) : toReturn;
};
