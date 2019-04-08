import {
  DEFAULT_TOKEN,
  PLATFORM_TOKEN,
} from 'constants/app';

export const debug = process.env.NODE_ENV === 'development' ? console.log : () => {};

export const fromWeiToEth = weiValue => Number(window.web3js.utils.fromWei(weiValue.toString(), 'ether'));

export const toWei = value => window.web3js.utils.toWei(value.toString(), 'ether');

export const convertTokenAmount = (convertTo, convertFrom, tokens, amount) => {
  if(convertTo === convertFrom){
    return Number(amount);
  }

  const tokenConvertTo = tokens[convertTo];
  const tokenConvertFrom = tokens[convertFrom];
  const amountInEth = amount * (tokenConvertFrom.currentPrice || 1);
  const amountFinal = amountInEth / (tokenConvertTo.currentPrice || 1);
  return amountFinal;
}

export const convertFromDefaultToken = (convertTo, tokens, amount) => {
  if(convertTo === DEFAULT_TOKEN){
    return Number(amount);
  }

  const tokenConvertTo = tokens[convertTo];

  return amount / tokenConvertTo.exchangeRateDefaultToken.expectedRate;
}

export const convertFromPlatformToken = (convertTo, tokens, amount) => {
  if(convertTo === PLATFORM_TOKEN){
    return Number(amount);
  }

  const tokenConvertTo = tokens[convertTo];

  return amount / tokenConvertTo.exchangeRatePlatformToken.expectedRate;
}

export const convertFromTokenToDefault = (convertFrom, tokens, amount) => {
  const tokenConvertFrom = tokens[convertFrom];

  return amount * tokenConvertFrom.exchangeRateDefaultToken.expectedRate;
}

export const getValueFromLocalStorage = (key, valueIfNoExists, isObject) => {
  try{
    if (typeof localStorage !== 'undefined') {
      let value = localStorage.getItem(key);
      if(isObject && value){
        value = JSON.parse(value);
      }
      if(!value){
        valueIfNoExists && setValueLocalStorage(key, valueIfNoExists, isObject);
        return valueIfNoExists;
      } else {
        return value;
      }
    }
  } catch(err){
    console.log(err)
  }

  return valueIfNoExists;
}

export const setValueLocalStorage = (key, value, isObject) => {
  try{
    if (typeof localStorage !== 'undefined') {
      if(isObject){
        localStorage.setItem(key, JSON.stringify(value))
      } else {
        localStorage.setItem(key, value);
      }
      return value;
    }
  } catch(err){
    console.log(err)
  }

  return value;
}

export const formatMonetaryValue = (number, fractionDigits = 2, includeToken = true, customToken) => {
  try {
    let value = Number(number).toLocaleString('en-US', {
      maximumFractionDigits: fractionDigits,
    });

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
    case 4: return 'Thu';
    case 5: return 'Fri';
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
