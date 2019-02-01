import React from 'react';
import App, { Container } from 'next/app';
import { withRouter } from 'next/router'
import AirtableProvider from '../components/Airtable';
import BlockchainProvider from '../components/Blockchain';
import NotificationsProvider from '../components/Notifications';
import MetamaskChecker from '../components/MetamaskChecker';
import BancorContainer from '../components/UI/BancorContainer';
import Head from '../components/Head';
import GlobalStyle from '../components/globalStyle';
import AppWrapper from '../components/AppWrapper';
import './empty.css';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
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

  componentDidMount = () => {
    this.firstVisitMiddleware();
  }

  getPopups = () => {

  }

  render () {
    const { Component, pageProps, router } = this.props
    return (
      <Container>
        <GlobalStyle />
        <Head/>
        <WithProviders>
        <BancorContainer>
          <AppWrapper>
            <Component {...pageProps} currentPath={router.route} />
          </AppWrapper>
          </BancorContainer>
        </WithProviders>
      </Container>
    )
  }
}

const WithProviders = ({ children }) => (
  <NotificationsProvider>
    <AirtableProvider>
      <MetamaskChecker>
        <BlockchainProvider>
          {children}
        </BlockchainProvider>
      </MetamaskChecker>
    </AirtableProvider>
  </NotificationsProvider>
);

export default withRouter(MyApp);
