import { getExpectedAndSlippage } from 'utils/kyber';
import { toWei } from 'utils/helpers';

/*
* Use only for calculations with Platform and Default application tokens
*/
export const calculateSlippage = async (balances, toToken, amountToPay, convertingToDefaultToken) => {
  const tokensUserHas = balances ? Object.entries(balances) : [];
  const userTokensSlippage = await Promise.all(tokensUserHas.map(async ([key, value]) => {
    const { balanceInDai, contractAddress, balance } = value;
    const amountToConvert = amountToPay * balance / balanceInDai;
    return getExpectedAndSlippage(contractAddress, toToken, toWei(amountToConvert))
  }))
  const tokenSlippagePercentages = {};
  userTokensSlippage.forEach((slippage, index) => {
    const { expectedRate, slippageRate } = slippage;
    const tokenName = tokensUserHas[index][0];
    let toTokenExchangeRate;
    if(convertingToDefaultToken){
      toTokenExchangeRate = tokensUserHas[index][1].exchangeRateDefaultToken;
    } else {
      toTokenExchangeRate = tokensUserHas[index][1].exchangeRatePlatformToken;
    }
    const { expectedRate: expectedRateDefaultRate, slippageRate: slippageRateDefaultRate } = toTokenExchangeRate;
    const difference = slippageRateDefaultRate - slippageRate;
    const percentageDifference = difference / expectedRate * 100;
    tokenSlippagePercentages[tokenName] = percentageDifference <= 0 ? 0 : percentageDifference.toFixed(2);
  });

  return tokenSlippagePercentages;
}
