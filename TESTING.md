# Testing  :book:
> "Quality is not an act, it is a habit.”
>— Aristotle

## User Guide

#### What is MyBit Go?
MyBit Go enables anyone to invest directly in IoT assets.
The app is in its' concept and implementation decentralized.  
It is composed to avoid any single point of failure.  The data are stored using blockchain, providing trustless interaction.


#### Requirements
In order to use MyBit Go, make sure you have up to date browser and a good Internet connection. Internet Explorer is not up to date browser.
Recommended browsers are [Brave](https://brave.com/), [Firefox](https://www.mozilla.org/en-US/firefox/new/) or [Chrome](https://www.google.com/chrome/). 

[Metamask](https://metamask.io/) web3 plugin is required for blockchain interplay as browser extension.
MyBit Go don't require a middleman to function or to manage a user's data.

##### How to install Metamask?
1. Practice the proper browser (e.g. Brave, Firefox or Chrome)
2. Goto [Metamask](https://metamask.io/)  website and follow instructions for installing either enabling the extension toward your browser

##### How to create a new wallet in MetaMask?
1. When the extension is installed, click on the icon in the top right angle to open the MetaMask, read and accept the terms.
2. Create a secure password and click Create.
3. You will notice a 12 words seed phrase. Keep seed words as a file or copy them to a safe place and click “I’ve copied it somewhere safe”.
4. Confirm your Secret Backup Phrase
5. Now you can view your address on Etherscan

#### Blockchain Networks
Currently, MyBit Go performs at the Ethereum Ropsten Network. Practicing Metamask proper network needs to be selected. Main Network will be supported after the testing phase. 
The app will show warning popup if the wrong network is selected.

#### Account Data and Ether Faucet
Account information is displayed at the top bar in the app. 
To get started among investments ETH from [Faucet service](https://faucet.metamask.io/) for the Ropsten is practiced. 
After requested Ropsten ETH will be displayed in Metamask.
Notice that Metamask requires time to retrieve new balance information from the blockchain.

#### Explore Categories
The app groups all the assets into categories. 


#### Explore the Asset Details
The Asset Detail holds the Smart Contract data visualization. The data shows particular asset specifications, description and enables investments via Smart Contract communication. 

#### Invest Directly
The data are stored using Ethereum blockchain. The MyBit Smart Contracts are letting direct investments. Following an asset is selected, clicking on Contribute will trigger transaction and the investment will be preserved forever.

#### Portfolio and Investments
Activity on MyBit Go platform is designated in Portfolio section. Total Portfolio Value and particular Asset value is presented. 

#### Transaction list
List of all investment transaction is arranged into the feed from the Ethereum Blockchain.
These lists display all the transactions on the platform.
Notice that Metamask requires time to retrieve the data from the blockchain.

## Continuous integration
Using Circle CI, the full test suite will be run against every pull request and has to pass before it can be merged. Every commit on a branch will be tested as well.

## Security testing
Using an automated tool, the list of dependencies of the project is being checked against a database of known vulnerabilities as part of every CI build. If any of the dependencies contains a known vulnerability, the build will fail.