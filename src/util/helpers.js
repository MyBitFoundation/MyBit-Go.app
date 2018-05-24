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
