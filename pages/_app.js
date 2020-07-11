import React from "react";
import { hot } from "react-hot-loader/root";
import App from "next/app";
import AirtableProvider, {
  withAirtableContext
} from "components/AirtableContext";
import BlockchainProvider from "components/BlockchainContext";
import KyberProvider from "components/KyberContext";
import AssetsProvider from "components/AssetsContext";
import NotificationsProvider from "components/NotificationsContext";
import ThreeBoxProvider from "components/ThreeBoxContext";
import TermsOfServiceProvider from "components/TermsOfServiceContext";
import Notifications from "components/Notifications";
import MetamaskProvider from "components/MetamaskContext";
import Head from "components/Head";
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

  prefetchPages = () => {
    Router.prefetch("/onboarding");
    Router.prefetch("/asset-manager");
    Router.prefetch("/asset");
    Router.prefetch("/transaction-history");
    Router.prefetch("/explore");
    Router.prefetch("/portfolio");
    Router.prefetch("/help");
    Router.prefetch("/watch-list");
    Router.prefetch("/list-asset");
  };

  componentDidMount = () => {
    require("utils/disableReactDevTools");
    this.prefetchPages();
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
      <>
        <GlobalStyle />
        <Head />
        <Theme>
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
      </>
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
    <AirtableProvider network={network} userHasMetamask={userHasMetamask}>
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
    </AirtableProvider>
  </NotificationsProvider>
);

export default hot(MyApp);
