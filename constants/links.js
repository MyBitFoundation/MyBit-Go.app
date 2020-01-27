
export const ExternalLinks = {
  METAMASK_FIREFOX: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/',
  METAMASK_CHROME: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
  METAMASK_OPERA: 'https://addons.opera.com/extensions/details/metamask/',
  ETHERSCAN_TX_BY_ADDR_ENDPOINT: address =>
    `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc`,
  ETHERSCAN_TX: txHash =>
    `https://api-ropsten.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}`,
  kyberSwapRopsten: (from, to) => `https://ropsten.kyber.network/swap/${from}-${to}`,
  getEtherscanAddressURL: (network, address) => `https://${network === 'ropsten' ? 'ropsten.' : ''}etherscan.io/address/${address}`,
  GAS_PRICE_URL: 'https://www.etherchain.org/api/gasPriceOracle',
  IPFS_GATEWAY_HASH: hash => `https://cloudflare-ipfs.com/ipfs/${hash}`
}
