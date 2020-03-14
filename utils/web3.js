
export async function getNetworkName() {
  let network = await window.web3js.eth.net.getNetworkType();
  if(network === 'main'){
    network = 'mainnet';
  }
  return network;
}
