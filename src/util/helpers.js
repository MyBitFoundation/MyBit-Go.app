import cryptocurrencyAtmCategoryImage from '../images/categories/Bitcoinatm.jpeg';
import autonomousvehiclesImage from '../images/categories/autonomousvehicles.png';
import cryptominingImage from '../images/categories/Cryptomining.jpeg';
import dronedeliveryImage from '../images/categories/dronedelivery.png';
import solarenergyImage from '../images/categories/Solar1.jpeg';
// import windenergyImage from '../images/categories/windenergy.png';
import otherImage from '../images/categories/other.png';
import realestatecoworkingImage from '../images/categories/Co-working.png';
import realestatestorageImage from '../images/categories/Storage.jpeg'
import masternodeImage from '../images/categories/Masternode.jpeg';
import chargeStationImage from '../images/categories/ChargeStation.png';
import vendingMachineImage from '../images/categories/VendingMachine.jpeg';


export const parseEtherFromBalance = (web3, balance) =>
  web3.fromWei(parseInt(balance, 10), 'ether');

export const mergeAllLogsByAssetId = logs => {
  const assets = [];
  logs.forEach((logEntry, index, array) => {
    if (index === 0) {
      assets.push({ ...logEntry });
      return;
    }
    if (logEntry.assetID === array[index - 1].assetID) {
      const duplicateIndex = assets
        .map(asset => asset.assetID)
        .indexOf(logEntry.assetID);
      if (duplicateIndex > -1) {
        assets[duplicateIndex] = {
          ...logEntry,
          ...array[index - 1],
          ...assets[duplicateIndex]
        };
      } else {
        assets.push({ ...logEntry, ...array[index - 1] });
      }
    } else {
      assets.push({ ...logEntry });
    }
  });
  return assets;
};

export const mergeAndSumFundingEvents = fundingEvents => {
  const assets = [];
  const fundingEventsWithNumbers = fundingEvents.map(
    ({ assetID, currentEthPrice }) => ({
      assetID,
      currentEthPrice: Number(currentEthPrice)
    })
  );
  fundingEventsWithNumbers.forEach((logEntry, index, array) => {
    if (index === 0) {
      assets.push({ ...logEntry });
      return;
    }
    if (logEntry.assetID === array[index - 1].assetID) {
      const duplicateIndex = assets
        .map(asset => asset.assetID)
        .indexOf(logEntry.assetID);
      if (duplicateIndex > -1) {
        assets[duplicateIndex] = {
          ...logEntry,
          ...array[index - 1],
          ...assets[duplicateIndex],
          currentEthPrice:
            assets[duplicateIndex].currentEthPrice + logEntry.currentEthPrice
        };
      } else {
        assets.push({
          ...logEntry,
          ...array[index - 1],
          currentEthPrice:
            array[index - 1].currentEthPrice + logEntry.currentEthPrice
        });
      }
    } else {
      assets.push({ ...logEntry });
    }
  });
  const totalAmountRaisedAssets = assets.map(
    ({ assetID, currentEthPrice }) => ({
      assetID,
      totalAmountRaised: String(currentEthPrice)
    })
  );
  return totalAmountRaisedAssets;
};

export const getCategoryFromAssetTypeHash = (web3, assetTypeHash) => {
  switch (assetTypeHash) {
    case web3.utils.sha3('bitcoinatm'):
      return 'bitcoinatm';
    case web3.utils.sha3('cryptomining'):
      return 'cryptomining';
    case web3.utils.sha3('realestatestorage'):
      return 'realestatestorage';
    case web3.utils.sha3('realestatecoworking'):
      return 'realestatecoworking';
    case web3.utils.sha3('chargingstation'):
      return 'chargingstation';
    case web3.utils.sha3('dronedelivery'):
      return 'dronedelivery';
    case web3.utils.sha3('autonomousvehicles'):
      return 'autonomousvehicles';
    case web3.utils.sha3('solarenergy'):
      return 'solarenergy';
    case web3.utils.sha3('windenergy'):
      return 'other';
    case web3.utils.sha3('masternodes'):
      return 'masternodes';
    case web3.utils.sha3('vendingmachines'):
      return 'vendingmachines';
    default:
      return 'other';
  }
};

export const getPrettyCategoryName = category => {
  switch (category) {
    case 'bitcoinatm':
      return 'Bitcoin ATM';
    case 'cryptomining':
      return 'Crypto Mining';
    case 'realestatestorage':
      return 'Real Estate (Storage)';
    case 'realestatecoworking':
      return 'Real Estate (Co-Working)';
    case 'chargingstation':
      return 'Charging Station';
    case 'dronedelivery':
      return 'Drone Delivery';
    case 'autonomousvehicles':
      return 'Autonomous Vehicles';
    case 'solarenergy':
      return 'Energy';
    // case 'windenergy':
    //   return 'Energy';
    case 'masternodes':
      return 'Masternodes';
    case 'vendingmachines':
      return 'Vending Machines';
    default:
      return 'Other';
  }
};

export const getImageForCategory = category => {
  switch (category) {
    case 'bitcoinatm':
      return cryptocurrencyAtmCategoryImage;
    case 'autonomousvehicles':
      return autonomousvehiclesImage;
    case 'cryptomining':
      return cryptominingImage;
    case 'dronedelivery':
      return dronedeliveryImage;
    case 'solarenergy':
      return solarenergyImage;
    case 'realestatestorage':
      return realestatestorageImage;
    // case 'windenergy':
    //   return windenergyImage;
    case 'realestatecoworking':
      return realestatecoworkingImage;
    case 'masternodes':
      return masternodeImage;
    case 'chargingstation':
      return chargeStationImage;
    case 'vendingmachines':
      return vendingMachineImage;
    default:
      return otherImage;
  }
};
