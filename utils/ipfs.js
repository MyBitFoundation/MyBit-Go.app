import IPFS from "ipfs";
// import IpfsHttpClient from 'ipfs-http-client';
import urlJoin from 'url-join';
import isNil from "lodash/isNil";
import isFunction from "lodash/isFunction";
import { IPFS_URL/*, HOST, PROTOCOL, PORT*/ } from 'constants/ipfs';

// const ipfsHttpClient = new ipfsHttpClient(HOST, PORT, {  protocol: PROTOCOL });
let jsipfs;

/**
 * Create an IPFS for use in the browser
 * @method getIpfs
 * @returns {object}
 */
export async function getIpfsClient() {
  if (isNil(jsipfs) === false) {
    return jsipfs;
  }

  /*

  We might get an old or new IPFS depending on 3box

  */
  if (isFunction(IPFS.create)) {
    // new API is like this
    ipfs = await IPFS.create();
  } else {
    // the older API is like this
    jsipfs = new IPFS();
  }
  return jsipfs;
}

export async function addFileToIpfs(data) {
  const client = await getIpfsClient();
  const result = await client.add(data);
  const ipfsHash = result[0].hash;
  return ipfsHash;
}

export async function addJsonFileToIpfs(obj) {
  const client = await getIpfsClient();
  const buffer = Buffer.from(JSON.stringify(obj));
  return addFileToIpfs(buffer);
}

export async function addUserFileToIpfs(file) {
  const client = await getIpfsClient();
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
