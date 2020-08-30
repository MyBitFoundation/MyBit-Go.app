import { ETHERSCAN_API_KEY } from './apiKeys';

const apiEndpoint = 'https://api.mybit.io';

export const InternalLinks = {
  S3: 'https://s3.eu-central-1.amazonaws.com/mybit-go/',
  getAirtableAssetListings: network => `/api/airtable/assets/${network}`,
  getAirtableOperators: network => `/api/airtable/operators/${network}`,
  updateAirtableAssets: network => `/api/airtable/assets/${network}`,
  // updateAirtableAssetListing: network => `/api/airtable/assets/${network}`,
  // S3_UPLOAD: '/api/files/upload',
  // S3_ASSET_FILES: '/api/assets/files',
  GAS_PRICE: `${apiEndpoint}/gasprice`,
};

export const ExternalLinks = {
  METAMASK_FIREFOX: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/',
  METAMASK_CHROME: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
  METAMASK_OPERA: 'https://addons.opera.com/extensions/details/metamask/',
  ETHERSCAN_TX_BY_ADDR_ENDPOINT: address => `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc&apiKey=${ETHERSCAN_API_KEY}`,
  ETHERSCAN_TX: txHash => `https://api-ropsten.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apiKey=${ETHERSCAN_API_KEY}`,
  kyberSwapRopsten: (from, to) => `https://ropsten.kyber.network/swap/${from}-${to}`,
  getEtherscanAddressURL: (network, address) => `https://${network === 'ropsten' ? 'ropsten.' : ''}etherscan.io/address/${address}`,
};
