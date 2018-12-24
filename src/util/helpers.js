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

export const getCategoryFromAssetTypeHash = (assetTypeHash, categoriesAirTable) => {
  for(let entry of Object.entries(categoriesAirTable)){
    const value = entry[1];
    if(value.encoded === assetTypeHash) return value.contractName;
  }
};

export const getPrettyCategoryName = (category, categoriesAirTable) => {
  for(let entry of Object.entries(categoriesAirTable)){
    const [key, value] = entry;
    if(value.contractName === category) return key;
  }
};

export const generateAssetId = (web3, address, managerPercentage, amountToBeRaisedInUSD, installerId, assetType, blockNumber) => {
  return web3.utils.soliditySha3(
    address,
    '0', // escrow is 0 by default
    managerPercentage.toString(),
    amountToBeRaisedInUSD.toString(),
    installerId,
    assetType,
    blockNumber.toString(),
  )
}

export const generateRandomHex = (web3) => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return web3.utils.sha3(text);
}

export const shortenAddress = (address, leftSide=15, rightSide=8) => {
  const size = address.length;
  let splitAddress = [address.slice(0, leftSide), address.slice(size - rightSide, size)]
  return splitAddress[0] + "..." + splitAddress[1];
}
