import IPFS from "ipfs";
import urlJoin from 'url-join';
import isNil from "lodash/isNil";
import isFunction from "lodash/isFunction";
import isString from "lodash/isString";
import { IPFS_URL } from 'constants/ipfs';

let jsipfs;
const alreadyPinning = {};

/**
 * Create an IPFS for use in the browser
 * @method getIpfs
 * @returns {object}
 */
export async function init() {
  if (isNil(jsipfs) === false) {
    return jsipfs;
  }
  jsipfs = await IPFS.create({ repo: "mybit-go" });

  // for testing this might help in the dev console
  window.jsipfs = jsipfs;

  return jsipfs;
}

export async function addFileToIpfs(data) {
  const client = await init();
  const result = await client.add(data);
  const ipfsHash = result[0].hash;
  return ipfsHash;
}

export async function addJsonFileToIpfs(obj) {
  const client = await init();
  const buffer = Buffer.from(JSON.stringify(obj));
  return addFileToIpfs(buffer);
}

export async function addUserFileToIpfs(file) {
  const client = await init();
  const fileDetails = {
    path: file.name,
    content: file
  }
  return addFileToIpfs(fileDetails);
}

/**
 * Join the IPFS prefix with the hash to make a full URL
 * @method
 * @param {string} hash
 * @returns {string}
 */
export const ipfsHashUrl = hash => urlJoin(IPFS_URL, hash)

function requireValidCid(cid) {
  if (isString(cid) === false) {
    throw new Error(`a CID string is required to pin, received type ${typeof cid}`);
  }
}

/**
 * Pin a file so we have it in the browser
 * @method pin
 * @param {string} cid
 * @returns {object}
 */
export async function pin(cid) {
  requireValidCid(cid);
  const client = await init();
  return client.pin.add(cid);
}

/**
 * Remove a pin when it's no longer necessary
 * @method unpin
 * @param {string} cid
 * @returns {object}
 */
export async function unpin(cid) {
  requireValidCid(cid);
  const client = await init();
  return client.pin.rm(cid);
}
