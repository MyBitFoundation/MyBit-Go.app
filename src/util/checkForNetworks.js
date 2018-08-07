

async function checkForNetworks() {
  const nets = await window.web3.eth.net.getNetworkType().then(networks => networks);
  return nets;
}

export default checkForNetworks;
