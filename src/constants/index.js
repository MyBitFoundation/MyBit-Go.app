export const ARTIFICIAL_DELAY_IN_MS = 3000;
export const USD_MYB_SYMBOL = 'USD/MYB';
export const noop = () => {};
export const debug = process.env.NODE_ENV === 'development' ? console.log : noop;
export const MYBIT_TICKER_COINMARKETCAP = 1902;
export const ETHEREUM_TICKER_COINMARKETCAP = 1027;
// TODO: Needs to be implemented server-side, API_KEY needs to be created
export const ETHERSCAN_API_KEY = '';
export const ETHERSCAN_TX_BY_ADDR_ENDPOINT =
  (apiKey, address) =>
    `http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc&apikey=${apiKey}`;

