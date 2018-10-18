import cryptocurrencyAtmCategoryImage from '../images/categories/Bitcoinatm.jpg';
import autonomousvehiclesImage from '../images/categories/autonomousvehicles.jpg';
import cryptominingImage from '../images/categories/Cryptomining.jpg';
import dronedeliveryImage from '../images/categories/dronedelivery.jpg';
import solarenergyImage from '../images/categories/Solar1.jpg';
// import windenergyImage from '../images/categories/windenergy.png';
import otherImage from '../images/categories/other.jpg';
import realestatecoworkingImage from '../images/categories/Co-working.jpg';
import realestatestorageImage from '../images/categories/Storage.jpg';
import masternodeImage from '../images/categories/Masternode.jpg';
import chargeStationImage from '../images/categories/ChargeStation.jpg';
import vendingMachineImage from '../images/categories/VendingMachine.jpg';

export const formatMonetaryValue = (number, fractionDigits = 0) => {
  let value = Number(number).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
  });

  const index = value.indexOf('.');

  if (index !== -1) {
    const sliced = value.substr(index, 3);
    value = sliced.length === 2 ? `${value}0` : value;
  }

  return value;
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

export const getPrettyCategoryName = (category) => {
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

export const getImageForCategory = (category) => {
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
