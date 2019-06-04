export const SUPPORTED_NETWORKS = ['ropsten'];
//export const SUPPORTED_NETWORKS = ['ropsten', 'main']; //to enable mainnet
export const FALLBACK_NETWORK = 'ropsten';
export const CONTRACTS_PATH = {
  'ropsten': require('@mybit/contracts/networks/ropsten/Contracts'),
  'main': require('@mybit/contracts/networks/mainnet/Contracts'),
  'default': require('@mybit/contracts/networks/ropsten/Contracts'),
};
