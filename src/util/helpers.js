import React from 'react';

import cryptocurrencyAtmCategoryImage from '../images/categories/Bitcoinatm.jpeg';
import autonomousvehiclesImage from '../images/categories/autonomousvehicles.png';
import cryptominingImage from '../images/categories/Cryptomining.jpeg';
import dronedeliveryImage from '../images/categories/dronedelivery.png';
import solarenergyImage from '../images/categories/Solar1.jpeg';
// import windenergyImage from '../images/categories/windenergy.png';
import otherImage from '../images/categories/other.png';
import realestatecoworkingImage from '../images/categories/Co-working.png';
import realestatestorageImage from '../images/categories/Storage.jpeg';
import masternodeImage from '../images/categories/Masternode.jpeg';
import chargeStationImage from '../images/categories/ChargeStation.png';
import vendingMachineImage from '../images/categories/VendingMachine.jpeg';

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
      return (
        <React.Fragment>
          <span style={{ display: 'block' }}>Real Estate</span>
          <span style={{ fontSize: '35px' }}>(Co-Working)</span>
        </React.Fragment>
      );
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
