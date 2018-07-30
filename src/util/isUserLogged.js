
async function checkAccount() {
  let accounts = await window.web3.eth.getAccounts().then(
    accounts => {
      return accounts;
    }
  )
  return accounts;
}

export default checkAccount;