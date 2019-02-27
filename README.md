<p align="center">
  <a href="https://mybit.io/">
    <img alt="MyBit Logo" src="./src/images/MyBit-logo.svg" width="150">
  </a>
</p>


# MyBitDapp-FrontEnd

[![CircleCI](https://circleci.com/gh/MyBitFoundation/MyBit-Go.svg?style=svg)](https://circleci.com/gh/MyBitFoundation/MyBit-Go)

<br/>

🎨 The Front End that supports the MyBit Platform™

MyBit offers a fast, secure and cost-effective investing experience. Powered by Ethereum.

The MyBit Decentralized Application (DApp) enables anyone to invest directly in revenue generating assets.
<br/>

### Versions
>***0.0.1.alpha***
Note, this is an Alpha version which may not be well tested. Features in this version are not final.

- The Assets Funding Hub Contract Interface via web3
- ETH and MYB Account data view
- The Assets Portfolio and Revenue Contract Explorer
- [IPFS](https://github.com/ipfs) (A peer-to-peer hypermedia protocol) testflight

<br/><br/>

## Tools Used

#### Next.js
#### Styled Components
#### Express

### Installing the dependencies with [yarn](https://yarnpkg.com/en/docs/usage)
```sh
yarn install
```
### Development server
```sh
yarn dev
```
### Environment Variables

### Contexts
The application is built around a series of Contexts (See [React Context](https://reactjs.org/docs/context.html)) in conjunction with [HOCs](https://reactjs.org/docs/higher-order-components.html) to provide different data to different components across the appliacation.

The following Contexts are available: 

- MetamaskChecker
- Blockchain
- AIrtable
- TokenPrices

So if you need any of the information inside these contexts you can use the `with` high order component each of them provides.

### File Structure

### Patterns

### Server


### User Documentation
MyBit Go follows user-centered design and documentation.
For User Flow docs check [this page](./TESTING.md).

### Powered with
<br/>
<p>
<img src="./src/images/ethereum-logo.png" width="30%">
</p>
</p>

<br/><br/><br/>
<p align="center">
    <a href="https://www.youtube.com/watch?v=SGFGfpKn1dg">
        <img src="./src/images/rocket.png" width="70%">
    </a>
</a>
<br/>

<p align="center">
MyBit Platform™ CHE-177.186.963<br/>
</p>
