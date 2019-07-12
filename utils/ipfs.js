const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const addFileToIpfs = async buffer => {
  const result = await ipfs.files.add(buffer);
  return result[0].hash;
}

export const addJsonFileToIpfs = async obj => {
  try{
    const buffer = Buffer.from(JSON.stringify(obj));
    return addFileToIpfs(buffer);
  } catch(err){
    console.log(err);
  }
}

export const addUserFileToIpfs = async obj => {
  try{
    const buffer = Buffer.from(obj);
    return addFileToIpfs(buffer);
  } catch(err){
    console.log(err);
  }
}


