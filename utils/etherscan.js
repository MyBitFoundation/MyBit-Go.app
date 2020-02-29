import { createClient } from "./requests/clients";

const baseURL = "https://api-ropsten.etherscan.io/api";
const cache = 60000; // 1min
const throttle = 1100; // 1 request per second

/**
 * Axios for Ropsten Etherscan API
 * @type {object} axios client
 */
export const client = createClient({ baseURL, cache, throttle })

/**
 * Get transaction history by address
 * @method
 * @param {string} address
 * @returns {object}
 */
export const getTransactions = address =>
  client.get("/", {
    params: {
      address,
      module: "account",
      action: "txlist",
      sort: "asc"
    }
  });
