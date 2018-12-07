# Welcome to Network.js

 [![MyBit Logo](https://files.mybit.io/mybit-icon-28x28.png)](https://mybit.io/) [MyBit Developer Portal](https://developer.mybit.io/portal/) &gt; [Network.js](https://developer.mybit.io/web)

## network.js

A node.js library for interacting with the MyBit Network SDK.

### Setup

Install dependencies.

`npm install`

### Start blockchain

We have included a local blockchain with our contracts already deployed. The API creates instances of our contracts deployed on the local chain and exposes them for easy interaction. To start the chain simply open up a terminal in the base directory and enter the following command:

`./start_chain`

### Import package

In your node.js file import this package \([@mybit/network.js](https://www.npmjs.com/package/@mybit/network.js)\):

```javascript
const Network = require('@mybit/network.js');
```

### Async/await

Since these functions interact with the Ethereum blockchain, everything is done asynchronously. The easiest way to work with asynchronous functions is with the async/await syntax:

```javascript
const Network = require('@mybit/network.js');

(async function() {
  var crowdsales = await Network.getOpenCrowdsales();
  console.log('Open crowdsales: ', crowdsales);
});
```

Check out [Hello Network](https://www.npmjs.com/package/@mybit/hello-network) for more examples.

### Functions

As of version 0.0.5, these are the functions currently available from network.js:

#### Full Contracts

**api\(\) returns \( contract instance \)**

The api function returns the entire [API.sol](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/database/API.sol) contract, which contains many getter functions for accessing variable on [Database.sol](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/database/Database.sol).

**dividendTokenETH\( tokenAddress \) returns \( contract instance \)**

This function takes a contract address for an already deployed [DividenToken.sol](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/tokens/erc20/DividendToken.sol) contract, instantiates the contract, and exposes all of its public functions.

**dividendTokenERC20\( tokenAddress \) returns \( contract instance \)**

Much like dividendTokenETH\(\), this function takes a contract address for an already deployed [DividenTokenERC20.sol](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/tokens/erc20/DividendTokenERC20.sol) contract, instantiates the contract, and exposes all of its public functions. The difference between these two contract is that DividenTokenERC20.sol distributes an ERC-20 token as its payment currency, and so some functions are slightly different.

#### Owner Functions

**addOperator\( account, name, owner \) returns \( bytes32 \)**

This function takes a user address and string for the operator name and registers the operator in the [Operators.sol](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/roles/Operators.sol) contract from the owner address. It returns the operatorID that will be needed for any crowdsale creation. Note, this function will not work if the owner address is a contract.

#### User Functions

**approveBurn\( address \) returns \( bool \)**

This function takes a user address as its parameter. It then sends burn approval to the deployed [MyBitToken](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/tokens/erc20/BurnableToken.sol) contract from that user's address. Right now, it just gives approval for burning up to 10^30 of the smallest increment of MyB tokens -- more than enough to cover all burning costs.

#### Operator Functions

**acceptEther\( id, operatorAddress \) returns \( bool \)**

An operator must specify the currencies that they accept. This function sets the operator as accepting Ether. Pass the operatorID and the operator address. The function is called from the operator address.

**acceptERC20Token\( id, tokenAddres, operatorAddress \) returns \( bool \)**

An operator must specify the currencies that they accept. This function sets the operator as accepting ERC-20 tokens. Pass the operatorID, ERC-20 token address, and the operator address. The function is called from the operator address.

_Note, accepting Ether and accepting ERC-20 tokens is not mutually exclusive. An operator can accept as many currencies as they want._

**issueDividends\( assetID, account, amount \) returns \( bool \)**

To pay out dividends to investors, an operator can call this function. Pass the assetID, the account from which you want to pay, and the amount you'd like to pay. The function determines if the asset takes Ether or an ERC-20 token. If the account does not have a sufficient balance in the required payment method, the function will fail.

#### Asset Manager Functions

**createAsset\( object \) returns \( object \)**

To start a crowdsale to fund a new asset you must pass this function and object that contains the following paremeters:

```javascript
{
  assetURI: string, //The URI where information about this asset can be found
  operatorID: bytes32, //Operator ID
  fundingLength: uint, //Funding time in seconds
  amountToRaise: uint, //Funding goal
  assetManagerPercent: uint, //A number less than 100: The percentage to be received by the AssetManager
  assetManager: address, //Address of the asset manager (this function will be called from their account)
  fundingToken: address//Optional: if this asset is being funded with an ERC-20 token, you must pass the address
}
```

The functions returns an object that contains \_assetID, \_assetManager, \_assetURI, and \_tokenAddress.

#### Investor Functions

**fundAsset\( object \) returns \( address \)**

To contribute to a crowdsale call this function and pass the following object:

```javascript
{
  assetID: bytes32, //The id of the asset you want to fund
  amount: uint, //The amount you want to contribute
  address: address, //The address from which you will contribute
}
```

#### Getter Functions

**getAssetsByInvestor\( address \) returns \( array \)**

Pass an address and get back an array of assetIDs owned by that investor.

**getAssetsByManager\( address \) returns \( array \)**

Pass an address and get back an array of assetIDs managed by that asset manager.

**getAssetsByOperator\( address \) returns \( array \)**

Pass an address and get back an array of assetIDs operated by that operator.

**getTotalAssets\(\) returns \( array \)**

Get an array of all assetIDs on the network.

**getOpenCrowdsales\(\) returns \( array \)**

Get an array of all assetIDs that are currently seeking funding.

**getFundingTimeLeft\( assetID \) returns \( uint \)**

Pass an assetID and get back the time in seconds until the crowdsale finishes. If the crowdsale is already finished, you'll receive 0.

**getFundingGoal\( assetID \) returns \( uint \)**

Pass an assetID and get back the funding goal for the asset. If the asset is funded, you'll get back the total supply of tokens.

**getFundingProgress\( assetID \) returns \( uint \)**

Pass an assetID and get back the current amount that the asset has been funded.

**getAssetOperator\( assetID \) returns \( address \)**

Pass an assetID and get back the address of the operator.

**getAssetManager\( assetID \) returns \( address \)**

Pass an assetID and get back the address of the asset manager.

**getAssetInvestors\( assetID \) returns \( array \)**

Pass an assetID and get back an array of all the addresses that have funded it.

#### ⚠️ Warning

This application is unstable and has not undergone any rigorous security audits. Use at your own risk.

 MyBit Platform™ CHE-177.186.963  
