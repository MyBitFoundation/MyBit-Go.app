# Testing  :book:
> "Quality is not an act, it is a habit.”
>— Aristotle

## User Flows

#### Introduction
MyBit Go app is in its' concept and implementation decentralized.  
The app is designed to avoid any single point of failure.  The data are stored using blockchain, providing trustless interaction.
The app enables anyone to invest directly in IoT assets.

#### Requirements
[Metamask](https://metamask.io/) web3 plugin is required for blockchain interplay as browser extension.
MyBit Go don't require a middleman to function or to manage a user's data. 

#### Blockchain Networks
Currently, MyBit Go performs at the Ethereum Ropsten Network. Practicing Metamask proper network needs to be selected. Main Network will be supported after the testing phase. The app will show warning popup if the wrong network is selected.

#### Account Data and Ether Faucet
Account information is displayed at the top bar in the app. 
To get started among investments ETH from [Faucet service](https://faucet.metamask.io/) for the Ropsten is practiced. 
After requested Ropsten ETH will be displayed in Metamask.

#### Explore Categories
The app groups all the assets into categories. 


#### Explore the Asset Details
The Asset Detail holds the Smart Contract data visualization. The data shows particular asset specifications, description and enables investments via Smart Contract communication. 

#### Invest Directly
The data are stored using Ethereum blockchain. The MyBit Smart Contracts are letting direct investments. Following an asset is selected, clicking on Contribute will trigger transaction and the investment will be preserved forever.

#### Portfolio and Investments


#### Transaction list

## Continuous integration
Using Circle CI, the full test suite will be run against every pull request and has to pass before it can be merged. Every commit on a branch will be tested as well.

## Security testing
Using an automated tool, the list of dependencies of the project is being checked against a database of known vulnerabilities as part of every CI build. If any of the dependencies contains a known vulnerability, the build will fail.