import isNil from "lodash/isNil";
import { createClient } from "utils/requests/clients";
import {
  debug,
  fromWeiToEth,
  toWei,
} from 'utils/helpers';
import {
  ABI,
  ADDRESS,
  getSupportedTokensUrl,
} from './constants';
import { createCache } from "utils/local-storage";

const cache = 60000; // 30 seconds
const throttle = 500; // 1 request per second
const ropstenBaseUrl = "https://ropsten-api.kyber.network";
const mainnetBaseUrl = "https://api.kyber.network";
let kyberContract;
const lscache = createCache({ maxAge: 600000, prefix: "kyber" });

/**
 * Axios for Kyber Ropsten API
 * @type {object} axios client
 */
export const ropstenClient = createClient({
  baseURL: ropstenBaseUrl,
  cache,
  throttle
});

/**
 * Axios for Kyber Mainnet API
 * @type {object} axios client
 */
export const mainnetClient = createClient({
  baseURL: mainnetBaseUrl,
  cache,
  throttle
});

const networClientkMap = {
  ropsten: ropstenClient,
  mainnet: mainnetClient
}

export const getSupportedTokens = network =>
  networClientkMap[network].get("currencies");

function getKyberContract() {
  if (isNil(kyberContract) === true) {
    // initialize on first use
    kyberContract = new window.web3js.eth.Contract(ABI, ADDRESS);
  }
  return kyberContract;
}

export async function getExpectedAndSlippage(src, dest, amount) {
  if(src === dest){
    return {
      expectedRate: 1,
      slippageRate: 1,
    };
  }

  const cacheKey = `kyber-slippage-${src}-${dest}-${amount}`;
  const cachedResult = lscache.get(cacheKey);

  if (isNil(cachedResult) === false) {
    return cachedResult;
  }

  const result = await getKyberContract()
    .methods
    .getExpectedRate(src, dest, amount)
    .call();

  let { expectedRate, slippageRate } = result;

  if(expectedRate !== '0'){
    expectedRate = fromWeiToEth(expectedRate);
    slippageRate = fromWeiToEth(slippageRate);
  }

  const op = { expectedRate, slippageRate };
  lscache.set(cacheKey, op)
  return op;
}
