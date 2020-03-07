import IPFS from "ipfs";
import urlJoin from 'url-join';
import isNil from "lodash/isNil";
import isFunction from "lodash/isFunction";
import { IPFS_URL } from 'constants/ipfs';

let jsipfs;

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
