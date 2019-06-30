import { getExpectedAndSlippage } from 'components/KyberContext';
import {
  toWei,
} from 'utils/helpers';

export const calculateSlippage = async (balances, fromToken, amountToPay) => {
  const tokensUserHas = balances ? Object.entries(balances) : [];

  const userTokensSlippage = await Promise.all(tokensUserHas.map(async ([key, value]) => {
    return getExpectedAndSlippage(fromToken, value.contractAddress, toWei(amountToPay))
  }))

  const tokenSlippagePercentages = {};
  userTokensSlippage.forEach((slippage, index) => {
    const { expectedRate, slippageRate } = slippage;
    const tokenName = tokensUserHas[index][0];
    const difference = expectedRate - slippageRate;
    const percentageDifference = difference / expectedRate * 100;
    tokenSlippagePercentages[tokenName] = percentageDifference.toFixed(2);
  });

  return tokenSlippagePercentages;
}
