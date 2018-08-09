async function checkAccount() {
  const accounts = await window.web3.eth.getAccounts().then(accs => accs);
  return accounts;
}

export default checkAccount;
