import { createClient } from "./requests/clients";

const baseURL = "https://www.etherchain.org/api";
const cache = 30000; // 30 seconds
const throttle = 1000; // 1 request per second

/**
 * Axios for Etherchain API
 * @type {object} axios client
 */
export const client = createClient({ baseURL, cache, throttle })

/**
 * Get the gas price
 * @method gasPriceOracle
 * @returns {object} axios
 */
export const gasPriceOracle = () => client.get("gasPriceOracle");
