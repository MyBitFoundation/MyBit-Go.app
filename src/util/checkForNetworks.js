

async function checkForNetworks() {
  console.log(window.web3.eth.net);

  const nets = await window.web3.eth.net.getNetworkType().then(nets => nets);
  console.log(nets);

  console.log('test test');
  // const networks = await Web3.net.getNetworkType().then(netw => netw);
  return nets;
}

export default checkForNetworks;
