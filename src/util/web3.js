import Web3 from 'web3';
import Promise, { promisifyAll } from 'bluebird';

const getWeb3Async = () =>
  new Promise((resolve) => {
    if (window.web3) {
      // Injected Web3 detected. Use Mist/MetaMask's provider.
      window.web3 = new Web3(window.web3.currentProvider);
      console.log('Metamask Loaded');
    } else {
      // No web3 instance injected, using Local web3.
      const provider = new Web3.providers.HttpProvider('http://localhost:8545');
      window.web3 = new Web3(provider);
    }

    // wrap callback functions with promises
    promisifyAll(window.web3.eth, { suffix: 'Async' });
    promisifyAll(window.web3.net, { suffix: 'Async' });
    promisifyAll(window.web3.version, { suffix: 'Async' });
    resolve(window.web3);
  });

export default getWeb3Async;
