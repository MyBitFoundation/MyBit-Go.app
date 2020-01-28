
# MyBit Go

[![CircleCI](https://circleci.com/gh/MyBitFoundation/MyBit-Go.svg?style=svg)](https://circleci.com/gh/MyBitFoundation/MyBit-Go)

<https://app.mybit.io>

🎨 The Front End that supports the MyBit Platform™

MyBit offers a fast, secure and cost-effective investing experience. Powered by Ethereum.

The MyBit Decentralized Application (DApp) enables anyone to invest directly in revenue generating assets.

https://www.youtube.com/watch?v=SGFGfpKn1dg

### Versions
>***0.0.1.alpha***
Note, this is an Alpha version which may not be well tested. Features in this version are not final.

- The Assets Funding Hub Contract Interface via web3
- ETH and MYB Account data view
- The Assets Portfolio and Revenue Contract Explorer
- [IPFS](https://github.com/ipfs) (A peer-to-peer hypermedia protocol) testflight

## Contributing

MyBit Go leverages the following technology. It will help to have some knowledge of these modules and reference these links during your development.

- [React](https://reactjs.org/docs)
- [Next.js](https://nextjs.org/docs)
- [Ant Design components](https://ant.design/docs/react/introduce)
- [Styled Components](https://styled-components.com/docs)
- [Web3 JS](https://web3js.readthedocs.io)
- [IPFS](https://docs.ipfs.io)
- [3box](https://docs.3box.io)

### Environment Variables

`GOOGLE_PLACES_API_KEY` is required for connecting with `react-geocode`. [Get a Google Places API key](https://developers.google.com/places/web-service/get-api-key).

### Development tasks

```sh
yarn install
```

- `yarn run dev` Build, watch, and re-build during development. [http://127.0.0.1:8081](http://127.0.0.1:8081)
- `yarn run build` Build a production-ready version of the site.
- `yarn run export` Export the static version of the build.

Before submitting a PR please ensure the build runs successfully.

### React Contexts
The application is built around a series of Contexts (See [React Context](https://reactjs.org/docs/context.html)) in conjunction with [HOCs](https://reactjs.org/docs/higher-order-components.html) to provide different data to different components across the appliacation.

The following Contexts are available:

+ [./components/BancorContext.js](./components/BancorContext.js)
+ [./components/NotificationsContext.js](./components/NotificationsContext.js)
+ [./components/ThreeBoxContext](./components/ThreeBoxContext)
+ [./components/ThreeBoxContext/index.js](./components/ThreeBoxContext/index.js)
+ [./components/KyberContext](./components/KyberContext)
+ [./components/KyberContext/constants.js](./components/KyberContext/constants.js)
+ [./components/KyberContext/index.js](./components/KyberContext/index.js)
+ [./components/AssetsContext.js](./components/AssetsContext.js)
+ [./components/UI/CivicContext.js](./components/UI/CivicContext.js)
+ [./components/MetamaskContext](./components/MetamaskContext)
+ [./components/MetamaskContext/constants.js](./components/MetamaskContext/constants.js)
+ [./components/MetamaskContext/index.js](./components/MetamaskContext/index.js)
+ [./components/MetamaskContext/utils.js](./components/MetamaskContext/utils.js)
+ [./components/TermsOfServiceContext.js](./components/TermsOfServiceContext.js)
+ [./components/BlockchainContext.js](./components/BlockchainContext.js)

If you need any of the information inside these contexts you can use the `with` high order component each of them provides.

### Styling

As said previously we use Styled Components but we also use a set of standards and a way to style inside the application. You will notice some of our files don't yet follow these standards, refactoring is gradually being done, these decisions were made recently.

#### Theme provider
We use Styled Components [Theme Provider](https://www.styled-components.com/docs/advanced#theming) component to have access to our own theme properties. See [this](https://github.com/csmartinsfct/MyBit-Go.app/blob/hotfix/refactoring/components/Theme/index.js) file with the declaration and an example of using it [here](https://github.com/csmartinsfct/MyBit-Go.app/blob/hotfix/refactoring/components/MobileMenu/styledMobileMenuWrapper.js).

#### Standards for naming
Each styled component is ideally declared inside its own file and for this reason the name of that file, say you are customising a button and your component is call `Navbar`then this new styled component file would be named `navBarButton.js`. So you keep the name of the Main component attached to each styled component file used inside it.

In this case the main styled component `Navbar` could be declared in a different file using `navBarWrapper.js` and then used inside `/NavBar/index.js` like so: ´<NavBarWrapper>´.

So the folder structure would be:
```
NavBar/index.js
NavBar/navBarWrapper.js
NavBar/navBarButton.js
```


index.js:
```
<NavBarWrapper>
   <NavBarButton>
     Hello
  </NavBarButton>
</NavBarWrapper>
```

#### Standards for writing css
We use a mobile first approach. See more about it [here](https://zellwk.com/blog/how-to-write-mobile-first-css/).

See [this](https://itnext.io/thinking-in-styled-components-e230ea37c52c) document as a good reference on thinking in Styled Components.

### Global folders for your convenience
Using [babel](https://github.com/tleunen/babel-plugin-module-resolver).

- public
- components
- constants
- utils
- ui
- hooks

For example the developer can import from the above directories from anywhere.

```js
import Logo from "components/Logo";
import { ExternalLinks } from "constants/links";
```

Notice how it's not using relative `../` paths.

### Testing
MyBit Go follows user-centered design and documentation.
For User Flow docs check [this page](./TESTING.md).

### Deployment
See [./circleci](./circleci) and [./travis.yml](./travis.yml) for the steps used to generate the static site and deploy to IPFS.
