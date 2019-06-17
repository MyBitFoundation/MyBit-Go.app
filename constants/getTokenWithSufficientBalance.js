const getTokenWithSufficientBalance = (balances, amountToPay) =>  balances && Object.values(balances).find(token => token.balanceInDai >= amountToPay);

export default getTokenWithSufficientBalance;
