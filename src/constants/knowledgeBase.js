import Telegram from '../images/telegram.svg';

const sectionAbout = [{
  question: 'What is MyBit Go?',
  answer: 'A platform which enables people to invest in a wide variety of assets without having to go through a broker.',
}, {
  question: 'Who can use it?',
  answer: 'Anyone. Unlike traditional funds which often have accredited investor requirements, MyBit Go let’s anyone participate.',
}, {
  question: 'What are the benefits?',
  answer: 'Lower fees, no single point of failure risk, no counterparty risk, and real time revenue distributions.',
}, {
  question: 'Why does it need smart contracts/Blockchain?',
  answer: 'Smart contracts are ideal for scenarios where two (or more) people who do not know each other need to conduct a transaction bc it automatically establishes trust. Also to guarantee terms are followed such as pay x person x percent of revenue. Finally it automatically records ownership in a ledger without single point of failure risk.',
}, {
  question: 'Why Ethereum?',
  answer: 'Nothing compares. Other Blockchains may have increased speed or lower fees, but they do so by sacrificing security. Since MyBit Go is a financial technology platform, security is of the utmost concern.',
}, {
  question: 'What is MYB?',
  answer: 'MYB stands for MyBit Token. The MyBit Token is used to power dApps built on top of MyBit infrastructure.',
}];

const sectionGettingStarted = [{
  question: 'What is metamask?',
  answer: 'An Ethereum client which enables users to interact with dApps without having to run a full node. Essentially it is needed to turn any normal browser into a portal for the decentralised web.',
}, {
  question: 'Why do I not need an email and account?',
  answer: 'Everything is linked to your metamask account. One of the greatest benefits of dApps is that you will never have to fill in personal information again to join a site or enter your payment information to make a purchase.',
}, {
  question: 'What is the ropsten test network?',
  answer: 'It’s made for testing Ethereum applications for free so real Ether is not consumed or at risk before an app is published to the mainnet.',
}, {
  question: 'What is testnet Ether',
  answer: 'It functions just like regular Ether but has no value because it is specifically designed to be used for testing purposes on Ethereum’s testnet.',
}];

const sectionInvesting = [{
  question: 'How do I invest in a project?',
  answer: 'Simple. Find an asset you want to invest in, choose the amount you want to contribute, and confirm the transaction via metamask which will automatically generate a pop up.',
}, {
  question: 'Can I invest with something other than Ether?',
  answer: 'MyBit Go runs solely off of Ether; however, many technologies such as Kyber will allow a user to spend any token they want. Once those technologies come to market, options to invest with different currencies, assets, etc. will become virtually limitless.',
}, {
  question: 'How do I receive revenue?',
  answer: 'It automatically is sent to your metamask account in real time as an asset you own generates revenue.',
}, {
  question: 'What if my transaction did not go through?',
  answer: 'Sometimes the Ethereum network rejects transactions due to low gas or other reasons. Please try again with higher gas limits and price. If the problem persists it is most likely an issue with the Ethereum network.',
}, {
  question: 'How long are assets available for funding?',
  answer: 'A maximum of thirty (30) days, or until the funding goal is reached.',
}, {
  question: 'What if the asset isn’t fully funded?',
  answer: 'Contributed Ether is automatically sent back to investors.',
}, {
  question: 'Ether price is volatile, how does that impact investors?',
  answer: 'The total funding is always constant in US Dollar. We implement MakerDAO (DAI) a stable coin to remove volatility risk by automatically converting as the Ether is contributed.',
}];

const sectionAssets = [{
  question: 'How do partners get added?',
  answer: 'MyBit must approve any new partner. In the future our goal is to decentralise this so the community can vote to approve or reject partners.',
}, {
  question: 'What is the selection process?',
  answer: 'The criteria we look for in a partner can vary but typically consists of company history and due diligence, logistics network, asset reliability plus lifespan, and of course revenue potential.',
}, {
  question: 'What types of assets are listed?',
  answer: 'Any type of IoT (Internet of Things) device that passes our selection process.',
}, {
  question: 'Why IoT?',
  answer: 'IoT devices can often be automated so payments can flow directly to investors without ever having to touch third party hands. It also makes it easy to audit since data is available via the IoT cloud.',
}, {
  question: 'How do assets make money?',
  answer: 'Just like anything, by providing a good or service. A bitcoin ATM charges transaction fees, someone may pay to use a 3d printer or rent a co-working space, etc.',
}, {
  question: 'How are operational expenses and repairs dealt with?',
  answer: 'These terms are clearly defined to investors in the asset listing. They can either be priced into the cost of the asset or deducted from revenue as a percentage.',
}, {
  question: 'Can an asset be delisted?',
  answer: 'If a partner violates any of our terms and conditions or there is no longer a demand for a specific asset, yes it can be delisted.',
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


export const FAQ = [{
  title: 'About MyBit Go',
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
  className: 'HelpPage-buttons--is-telegram',
  url: 'https://t.me/mybitio',
  icon: Telegram,
}, {
  type: '',
  text: 'Report Bug',
  url: 'https://github.com/MyBitFoundation/MyBit-Go.website/issues',
}];

