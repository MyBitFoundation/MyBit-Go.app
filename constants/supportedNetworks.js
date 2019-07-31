export const SUPPORTED_NETWORKS = ['ropsten', 'mainnet'];
export const FALLBACK_NETWORK = 'ropsten';
export const CONTRACTS_PATH = {
  'ropsten': require('@mybit/contracts/networks/ropsten/Contracts'),
  'mainnet': require('@mybit/contracts/networks/mainnet/Contracts'),
  'default': require('@mybit/contracts/networks/ropsten/Contracts'),
};
