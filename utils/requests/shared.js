
/*

Shared between axios, adapters, and functions

*/

/**
 * The adapters share this and assign caches by key
 * @type {Object}
 */
const responseCaches = {};

/**
 * Allow up to 100 stored promises in each lru-cache
 * @type {number}
 */
const max = 100;

const GET = "GET";

export {
  responseCaches,
  max,
  GET,
}
