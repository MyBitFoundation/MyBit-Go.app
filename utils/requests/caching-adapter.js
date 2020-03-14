import Cache from "lru-cache";
import isNil from "lodash/isNil";
import getCacheKey from "./get-cache-key";
import { responseCaches, max, GET } from "./shared";

/**
 * Create a caching adapter for axios
 * @method createCachingAdapter
 * @param {object} adapter axios adapter
 * @param {object} opts
 * @param {number} opts.maxAge
 * @returns {object} axios adapter
 */
export function createCachingAdapter(adapter, { maxAge }) {
  let cache;

  return function createCachingAdapterInner(config) {
    if (config.cache === false || config.method.toUpperCase() !== GET) {
      // skip if the user is not using cache or if not GET
      return adapter(config);
    }

    if (isNil(cache) === true) {
      // initialize the cache on first use
      cache = new Cache({ max, maxAge });
      responseCaches[config.baseURL] = cache;
    }

    const cacheKey = getCacheKey(config);
    const cachedResponse = cache.get(cacheKey);

    if (isNil(cachedResponse) === false) {
      return cachedResponse;
    }

    // do the request and cache it
    return new Promise(function(resolve, reject) {
      adapter(config)
        .then(function(res) {
          // save the response in the cache for next time
          cache.set(cacheKey, res);
          resolve(res);
        })
        .catch(reject);
    });
  }
}
