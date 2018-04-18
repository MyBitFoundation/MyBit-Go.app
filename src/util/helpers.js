export const parseEtherFromBalance = (web3, balance) =>
  web3.fromWei(parseInt(balance, 10), 'ether');
