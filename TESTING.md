# User Guide  :book:

> "Quality is not an act, it is a habit.”
>— Aristotle

#### Table of Contents  

[What is MyBit Go](#what) 
[MyBit Go Requirements](#requirements)
[How to install Metamask?](#howto-metamask)
[How to create a new wallet in MetaMask?](#howto-wallet)
[MyBit Go Metamask Warning Popup](#warning-popup) 
[Blockchain Networks](#blockchain-networks)
[How to select Ropsten network?](#ropsten-network)
[Account Data and Ether Faucet](#faucet)
[Explore Categories](#categories)
[Explore the Asset Details](#asset-details)
[Invest Directly](#invest-directly) 
[How to invest?](#howto-invest) 
[Portfolio and Investments](#portfolio-investments) 
[Transaction list](#transaction-list) 
[Continuous integration](#continuous-integration)
[Security testing](#security-testing) 

<a name="what"/>
#### What is MyBit Go?
MyBit Go enables anyone to invest directly in IoT assets.
The app is in its' concept and implementation decentralized.  
It is composed to avoid any single point of failure.  The data are stored using blockchain, providing trustless interaction.

<a name="requirements"/>
#### MyBit Go Requirements
In order to use MyBit Go, make sure you have up to date browser and a good Internet connection. Internet Explorer is not up to date browser.
Recommended browsers are [Brave](https://brave.com/), [Firefox](https://www.mozilla.org/en-US/firefox/new/) or [Chrome](https://www.google.com/chrome/). 

[Metamask](https://metamask.io/) web3 plugin is required for blockchain interplay as browser extension.
MyBit Go don't require a middleman to function or to manage a user's data.

<a name="howto-metamask"/>
##### How to install Metamask?
1. Practice the proper browser (e.g. Brave, Firefox or Chrome)
2. Goto [Metamask](https://metamask.io/)  website and follow instructions for installing either enabling the extension toward your browser

<a name="howto-wallet"/>
##### How to create a new wallet in MetaMask?
1. When the extension is installed, click on the icon in the top right angle to open the MetaMask, read and accept the terms.
2. Create a secure password and click Create.
3. You will notice a 12 words seed phrase. Keep seed words as a file or copy them to a safe place and click “I’ve copied it somewhere safe”.
4. Confirm your Secret Backup Phrase
5. Now you can view your wallet address on Etherscan

<a name="warning-popup"/>
##### MyBit Go Metamask Warning Popup
MyBit Go requires Metamask as the bridge to Ethereum blockchain. If the extension is not properly governing the Warning popup will be prompted. After the extension is installed and a user wallet is properly set up the app will be fully operative. 

<a name="blockchain-networks"/>
#### Blockchain Networks
Currently, MyBit Go performs at the Ethereum Ropsten Network. Practicing Metamask proper network needs to be selected. Main Network will be supported after the testing phase. 
The app will show warning popup if the wrong network is selected.

<a name="ropsten-network"/>
##### How to select Ropsten network?
1. Click on the Metamask icon in the top right angle to open
2. Press "Main Network"
3. Then select "Ropsten Test Network"

<a name="faucet"/>
#### Account Data and Ether Faucet
Account information is displayed at the top bar in the app. 
To get started among investments ETH from [Faucet service](https://faucet.metamask.io/) for the Ropsten is practiced. 
After requested Ropsten ETH will be displayed in Metamask.
Notice that Metamask requires time to retrieve new balance information from the blockchain.

<a name="categories"/>
#### Explore Categories
The app groups all the assets into categories. 

<a name="asset-details"/>
#### Explore the Asset Details
The Asset Detail holds the Smart Contract data visualization. The data shows particular asset specifications, description and enables investments via Smart Contract communication. 

<a name="invest-directly"/>
#### Invest Directly
The data are stored using Ethereum blockchain. The MyBit Smart Contracts are letting direct investments. Following an asset is selected, clicking on Contribute will trigger transaction and the investment will be preserved forever.

<a name="howto-invest"/>
##### How to invest?
1. Goto Explore and choose the desired category
2. Category carries one or many assets. Decide on the asset and click "View Asset"
3. Asset detail page will display information about the selected asset as the name, city, and country, image, description, funds raised, funding goal, number of investors and details. 
4. Use the slider to input desired investment amount. 
5. After the investment amount is added a data about the return on investment will be calculated and displayed properly so investment decision can be made. 
5. Click "Contribute"
6. "Confirm Purchase" popup will be prompted. Agree on Terms and Conditions and click "Confirm" or change the investment value.
7. Metamask Notification popup will ask for transaction confirmation. Give attention to the Gas Fee. The suggested network fee amount will be filled automatically. For more information visit [ETH Gas Station](https://ethgasstation.info/). After checking the data click "Confirm"
8. The investment transaction will be executed. The loader will show execution status and Metamask will report transaction status. Also, the transaction will be visible at [Ropsten Ether Scan](https://ropsten.etherscan.io/)

<a name="portfolio-investments"/>
#### Portfolio and Investments
Activity on MyBit Go platform is designated in Portfolio section. Total Portfolio Value and particular Asset value is presented. 

<a name="transaction-list"/>
#### Transaction list
List of all investment transaction is arranged into the feed from the Ethereum Blockchain.
These lists display all the transactions on the platform.
Notice that Metamask requires time to retrieve the data from the blockchain.

<a name="continuous-integration"/>
## Continuous integration
Using Circle CI, the full test suite will be run against every pull request and has to pass before it can be merged. Every commit on a branch will be tested as well.

<a name="security-testing"/>
## Security testing
Using an automated tool, the list of dependencies of the project is being checked against a database of known vulnerabilities as part of every CI build. If any of the dependencies contains a known vulnerability, the build will fail.

<img src="./src/images/bg-1.png" width="100%">