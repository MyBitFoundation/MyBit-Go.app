const baseUrl = 'http://localhost'
const port = 8081;
const secondPort = 8082;
const host = `${baseUrl}:${port}`
const secondHost = `${baseUrl}:${secondPort}`
const apiEndpoint = 'https://api.mybit.io';

export const InternalLinks = {
  S3: 'https://s3.eu-central-1.amazonaws.com/mybit-go/',
  getAirtableAssetModels: network => process.env.NODE_ENV === 'development' ? `${host}/api/airtable/assetModels/${network}` : `/api/airtable/assetModels/${network}`,
  getAirtableAssetListings: network => process.env.NODE_ENV === 'development' ? `${host}/api/airtable/assetListings/${network}` : `/api/airtable/assetListings/${network}`,
  getAirtableOperators: network => process.env.NODE_ENV === 'development' ? `${host}/api/airtable/operators/${network}` : `/api/airtable/operators/${network}`,
  updateAirtableAssets: network => process.env.NODE_ENV === 'development' ? `${host}/api/airtable/update/${network}` : `/api/airtable/update/${network}`,
  updateAirtableAssetListing: network => process.env.NODE_ENV === 'development' ? `${host}/api/airtable/updateAssetListing/${network}` : `/api/airtable/updateAssetListing/${network}`,
  S3_UPLOAD: process.env.NODE_ENV === 'development' ? `${host}/api/files/upload` : '/api/files/upload',
  S3_ASSET_FILES: process.env.NODE_ENV === 'development' ? `${host}/api/assets/files` : '/api/assets/files',
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
