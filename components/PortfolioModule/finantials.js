import {
  fromWeiToEth,
} from 'utils/helpers';

export const getAllUserAssets = (assets, address) =>
  assets
    .filter(asset => (asset.percentageOwnedByUser !== 0 || asset.isAssetManager))

const calculateAssetValue = (currentValue, asset) => {
  if(asset.percentageOwnedByUser !== 0){
    currentValue += asset.percentageOwnedByUser * asset.fundingGoal;
  }
  // An asset manager can invest in its own asset
  if(asset.isAssetManager){
    currentValue += asset.fundingGoal;
  }
  return currentValue;
}

const calculateAssetRevenue = (currentValue, asset) => {
  const investorRevenue = asset.percentageOwnedByUser * asset.assetIncome;

  const assetManagerRevenue = asset.isAssetManager ? (asset.managerPercentage / 100) * asset.assetIncome : 0;

  // An asset manager can invest in its own asset
  return currentValue + investorRevenue + assetManagerRevenue;
}

const getInvestmentDetailsFromAsset = (asset) => {
  const { 
    assetId,
    name,
    owedToInvestor,
    assetIncome,
    percentageOwnedByUser,
  } = asset;

  if(percentageOwnedByUser === 0){
    return null;
  }

  const unrealizedProfit = fromWeiToEth(owedToInvestor);
  const totalProfit = percentageOwnedByUser * assetIncome;

  return {
    ...asset,
    totalProfit,
    ownership: percentageOwnedByUser,
    unrealizedProfit,
  };
}

const getManagerDetailsFromAsset = (asset) => {
  if(!asset.isAssetManager){
    return null;
  }
  const {
    managerPercentage,
    managerTotalIncome,
    managerTotalWithdrawn,
    assetIncome,
    owedToAssetManager,
  } = asset;

  const totalProfitAssetManager = assetIncome * (managerPercentage / 100);

  return {
    ...asset,
    totalProfitAssetManager,
    toWithdraw: fromWeiToEth(owedToAssetManager),
  };
}

export const getPortfolioAssetDetails = (assets, cb) => {
  let totalAssetRevenue = 0;
  let totalAssetValue = 0;
  let totalManagementProfit = 0;
  const toReturn = assets.map(asset => {
    totalAssetValue = calculateAssetValue(totalAssetValue, asset);
    totalAssetRevenue = calculateAssetRevenue(totalAssetRevenue, asset);
    const managerDetails = getManagerDetailsFromAsset(asset);
    totalManagementProfit += asset.isAssetManager ? managerDetails.totalProfitAssetManager : 0;

    return {
      investmentDetails: getInvestmentDetailsFromAsset(asset),
      managerDetails,
      totalAssetValue,
      totalAssetRevenue,
      totalManagementProfit,
      assetId: asset.assetId,
    }
  })

  return cb ? cb(toReturn) : toReturn;
}

