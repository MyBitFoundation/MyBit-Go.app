const baseUrl = 'http://localhost'
const port = 8081;
const secondPort = 8082;
const host = `${baseUrl}:${port}`
const secondHost = `${baseUrl}:${secondPort}`
const apiEndpoint = 'https://api.mybit.io';

export const InternalLinks = {
  GAS_PRICE: `${apiEndpoint}/gasprice`,
}

export const ExternalLinks = {
  METAMASK_FIREFOX: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/',
  METAMASK_CHROME: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
  METAMASK_OPERA: 'https://addons.opera.com/extensions/details/metamask/',
  ETHERSCAN_TX_BY_ADDR_ENDPOINT: address =>
    `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc`,
  ETHERSCAN_TX: txHash =>
    `https://api-ropsten.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}`,
  kyberSwapRopsten: (from, to) => `https://ropsten.kyber.network/swap/${from}-${to}`,
  getEtherscanAddressURL: (network, address) => `https://${network === 'ropsten' ? 'ropsten.' : ''}etherscan.io/address/${address}`
}
