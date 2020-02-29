
export const ExternalLinks = {
  METAMASK_FIREFOX: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/',
  METAMASK_CHROME: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
  METAMASK_OPERA: 'https://addons.opera.com/extensions/details/metamask/',
  kyberSwapRopsten: (from, to) => `https://ropsten.kyber.network/swap/${from}-${to}`,
  getEtherscanAddressURL: (network, address) => `https://${network === 'ropsten' ? 'ropsten.' : ''}etherscan.io/address/${address}`,
  IPFS_GATEWAY_HASH: hash => `https://cloudflare-ipfs.com/ipfs/${hash}`
}
