const isGlobalWeb3 = require('./isGlobalWeb3');

function isMetaMask() {
  if (!isGlobalWeb3()) return false;
  if (!window.web3.currentProvider.isMetaMask) return false;
  return true;
}

module.exports = isMetaMask;
