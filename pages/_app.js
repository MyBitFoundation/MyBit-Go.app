import React from "react";
import { hot } from "react-hot-loader/root";
import App from "next/app";
import Head from 'next/head';
import BlockchainProvider from "components/BlockchainContext";
import KyberProvider from "components/KyberContext";
import AssetsProvider from "components/AssetsContext";
import NotificationsProvider from "components/NotificationsContext";
import ThreeBoxProvider from "components/ThreeBoxContext";
import TermsOfServiceProvider from "components/TermsOfServiceContext";
import Notifications from "components/Notifications";
import MetamaskProvider from "components/MetamaskContext";
import GlobalStyle from "components/globalStyle";
import AppWrapper from "components/AppWrapper";
import Theme from "components/Theme";
import MobileMenu from "components/MobileMenu";
import Cookie from "js-cookie";
import Router from "next/router";
import Footer from "ui/Footer";
import { navbarOptions } from "constants/navigationBar";
import { FULL_SCREEN_PAGES } from "constants/fullScreenPages";
import { COOKIES } from "constants/cookies";
import { SUPPORTED_NETWORKS } from "constants/supportedNetworks";


const globalHead = (
  <Head>
    <title>MyBit Go</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="description" content="Invest without a bank or broker and receive revenue instantly." />
    <link rel="manifest" href="/manifest.json" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="icon" sizes="310x310" href="/favicons/310x310.png" />
    <link rel="icon" sizes="192x192" href="/favicons/192x192.png" />
    <link rel="icon" sizes="180x180" href="/favicons/180x180.png" />
    <link rel="icon" sizes="144x144" href="/favicons/144x144.png" />
    <link rel="icon" sizes="152x152" href="/favicons/152x152.png" />
    <link rel="icon" sizes="150x150" href="/favicons/150x150.png" />
    <link rel="icon" sizes="120x120" href="/favicons/120x120.png" />
    <link rel="icon" sizes="114x114" href="/favicons/114x114.png" />
    <link rel="icon" sizes="96x96" href="/favicons/96x96.png" />
    <link rel="icon" sizes="76x76" href="/favicons/76x76.png" />
    <link rel="icon" sizes="72x72" href="/favicons/72x72.png" />
    <link rel="icon" sizes="70x70" href="/favicons/70x70.png" />
    <link rel="icon" sizes="60x60" href="/favicons/60x60.png" />
    <link rel="icon" sizes="57x57" href="/favicons/57x57.png" />
    <link rel="icon" sizes="48x48" href="/favicons/48x48.png" />
    <link rel="icon" sizes="36x36" href="/favicons/36x36.png" />
    <link rel="icon" sizes="32x32" href="/favicons/32x32.png" />
    <link rel="icon" sizes="16x16" href="/favicons/16x16.png" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@MyBit_DApp" />
    <meta name="twitter:title" content="MyBit" />
    <meta name="twitter:description" content="Invest without a bank or broker and receive revenue instantly." />
    <meta name="twitter:creator" content="@MyBit_DApp" />
    <meta name="twitter:image" content="https://files.mybit.io/social/mybit_twitter_cover.png" />
    <meta property="og:title" content="MyBit" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://mybit.io" />
    <meta property="og:image" content="https://files.mybit.io/social/mybit_facebook_cover.png" />
    <meta property="og:description" content="Invest without a bank or broker and receive revenue instantly." />
    <meta property="og:site_name" content="MyBit" />
  </Head>
)

class MyApp extends App {
  state = {
    mobileMenuOpen: false,
    network: undefined,
    userHasMetamask: undefined
  };

  saveFirstVisit = () => {
    try {
      if (!Cookie.get(COOKIES.NEW_USER)) {
        Cookie.set(COOKIES.NEW_USER, "true");
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  setNetwork = network => this.setState({ network });

  setUserHasMetamask = userHasMetamask => this.setState({ userHasMetamask });

  componentDidMount = () => {
    require("utils/disableReactDevTools");
    this.saveFirstVisit();
  };

  handleMobileMenuClicked = state => {
    this.setState({
      mobileMenuOpen: state
    });
  };

  render() {
    const { Component, pageProps, router } = this.props;
    const { mobileMenuOpen, network, userHasMetamask } = this.state;

    const isFullScreenPage = FULL_SCREEN_PAGES.includes(router.pathname);

    return (
      <Theme>
        {globalHead}
        <GlobalStyle />
        <WithProviders
          setNetwork={this.setNetwork}
          setUserHasMetamask={this.setUserHasMetamask}
          network={network}
          userHasMetamask={userHasMetamask}
        >
          <Notifications />
          <MobileMenu
            isOpen={mobileMenuOpen}
            items={navbarOptions}
            currentPath={router.route}
            handleMobileMenuState={this.handleMobileMenuClicked}
          >
            <React.Fragment>
              <AppWrapper
                isFullScreenPage={isFullScreenPage}
                handleMobileMenuState={this.handleMobileMenuClicked}
              >
                <React.Fragment>
                  <Component {...pageProps} currentPath={router.route} />
                </React.Fragment>
              </AppWrapper>
              <Footer isFullScreenPage={isFullScreenPage} />
            </React.Fragment>
          </MobileMenu>
        </WithProviders>
      </Theme>
    );
  }
}

const WithProviders = ({
  children,
  setNetwork,
  network,
  setUserHasMetamask,
  userHasMetamask
}) => (
  <NotificationsProvider>
    <KyberProvider
      network={network}
      supportedNetworks={SUPPORTED_NETWORKS}
      userHasMetamask={userHasMetamask}
    >
      <MetamaskProvider
        supportedNetworks={SUPPORTED_NETWORKS}
        setNetwork={setNetwork}
        setUserHasMetamask={setUserHasMetamask}
      >
        <AssetsProvider>
          <BlockchainProvider supportedNetworks={SUPPORTED_NETWORKS}>
            <ThreeBoxProvider>
              <TermsOfServiceProvider>{children}</TermsOfServiceProvider>
            </ThreeBoxProvider>
          </BlockchainProvider>
        </AssetsProvider>
      </MetamaskProvider>
    </KyberProvider>
  </NotificationsProvider>
);

export default hot(MyApp);
