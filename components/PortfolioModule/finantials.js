import {
  fromWeiToEth,
} from 'utils/helpers';

export const getAllUserAssets = (assets, address, currentEthPrice) =>
  assets
    .filter(asset => (asset.percentageOwnedByUser !== 0 || asset.isAssetManager))

const calculateAssetValue = (currentValue, asset, currentEthPrice) => {
  if(asset.percentageOwnedByUser !== 0){
    currentValue += (asset.percentageOwnedByUser * asset.amountToBeRaisedInUSD) * currentEthPrice;
  }
  // An asset manager can invest in its own asset
  if(asset.isAssetManager){
    currentValue += asset.amountToBeRaisedInUSD;
  }
  return currentValue;
}

const calculateAssetRevenue = (currentValue, asset, currentEthPrice) => {
  const investorRevenue = (asset.percentageOwnedByUser * asset.assetIncome) * currentEthPrice;

  const assetManagerRevenue = asset.isAssetManager ? (asset.managerPercentage / 100) * asset.assetIncome : 0;

  // An asset manager can invest in its own asset
  return currentValue + investorRevenue + assetManagerRevenue;
}

const getInvestmentDetailsFromAsset = (asset, currentEthPrice) => {
  const { 
    assetId,
    name,
    amountToBeRaisedInUSD,
    amountRaisedInUSD,
    owedToInvestor,
    assetIncome,
    percentageOwnedByUser,
  } = asset;

  if(percentageOwnedByUser === 0){
    return null;
  }

  const unrealizedProfit = fromWeiToEth(owedToInvestor) * currentEthPrice;
  const totalProfit = (percentageOwnedByUser * assetIncome) / 100 ;

  return {
    ...asset,
    totalProfit,
    ownership: percentageOwnedByUser,
    unrealizedProfit,
  };
}

const getManagerDetailsFromAsset = (asset, currentEthPrice) => {
  if(!asset.isAssetManager){
    return null;
  }
  const {
    amountToBeRaisedInUSD,
    managerPercentage,
    managerTotalIncome,
    managerTotalWithdrawn,
    assetIncome,
  } = asset;

  const totalProfitAssetManager = assetIncome * (managerPercentage / 100);

  return {
    ...asset,
    totalProfitAssetManager,
    toWithdraw: (fromWeiToEth(managerTotalIncome.toString()) * currentEthPrice) - (0 * currentEthPrice),
  };
}

export const getPortfolioAssetDetails = (assets, currentEthPrice, cb) => {
  let totalAssetRevenue = 0;
  let totalAssetValue = 0;
  let totalManagementProfit = 0;
  const toReturn = assets.map(asset => {
    totalAssetValue = calculateAssetValue(totalAssetValue, asset, currentEthPrice);
    totalAssetRevenue = calculateAssetRevenue(totalAssetRevenue, asset, currentEthPrice);
    const managerDetails = getManagerDetailsFromAsset(asset, currentEthPrice);
    totalManagementProfit += asset.isAssetManager ? managerDetails.totalProfitAssetManager : 0;

    return {
      investmentDetails: getInvestmentDetailsFromAsset(asset, currentEthPrice),
      managerDetails,
      totalAssetValue,
      totalAssetRevenue,
      totalManagementProfit,
      assetId: asset.assetId,
    }
  })

  return cb ? cb(toReturn) : toReturn;
}

