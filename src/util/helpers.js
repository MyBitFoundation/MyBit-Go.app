import cryptocurrencyAtmCategoryImage from '../images/category-cryptocurrency-atm.png';
import solarEnergyCategoryImage from '../images/category-solar-energy.png';

export const parseEtherFromBalance = (web3, balance) => web3.fromWei(parseInt(balance, 10), 'ether');

export const mergeAllLogsByAssetId = (logs) => {
  const assets = [];
  logs.forEach((logEntry, index, array) => {
    if (index === 0) {
      assets.push({ ...logEntry });
      return;
    }
    if (logEntry.assetID === array[index - 1].assetID) {
      const duplicateIndex = assets.map(asset => asset.assetID).indexOf(logEntry.assetID);
      if (duplicateIndex > -1) {
        assets[duplicateIndex] = { ...logEntry, ...array[index - 1], ...assets[duplicateIndex] };
      } else {
        assets.push({ ...logEntry, ...array[index - 1] });
      }
    } else {
      assets.push({ ...logEntry });
    }
  });
  return assets;
};

export const mergeAndSumFundingEvents = (fundingEvents) => {
  const assets = [];
  const fundingEventsWithNumbers = fundingEvents
    .map(({ assetID, currentEthPrice }) => ({ assetID, currentEthPrice: Number(currentEthPrice) }));
  fundingEventsWithNumbers.forEach((logEntry, index, array) => {
    if (index === 0) {
      assets.push({ ...logEntry });
      return;
    }
    if (logEntry.assetID === array[index - 1].assetID) {
      const duplicateIndex = assets.map(asset => asset.assetID).indexOf(logEntry.assetID);
      if (duplicateIndex > -1) {
        assets[duplicateIndex] = {
          ...logEntry,
          ...array[index - 1],
          ...assets[duplicateIndex],
          currentEthPrice: assets[duplicateIndex].currentEthPrice + logEntry.currentEthPrice,
        };
      } else {
        assets.push({
          ...logEntry,
          ...array[index - 1],
          currentEthPrice: array[index - 1].currentEthPrice + logEntry.currentEthPrice,
        });
      }
    } else {
      assets.push({ ...logEntry });
    }
  });
  const totalAmountRaisedAssets =
    assets.map(({ assetID, currentEthPrice }) =>
      ({ assetID, totalAmountRaised: String(currentEthPrice) }));
  return totalAmountRaisedAssets;
};

export const getCategoryFromAssetTypeHash = (web3, assetTypeHash) => {
  switch (assetTypeHash) {
    case web3.utils.sha3('coffeemachine'):
      return 'coffeemachine';
    case web3.utils.sha3('bitcoinatm'):
      return 'bitcoinatm';
    default:
      return 'uncategorized';
  }
};

export const getAssetIDFromHash = (web3, assetIDHash) => {
  switch (assetIDHash) {
    case web3.utils.sha3('officecoffeemachine'):
      return 'officecoffeemachine';
    default:
      return '';
  }
};

export const getPrettyCategoryName = (category) => {
  switch (category) {
    case 'coffeemachine':
      return 'Coffee Machines';
    case 'uncategorized':
      return 'Uncategorized';
    default:
      return 'Unknown';
  }
};

export const getImageForCategory = (category) => {
  switch (category) {
    case 'coffeemachine':
      return cryptocurrencyAtmCategoryImage;
    case 'uncategorized':
      return solarEnergyCategoryImage;
    default:
      return cryptocurrencyAtmCategoryImage;
  }
};

