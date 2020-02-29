import isString from "lodash/isString";

export default function getCacheKey(config) {
  if (isString(config.cacheKey) === true) {
    return config.cacheKey;
  }
  const { url, params } = config;
  const cacheKey = url + JSON.stringify(params);
  config.cacheKey = cacheKey;
  return cacheKey;
}
