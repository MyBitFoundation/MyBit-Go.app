/*

local storage cache

cache.get(key)
cache.set(key, val)

*/

import assign from "lodash/assign";
import isNil from "lodash/isNil";
import isString from "lodash/isString";
import isObject from "lodash/isObject";
import isNumber from "lodash/isNumber";
import noop from "lodash/noop";
const expirationMapKey = "$local-storage-expiration-map";
const expirationTimers = {};
let scheduledExpirationTimer;

// for node server side
const mockLocalStorage = {
  getItem: noop,
  setItem: noop,
  removeItem: noop
};

const getLocalStorage = () =>
  (typeof window !== "undefined" && window.localStorage) || mockLocalStorage;

function lsget(key) {
  const op = getLocalStorage().getItem(key);

  if (isString(op) === true) {
    return JSON.parse(op);
  }

  // it's either a null, undefined, or something else
  return op;
}

function lsdel(key) {
  getLocalStorage().removeItem(key);
}

function lsset(key, val) {
  if (isNil(val) === true) {
    lsdel(key);
    return;
  }

  const op = JSON.stringify(val);
  getLocalStorage().setItem(key, op);
}

const getExpirationMap = () => lsget(expirationMapKey) || {};
const setExpirationMap = val => lsset(expirationMapKey, val);

function clearExpirationTimer(key) {
  if (isNil(expirationTimers[key])) {
    // there isn't one
    return;
  }
  clearTimeout(expirationTimers[key]);
  delete expirationTimers[key];
}

function setExpirationTimer(key, ms) {
  clearExpirationTimer(key);
  expirationTimers[key] = setTimeout(() => lsdel(key), ms)
}

function scheduledExpirationsTask() {
  if (isNil(scheduledExpirationTimer) === false) {
    clearTimeout(scheduledExpirationTimer);
  }

  const expirationMap = getExpirationMap();
  const keys = Object.keys(expirationMap);

  if (keys.length === 0) {
    return;
  }

  const now = Date.now();
  keys.forEach(function(key) {
    const expirationDate = expirationMap[key];
    if (expirationDate < now) {
      lsdel(key);
      clearExpirationTimer(key);
      delete expirationMap[key];
      return;
    }

    const ms = expirationDate - now;
    setExpirationTimer(key, ms);
  });
  setExpirationMap(expirationMap);

  scheduledExpirationTimer = setTimeout(scheduledExpirationsTask, 5000);
}

function setKeyExpiration(key, expirationDate) {
  // there is a global key expiration time object that needs to be changed
  const expirationMap = getExpirationMap();
  expirationMap[key] = expirationDate;
  setExpirationMap(expirationMap);
}

export function createCache(opts = {}) {
  const { maxAge, prefix } = opts;
  const cache = {};

  scheduledExpirationsTask();

  /**
   * The user can specify a prefix. In that case we prefix the key and
   * check that we aren't prefixing keys that already got it.
   * @method getLsKey
   * @param {string} key
   * @returns {string} prefxed key
   */
  function getLsKey(key) {
    let op = key;

    if (isString(prefix) === true) {
      if (key.startsWith(prefix)) {
        // it was already prefixed
        return op;
      }

      // use the prefix provided by the user
      op = `${prefix}-${key}`;
    }

    return op;
  }

  function get(key) {
    scheduledExpirationsTask();
    return lsget(getLsKey(key));
  }

  function set(key, val) {
    const lsKey = getLsKey(key);
    lsset(lsKey, val);
    if (isNumber(maxAge)) {
      setExpirationTimer(lsKey, maxAge);
      const expirationDate = Date.now() + maxAge;
      setKeyExpiration(key, expirationDate)
    }
    scheduledExpirationsTask();
  }

  function del() {
    lsdel(getLsKey(key));
    scheduledExpirationsTask();
  }

  function clear() {
    let entries = Object.entries(getLocalStorage());

    if (isString(prefix)) {
      entries = entries.filter(([key]) => key.startsWith(prefix))
    }

    entries.forEach(function([key]) {
      lsdel(key);
    });

    scheduledExpirationTimer
  }

  assign(cache, { get, set, del, clear });
  return cache;
}
