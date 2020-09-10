export const SUPPORTED_NETWORKS = ['ropsten', 'mainnet'];
export const FALLBACK_NETWORK = 'ropsten';
export const CONTRACTS_PATH = {
  'ropsten': require('@mybit-v2/contracts/networks/ropsten/Contracts'),
  'mainnet': require('@mybit-v2/contracts/networks/mainnet/Contracts'),
  'default': require('@mybit-v2/contracts/networks/ropsten/Contracts'),
};
