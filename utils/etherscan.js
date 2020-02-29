import { createClient } from "./requests/clients";

const cache = 60000; // 1min
const throttle = 1100; // approx. 1 request per second

/**
 * Axios for Ropsten Etherscan API
 * @type {object} axios client
 */
export const ropstenClient = createClient({
  baseURL: "https://api-ropsten.etherscan.io/api",
  cache,
  throttle
});

/**
 * Axios for Mainnet Etherscan API
 * @type {object} axios client
 */
export const mainnetClient = createClient({
  baseURL: "https://api.etherscan.io/api",
  cache,
  throttle
});

const networClientkMap = {
  ropsten: ropstenClient,
  mainnet: mainnetClient
};

/**
 * Get transaction history by address
 * @method
 * @param {string} address
 * @returns {object}
 */
export const getTransactions = ({network, address}) =>
  networClientkMap[network].get("/", {
    params: {
      address,
      module: "account",
      action: "txlist",
      sort: "asc"
    }
  });
