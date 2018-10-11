function isMetaMask() {
  if (window.web3) {
    return true;
  }
  return false;
}

module.exports = isMetaMask;
