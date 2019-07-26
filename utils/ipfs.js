var ipfsClient = require('ipfs-http-client')
const ipfs = new ipfsClient('localhost', '5001', {  protocol: 'http' });

export const addFileToIpfs = async data => {
  try{
    const result = await ipfs.add(data);
    const ipfsHash = result[result.length - 1].hash;
    return ipfsHash;
  } catch(err){
    console.log(err)
    return null;
  }
}

export const addJsonFileToIpfs = async obj => {
  try{
    const buffer = Buffer.from(JSON.stringify(obj));
    return addFileToIpfs(buffer);
  } catch(err){
    console.log(err);
  }
}

export const addUserFileToIpfs = file => {
  try{
    const fileDetails = {
      path: file.name,
      content: file
    }
    return addFileToIpfs(fileDetails);
  } catch(err){
    console.log(err);
  }
}


