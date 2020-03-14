import axios from "axios";
import isNil from "lodash/isNil";
import isNumber from "lodash/isNumber";
import isString from "lodash/isString";
import { createCachingAdapter } from "./caching-adapter";
import { createThrottlingAdapter } from "./throttling-adapter";


/**
 * Create a caching, throttled, HTTP client with axios.
 * @method createClient
 * @param {object} opts
 * @param {string} opts.baseURL
 * @param {number} [opts.cache] milliseconds
 * @param {number} [opts.throttle] milliseconds
 * @returns {object} axios
 */
export function createClient({
  baseURL,
  cache,
  throttle,
}) {
  let adapter = axios.defaults.adapter;

  if (isNumber(cache) === true) {
    const maxAge = cache;
    adapter = createCachingAdapter(adapter, { maxAge });
  }

  if (isNumber(throttle) === true) {
    adapter = createThrottlingAdapter(adapter, { throttle });
  }

  const client = axios.create({
    baseURL,
    adapter
  });

  return client;
}
