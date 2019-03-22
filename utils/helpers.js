import {
  DEFAULT_TOKEN,
} from 'constants/app';

export const debug = process.env.NODE_ENV === 'development' ? console.log : () => {};

export const fromWeiToEth = weiValue => window.web3js.utils.fromWei(weiValue.toString(), 'ether');

export const toWei = value => window.web3js.utils.toWei(value.toString(), 'ether');

export const convertTokenAmount = (convertTo, convertFrom, balances, amount) => {
  if(convertTo === convertFrom){
    return amount;
  }
  const tokenConvertTo = balances[convertTo];
  const tokenConvertFrom = balances[convertFrom];
  const amountInEth = amount * (tokenConvertFrom.currentPrice || 1);
  const amountFinal = amountInEth / (tokenConvertTo.currentPrice || 1);
  return amountFinal;
}

export const formatMonetaryValue = (number, fractionDigits = 0, includeToken = true, customToken) => {
  try {
    let value = Number(number).toLocaleString('en-US', {
      minimumFractionDigits: fractionDigits,
    });

    value = parseFloat(value).toString();

    const index = value.indexOf('.');

    if (index !== -1) {
      const sliced = value.substr(index, 3);
      value = sliced.length === 2 ? `${value}0` : value;
    }

    return includeToken ? `${value} ${customToken ? customToken : DEFAULT_TOKEN}` : value;
  }catch(err) {
    debug({
      "Function Name: ": "formatMonetaryValue()",
      err: err,
    });
    return 0;
  }
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

export const generateRandomURI = (web3) => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export const shortenAddress = (address, leftSide=15, rightSide=8) => {
  const size = address.length;
  let splitAddress = [address.slice(0, leftSide), address.slice(size - rightSide, size)]
  return splitAddress[0] + "..." + splitAddress[1];
}

export const getDayInText = number => {
  switch(number){
    case 0: return 'Sun';
    case 1: return 'Mon';
    case 2: return 'Tue';
    case 3: return 'Wed';
    case 4: return 'Fri';
    case 5: return 'Thu';
    case 6: return 'Sat';
    default: return '';
  }
}

export const getMonthInText = number => {
  switch(number){
    case 0: return 'Jan';
    case 1: return 'Fev';
    case 2: return 'Mar';
    case 3: return 'Apr';
    case 4: return 'May';
    case 5: return 'Jun';
    case 6: return 'Jul';
    case 7: return 'Aug';
    case 8: return 'Set';
    case 9: return 'Oct';
    case 10: return 'Nov';
    case 11: return 'Dec';
    default: return '';
  }
}
