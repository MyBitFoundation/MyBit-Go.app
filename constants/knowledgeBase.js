import React from 'react';
import Telegram from '../static/telegram.svg';

const sectionHowItWorks = [{
  question: 'Investors',
  answer: 'Contribute funds to various asset listings on the explore page. If fully funded, they are allocated a tokenized ownership stake in the asset proportionate to their contribution, which entitles them to a proportionate revenue stream from the asset.',
}, {
  question:  'Asset Managers',
  answer: 'List pre-approved assets in designated locations on the list asset tab. If their asset is funded the IoT partner delivers and install the asset at the specified location and the asset manager oversees it operation to ensure it provides optimal service in the economy.',
}, {
  question: 'IoT Partners',
  answer: 'Supply IoT assets to the ecosystem. These can be things like Bitcoin ATM, 3D printers, Self-driving cars/trucks, storage units, co-working spaces etc. These assets are funded by investors and begin to generate revenue by providing services to the economy.',
}];

const sectionFees = [{
  question: 'Investors',
  answer: 'Assets are assessed a 3% fee on their total value. 1% goes to the MyBit DAO (decentralised autonomous organisation) – this is to power the MyBIt ecosystem and sustain inbound contributions and maintenance. 1% goes to the MyBit Treasury – this is to maintain the MyBit Foundation which oversees the MyBit product and manages business operations. And 1% is used to buyback and burn MYB, removing them from the total supply total supply – this supports token value growth through organically increasing demand. Furthermore, MyBit keeps 1% of ownership of listed assets, or in the case of community driven operators, this ownership is provided to the community member that onboarded the operator.',
}, {
  question:  'IoT Partners',
  answer: 'Partners who only accept fiat in exchange for their assets will charge an 8% fee on transactions. This is not taken as profit by MyBit or not a value addition to the MyBit ecosystem, but is purely due to the third party fees associated with crypto-fiat.',
}];

const sectionValueOfMyBitGo = [{
  question: 'To Investors',
  answer: 'MyBit eliminates the large fees, slow processing times, and bureaucracy associated with brokers and third-party investment companies by providing investors with a secure and automated investment application built on the Ethereum blockchain.',
}, {
  question:  'To Asset Managers',
  answer: 'MyBit gives everyone the opportunity to earn income by overseeing revenue generating assets as they operate in the economy. Anyone can be an asset manager by simply signing up through the list asset tab on MyBit, doing some due diligence on asset viability for their location, and having an asset funded by investors on the platform.',
}, {
  question: 'To IoT Partners',
  answer: 'MyBit is a frictionless marketplace for tokenizing the machine assets produced by technology companies. It connects manufacturers directly with a huge market consumers, giving them potential for a huge increase in the demand for their products.',
}];

const sectionAbout = [{
  question: 'What is MyBit?',
  answer: 'A platform that enables secure investment in a wide variety of revenue generating assets.',
}, {
  question: 'Who can use it?',
  answer: 'Everyone has access to investment opportunities through MyBit.',
}, {
  question: 'What are the benefits?',
  answer: 'Low fees, real time revenue distributions, no capital entry barrier, access to ownership of cutting edge technology.',
}, {
  question: 'Why does it need smart contracts/Blockchain?',
  answer: 'Smart contracts are ideal for scenarios where two (or more) people who do not know each other need to conduct a transaction because it automatically establishes trust. Additionally, smart contracts ensure that terms are followed as defined in the contract. Lastly, it automatically records ownership in a ledger without single point of failure risk.',
}, {
  question: 'Why Ethereum?',
  answer: 'Nothing compares. Other Blockchains may have increased speed or lower fees, but they do so by sacrificing security. Since MyBit is a financial technology platform, security is of the utmost concern.',
}, {
  question: 'What is MYB?',
  answer: 'MYB stands for MyBit Token, it powers dApps running on the MyBit Network.',
}];

const sectionGettingStarted = [{
  question: 'What is metamask?',
  answer: 'A browser extension browser that lets people use the ethereum network and invest on MyBit.',
}, {
  question: 'Why do I not need an email and account?',
  answer: 'Everything is linked to your metamask account.',
}, {
  question: 'What is the ropsten test network?',
  answer: 'It’s made for testing Ethereum applications for free so real Ether is not consumed or at risk before an app is published to the mainnet.',
}, {
  question: 'What is testnet Ether?',
  answer: 'It\'s functions just like regular Ether but has no value because it is specifically designed to be used for testing purposes on Ethereum’s testnet.',
}];

const sectionInvesting = [{
  question: 'How do I invest in a project?',
  answer: 'Simple. Click the explore tab and find an asset you want to invest in, choose the currency and amount you want to contribute, and confirm the transaction in the metamask pop up.',
}, {
  question: 'What currencies can I use to invest?',
  answer: 'Any crypto supported by Kyber can be used to invest in assets on MyBit. Contributions are denominated in DAI (USD stable coin) but simply select the currency you wish to use and MyBit will swap the currency into DAI  (USD stable coin) automatically before it is contributed to the funding pool.',
}, {
  question: 'How do I receive revenue?',
  answer: 'It is automatically sent to your metamask account in real time as assets you own generate revenue.',
}, {
  question: 'What if my transaction did not go through?',
  answer: 'Sometimes the Ethereum network rejects transactions due to low gas or other reasons. Please try again with higher gas limits and price. If the problem persists it is most likely an issue with the Ethereum network.',
}, {
  question: 'How long are assets available for funding?',
  answer: 'A maximum of thirty (30) days, or until the funding goal is reached.',
}, {
  question: 'What if the asset isn’t fully funded?',
  answer: 'Contributed funds are sent back in DAI via smart contract at the end of the 30 day funding period.',
}, {
  question: 'Crypto is volatile, how does that impact investors?',
  answer: 'The total funding is always constant in US Dollars. We implement DAI, a stable coin created by Marker DAO to remove volatility risk by automatically converting all cryptocurrencies as they are contributed.',
}, {
  question: 'Slippage using Kyber',
  answer: 'Kyber is an automated token exchange protocol that enables multi-currency support on MyBit. In automatic trading platforms like Kyber, slippage occurs algorithmically through utilising liquidity pools to maintain price equilibrium. This provides a more stable alternative to traditional trading platforms in which slippage occurs erratically through buy/sell price and volume differentials. Like traditional exchanges, slippage increases with the volume of orders, and can do so dramatically. In such cases it is the responsibility of users to monitor the slippage rate and accept the fees.',
}];

const sectionAssets = [{
  question: 'How do partners get added?',
  answer: 'The MyBit DAO must approve any new partner.',
}, {
  question: 'What is the selection process?',
  answer: 'The MyBit DAO leverages the power of crowd intelligence to investigate and research a company of interest. A vote is launched to determine the viability of the partner based on standard due diligence. There may also be a system to reward individuals who bring successful partners to the table and lead the process.',
}, {
  question: 'What types of assets are listed?',
  answer: 'Any  revenue generating digital or hardware asset whose income can be measured through the digital or IoT economy.',
}, {
  question: 'Why IoT?',
  answer: 'IoT devices can often be automated so payments can flow directly to investors without ever having to touch third party hands. It also makes it easy to audit since data is available via the IoT cloud.',
}, {
  question: 'How do assets make money?',
  answer: 'Assets that are available on MyBit are selected for their ability to efficiently provide goods and/or services to the economy in a highly effective way. Things such as Automated transport, 3D printers, Co-Working space and more are all set to disrupt massive industries which gives asset owners the ability to capitalize on their income generating capacity.',
}, {
  question: 'How are operational expenses and repairs dealt with?',
  answer: 'Investors can view all details relating to asset expenses on the asset listing. They are determined by the asset manager who handles all aspects of the asset maintenance.',
}, {
  question: 'Can an asset be delisted?',
  answer: 'If a partner violates any of our terms and conditions or there is no longer a demand for a specific asset, yes it can be delisted.',
}, {
  question: 'How are disputes resolved?',
  answer: 'Asset managers post a standardised collateral payment with each asset they list. If assets are not managed effectively, asset managers can be voted out by investors through the MyBit DAO.',
}, {
  question: 'What if an asset manager steals the asset?',
  answer: 'Asset managers will forfeit their collateral payment in the event of a theft.',
}, {
  question: 'Are asset insured?',
  answer: 'Asset are able to be insured by the asset manager, who can demonstrate this in the assets listings supporting documents section. Individual investors can take independent positions against the asset through ‘MyHedge’ which will pay out in the event of the asset breaking or being stolen.',
}];

const sectionCommonTerms = [{
  question: 'MYB',
  answer: 'Stands for MyBit Token, which powers dApps running in the MyBit Ecosystem.',
}, {
  question: 'Ether',
  answer: 'Cryptocurrency used to power the Ethereum Network.',
}, {
  question: 'Ethereum',
  answer: 'A decentralised world computer which offers smart contracts.',
}, {
  question: 'Smart Contracts',
  answer: 'A computer protocol which automates the terms of a legal contract without any need for human interaction.',
}, {
  question: 'IoT',
  answer: 'Stands for internet of things. Any device that is connected to the internet.',
}, {
  question: 'Metamask',
  answer: 'A browser extension that lets any normal web browser access applications on the decentralised web powered by Ethereum.',
}, {
  question: 'Web3',
  answer: 'A collection of libraries which enable you to interact with an Ethereum node.',
}, {
  question: 'Decentralised',
  answer: 'Not being controlled or able to be changed by one person, group, or entity.',
}, {
  question: 'dApp',
  answer: 'Stands for decentralised application.',
}, {
  question: 'Wallet',
  answer: 'Tool for storing cryptocurrency and other blockchain assets.',
}, {
  question: 'ERC20',
  answer: 'A standard for tokens running on the Ethereum network.',
}, {
  question: 'Wallet Address',
  answer: 'A hashed version of your public key which people can use to send crypto to you.',
}, {
  question: 'Public Key',
  answer: 'Publicly available identifier in encryption.',
}, {
  question: 'Private Key',
  answer: 'Only you control which allows you to decrypt anything on your public key, such as to send crypto you own.',
}, {
  question: 'Single Point of Failure Risk',
  answer: 'The risk that if one party, service, etc. goes down then everything is lost. If Uber (the company) disappears, then the app stops working. ',
}, {
  question: 'Counterparty (Risk)',
  answer: 'Relying on someone else, often unknown to you, to complete a transaction or task.',
}];

const sectionSecurity = [{
  question: 'What if an asset is stolen?',
  answer: 'This is a matter for police and will be handled by the asset manager, in the event that investors are not happy with how it was handled they can vote to burn the asset managers stake. If the asset is insured it will be replaced.',
}, {
  question: 'What if I lose access to my metamask account?',
  answer: 'All ownership records and revenue distribution pathways are held on the metamask account that made the asset contributions. Like any crypto-currency, losing your wallet will result in a loss of funds. It is important to back up your metamask diligently and keep it protected from hackers.',
}, {
  question: 'What if the ethereum network goes down?',
  answer: 'The ethereum network is a vital component of MyBit. Congestion or temporary problems on the network will not affect balance or revenue entitlements, but may slow down revenue distribution in some instances.',
}, {
  question: 'What if the MyBit website goes down?',
  answer: 'IoT devices can often be automated so payments can flow directly to investors without ever having to touch third party hands. It also makes it easy to audit since data is available via the IoT cloud.',
}, {
  question: 'What if the MyBit application go down?',
  answer: 'This would prevent activity on the application but will not affect the smart contracts on the ethereum blockchain which handle  revenue of assets already funded through the platform; however the funding of assets will cease until the application is relaunched.',
}];

const sectionAssetManagers = [{
  question: 'What is an asset manager on MyBit?',
  answer: 'An asset manager is a person who has listed an asset on and had it successfully funded by investors.',
}, {
  question: 'What does an asset manager on MyBit do?',
  answer: 'Asset managers maintain and oversee the various assets they manage on behalf of investors. This includes preparing the required legal and regulatory framework for the asset in their given location, arranging various lease / merchant agreements (where necessary) arranging insurance and repairs, distributing revenue, and more.',
}, {
  question: 'How does an asset manager get compensated for their work?',
  answer: 'Asset managers are paid a fraction of the total asset revenue as it is generated.',
}, {
  question: 'How is asset manager collateral calculated?',
  anchor: true,
  answer: <React.Fragment>Asset collateral is standardised based on payment channels of asset management and asset manager history as described below.<br /><br />

Based on Asset Manager History:<br />
0-4 Assets - 35% collateral<br />
5-9 Assets - 25%<br />
10-24 Assets 20%<br />
25+ Assets: 10%<br />
<br />
Additional components:<br />
If asset manager has to receive funds from fundraise to purchase the asset:<br />
Add 100% collateral.<br />
<br />
If fiat is received and has to be converted into crypto to pay investors? Then, multiply asset manager history collateral by 3x.<br />
<br />
Example 1: It's my first asset, all fiat, (this would be a max collateral scenario)<br />
(35%x3) + 100% = 205% collateral<br />
<br />
Example 2: 5th asset, payment in fiat, payout in crypto<br />
<br />
25% + 100% = 125%<br />
<br />
Example 3: 10th asset, payment in crypto, payout in fiat<br />
<br />
(20%x3) = 60%<br />
<br />
Example 4: 30th asset, payment and payout in crypto, (lowest collateral scenario)<br />

= 10%<br />
</React.Fragment>
}, {
  question: 'How are asset managers selected?',
  answer: 'Anyone can be an asset manager by completing the verification steps and having an asset funded on the platform. Investors personally select the assets they perceive to have the best asset managers and asset situation. This can be assessed by fees, asset manager history and credentials, supporting documents surrounding asset due diligence etc.',
}, {
  question: 'What if asset managers perform poorly?',
  answer: 'Asset managers are able to be voted out by consensus of asset investor capital weight. Additionally, they post a large collateral payment at the start of the listing process which is payed back to them incrementally. If they fail to oversee the asset correctly their collateral is at risk of being burned. These factors, along with reputation, serve as powerful incentives to carry out the role correctly.',
}];

export const FAQ = [{
  title: 'Value of MyBit',
  content: sectionValueOfMyBitGo,
}, {
  title: 'Fees',
  content: sectionFees,
}, {
  title: 'How it Works',
  content: sectionHowItWorks,
},, {
  title: 'About MyBit',
  content: sectionAbout,
}, {
  title: 'Getting Started',
  content: sectionGettingStarted,
}, {
  title: 'Investing',
  content: sectionInvesting,
}, {
  title: 'Assets',
  content: sectionAssets,
}, {
  title: 'Security',
  content: sectionSecurity,
}, {
  title: 'Asset Managers',
  content: sectionAssetManagers,
}, {
  title: 'Common Terms',
  content: sectionCommonTerms,
}];

export const Buttons = [{
  type: 'primary',
  text: 'Get Metamask',
  url: 'https://metamask.io/',
}, {
  type: 'primary',
  text: 'Request Test Ether',
  url: 'https://faucet.metamask.io/',
}, {
  type: 'primary',
  text: 'Telegram Support',
  url: 'https://t.me/mybitio',
  icon: Telegram,
  isTelegram: true,
}, {
  type: '',
  text: 'Report Bug',
  url: 'https://github.com/MyBitFoundation/MyBit-Go.website/issues',
}];

