import Web3 from 'web3';

const getWeb3Async = () => {
  if (window.web3) {
    // Injected Web3 detected. Use Mist/MetaMask's provider.
    window.web3 = new Web3(window.web3.currentProvider);
    console.log('Metamask Loaded');
  } else {
    // No web3 instance injected, using Local web3.
    const provider = new Web3.providers.HttpProvider('http://localhost:8545');
    window.web3 = new Web3(provider);
  }
  return window.web3;
};

export default getWeb3Async;
