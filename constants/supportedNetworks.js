export const SUPPORTED_NETWORKS = ['ropsten', 'main'];
export const FALLBACK_NETWORK = 'ropsten';
export const CONTRACTS_PATH = {
  'ropsten': require('@mybit/contracts/networks/ropsten/Contracts'),
  'main': require('@mybit/contracts/networks/mainnet/Contracts'),
  'default': require('@mybit/contracts/networks/ropsten/Contracts'),
};
