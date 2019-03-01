import {
  fromWeiToEth,
} from 'utils/helpers';

export const getAllUserAssets = (assets, address, currentEthPrice) =>
  assets
    .filter(asset => (asset.ownershipUnits !== '0' || asset.isAssetManager))

const calculateAssetValue = (currentValue, asset, currentEthPrice) => {
  if(asset.ownershipUnits !== '0'){
    currentValue += fromWeiToEth(asset.ownershipUnits) * currentEthPrice;
  } else if(asset.isAssetManager){
    currentValue += asset.amountToBeRaisedInUSD;
  }
  return currentValue;
}

const calculateAssetRevenue = (currentValue, asset, currentEthPrice) => {
  const investorRevenue = ((fromWeiToEth(asset.ownershipUnits) * currentEthPrice) /
      asset.amountToBeRaisedInUSD) * asset.assetIncome;

  const assetManagerRevenue = asset.isAssetManager ? (asset.managerPercentage / 100) * asset.assetIncome : 0;

  // note: an asset manager can invest in its own assets
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
    ownershipUnits,
  } = asset;

  const ownership = (
      ((fromWeiToEth(ownershipUnits) * currentEthPrice) /
        amountToBeRaisedInUSD) * 100)

  if(ownership === 0){
    return null;
  }

  if (ownership > 100) {
    ownership = 100;
  }

  const unrealizedProfit = fromWeiToEth(owedToInvestor) * currentEthPrice;
  const totalProfit = (ownership / 100) * assetIncome;

  return {
    ...asset,
    totalProfit,
    ownership,
    unrealizedProfit,
  };
}

const getManagerDetailsFromAsset = (asset, currentEthPrice) => {
  if(!asset.isAssetManager){
    return null;
  }
  const {
    ownershipUnits,
    amountToBeRaisedInUSD,
    managerPercentage,
    managerTotalIncome,
    managerTotalWithdrawn,
    assetIncome,
  } = asset;

  const profit =
    ((fromWeiToEth(ownershipUnits) * currentEthPrice) /
      amountToBeRaisedInUSD) * assetIncome;

  const totalProfitAssetManager = assetIncome * (managerPercentage / 100);

  return {
    ...asset,
    profit,
    totalProfitAssetManager,
    toWithdraw: (fromWeiToEth(managerTotalIncome.toString()) * currentEthPrice) - (0 * currentEthPrice) ,
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

