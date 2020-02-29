const minABI = [
  // balanceOf
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
  // decimals
  {
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
  }
];

export const getBalanceOfERC20Token = async (tokenAddress, decimals, walletAddress) => {
  try{
    const contractData = ('0x70a08231000000000000000000000000' + walletAddress.substring(2));

    const result = await window.web3js.eth.call({
      to: tokenAddress, // Contract address, used call the token balance of the address in question
      data: contractData // Combination of contractData and tknAddress, required to call the balance of an address
    });

    const tokens = window.web3js.utils.toBN(result).toString(); // Convert the result to a usable number string
    const tokensFormatted = Number(window.web3js.utils.fromWei(tokens, 'ether')); // Change the string to be in Ether not Wei, and show it in the console
    return tokensFormatted;
  } catch(err) {
    console.error(err);
    return 0;
  }
}

export const getBalanceInDai = (supportedTokensInfo, tokenSymbol, balance) => {
  const tokenPriceInETH = tokenSymbol === 'ETH' ? 1 : supportedTokensInfo[tokenSymbol].currentPrice;
  const daiPriceInETH = supportedTokensInfo['DAI'].currentPrice;
  const ethInDai = 1 / daiPriceInETH;
  const balanceInETH = balance * tokenPriceInETH;
  const balanceInDai = balanceInETH * ethInDai;
  console.log(`${balance} ${tokenSymbol} = ${balanceInDai} DAI`)
  return balanceInDai;
}
