import React from 'react';
import { hot } from 'react-hot-loader/root'
import App, { Container } from 'next/app';
import Router, { withRouter } from 'next/router'
import getConfig from 'next/config';
import AirtableProvider, { withAirtableContext } from 'components/Airtable';
import BlockchainProvider from 'components/Blockchain';
import NotificationsProvider from 'components/Notifications';
import TokenPricesProvider from 'components/TokenPrices';
import MetamaskChecker from 'components/MetamaskChecker';
import Head from 'components/Head';
import GlobalStyle from 'components/globalStyle';
import AppWrapper from 'components/AppWrapper';
import Theme from 'components/Theme'
import MobileMenu from 'components/MobileMenu'
import BancorContainer from 'ui/BancorContainer';

import {
  navbarOptions,
  WEB3_BACKUP_PROVIDER,
  SUPPORTED_TOKENS,
} from 'constants';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  state = {
    mobileMenuOpen: false,
  }

  isFirstVisit = () => {
    try {
      if (localStorage.getItem('mybitUser2') === null) {
        localStorage.setItem('mybitUser2', 'true');
        localStorage.setItem('onboardingRedirect', this.props.router.route);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  isFirstListAssetVisit = (firstVisit, currentRoute) => {
    // let the explore component handle this
    try {
      if (currentRoute === '/list-asset' && !firstVisit &&
            localStorage.getItem('first-list-asset-visit') === null) {
        localStorage.setItem('first-list-asset-visit', 'true');
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  firstVisitMiddleware = () => {
    const currentRoute = this.props.router.route;
    const firstVisit = this.isFirstVisit();
    const firstListAssetVisit = this.isFirstListAssetVisit(firstVisit, currentRoute);
    if(firstVisit){
      this.props.router.push('/onboarding');
    } else if(firstListAssetVisit) {
      this.props.router.push('/asset-manager');
    }
  }

  prefetchPages = () => {
    Router.prefetch('/asset')
    Router.prefetch('/transaction-history')
    Router.prefetch('/explore')
    Router.prefetch('/portfolio')
    Router.prefetch('/help')
    Router.prefetch('/watch-list')
    Router.prefetch('/list-asset')
  }

  componentDidMount = () => {
    require('utils/disableReactDevTools');
    this.prefetchPages();
    this.firstVisitMiddleware();
  }

  handleMobileMenuClicked = (state) => {
    this.setState({
      mobileMenuOpen: state,
    })
  }

  render () {
    const { Component, pageProps, router } = this.props;
    const {
      mobileMenuOpen,
    } = this.state;

    const isFullScreenPage = ['/onboarding', '/asset-manager', '/list-asset'].includes(router.pathname);

    return (
      <Container>
        <GlobalStyle />
        <Head/>
        <Theme>
          <WithProviders>
            <MobileMenu
              isOpen={mobileMenuOpen}
              items={navbarOptions}
              currentPath={router.route}
              handleMobileMenuState={this.handleMobileMenuClicked}
            >
              <React.Fragment>
                <BancorContainer>
                  <AppWrapper
                    isFullScreenPage={isFullScreenPage}
                    handleMobileMenuState={this.handleMobileMenuClicked}
                  >
                    <Component
                      {...pageProps}
                      currentPath={router.route}
                    />
                  </AppWrapper>
                </BancorContainer>
              </React.Fragment>
            </MobileMenu>
          </WithProviders>
        </Theme>
      </Container>
    )
  }
}

const WithProviders = ({ children }) => (
    <NotificationsProvider>
      <AirtableProvider>
        <TokenPricesProvider>
          <MetamaskChecker
            backupProvider={WEB3_BACKUP_PROVIDER}
            supportedTokens={SUPPORTED_TOKENS}
          >
            <BlockchainProvider>
              {children}
            </BlockchainProvider>
          </MetamaskChecker>
        </TokenPricesProvider>
      </AirtableProvider>
    </NotificationsProvider>
);

export default hot(withRouter(MyApp));
