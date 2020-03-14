import isNil from "lodash/isNil";
import getCacheKey from "./get-cache-key";
import { responseCaches } from "./shared";

/**
 * Create a throttling adapter for axios
 * @method createThrottlingAdapter
 * @param {object} adapter axios adapter
 * @param {object} opts
 * @param {number} opts.throttle
 * @returns {object} axios adapter
 */
export function createThrottlingAdapter(adapter, opts) {
  let throttledRequests = [];
  let cache;

  /**
   * Remove one request from the queue or any that are now cached
   * @method processThrottledRequests
   * @param {number} requestId
   */
  function processThrottledRequests(requestId) {
    throttledRequests = throttledRequests.filter(function(item) {
      if (
        // if it was previously scheduled
        (isNil(cache) === false && cache.has(item.cacheKey)) ||

        // or the timer hit
        item.requestId === requestId
      ) {
        // go next
        clearTimeout(item.timer);
        item.resolve(adapter(item.config));
        return false;
      }

      // keep it for later, it's time has not come
      return true;
    });
  }

  return function createThrottlingAdapterInner(config) {
    const requestId = Math.random().toString();
    const cacheKey = getCacheKey(config);

    if (isNil(cache) === true) {
      cache = responseCaches[config.baseURL];
    }

    // schedule it
    let timeout = throttledRequests.length * opts.throttle;
    return new Promise(function(resolve) {
      const timer = setTimeout(
        () => processThrottledRequests(requestId),
        timeout
      );
      const throttledReq = { requestId, cacheKey, config, resolve, timer };
      throttledRequests.push(throttledReq);
    });
  }
}
