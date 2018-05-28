import React, { Component } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MemoryRouter from 'react-router-dom/MemoryRouter';
import { connect } from 'react-redux';
import { Provider as ReduxProvider } from 'react-redux';
import addonAPI from '@storybook/addons';

import * as actions from '../actions';

import 'carbon-components/css/carbon-components.min.css';
import 'gridlex/dist/gridlex.min.css';
import '../styles/index.css';
import '../styles/NavigationBar.css';
import { assetsInfo, assetInfo, portfolio, noTransactions } from './constants';


import getWeb3Async from '../util/web3';

import AssetDetailsPage from '../components/pages/AssetDetailsPage';
import ExploreAssetsPage from '../components/pages/ExploreAssetsPage';
import ExplorePage from '../components/pages/ExplorePage';
import PortfolioPage from '../components/pages/PortfolioPage';
import TransactionHistoryPage from '../components/pages/TransactionHistoryPage';


import AppHeader from '../components/AppHeader';
import AssetHero from '../components/AssetHero';
import AssetDetails from '../components/AssetDetails';
import AssetFunding from '../components/AssetFunding';
import Button from '../components/Button';
import Category from '../components/Category';
import NavigationBar from '../components/NavigationBar';
import Row from '../components/Row';
import SmallInfoPanel from '../components/SmallInfoPanel';

import Address from '../components/Address';

import configureStore from '../store/configureStore';

import ComponentWithState from './ComponentWithState';



const MemoryDecorator = story => (
  <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
);

const Header = (
  <AppHeader
    exchangeRate={2.13}
    myBitBalance={215}
    ethBalance={20}
    address="0x123f681646d4a755815f9cb19e1acc8565a0c2ac"
  />
);

storiesOf('Header', module)
  .add('Normal view', () => <Provider children={<AppHeader />} />)
  .add('Loading', () => <Provider children={<AppHeader />} />);

storiesOf('Navigation Bar', module)
  .addDecorator(MemoryDecorator)
  .add('view', () => (
    <NavigationBar clickHandler={action('Clicked nav bar option')} />
  ));

storiesOf('Header & Nav Bar', module)
  .addDecorator(MemoryDecorator)
  .add('view', () => (
    <div>
      {Header}
      <NavigationBar clickHandler={action('Clicked nav bar option')} />
    </div>
  ));

storiesOf('Explore Page', module)
  .addDecorator(MemoryDecorator)
  .add('view', () => (
    <div className="page-wrapper">
      <ExplorePage clickHandler={action('Clicked category')} />
    </div>
  ));

storiesOf('Explore Assets Page', module)
  .addDecorator(MemoryDecorator)
  .add('Normal view', () => (
    <ExploreAssetsPage
      assetsInfo={assetsInfo}
      match={{ params: { category: 'Solar Panel' } }}
    />
  ))
  .add('Loading', () => <ExploreAssetsPage loading assetsInfo={[]} match={{ params: { category: 'Solar Panel' } }} />)
  .add('No assets', () => (
    <ExploreAssetsPage loading={false} assetsInfo={[]} match={{ params: { category: 'Solar Panel' } }} category="Solar Panel" />
  ));

storiesOf('Portfolio Page', module)
  .add('Normal view', () => <PortfolioPage portfolioValue={portfolio.portfolioValue} revenue={portfolio.revenue} />)
  .add('Loading', () => <PortfolioPage />);

storiesOf('Address', module).add('view', () => <Address />);

storiesOf('Category', module).add('view', () => <Category />);

storiesOf('Button', module).add('view', () => <Button />);

storiesOf('Small Info Panel', module).add('view', () => <SmallInfoPanel />);

storiesOf('Asset Hero', module).add('view', () => <AssetHero />);

storiesOf('Asset Details Page', module)
  .addDecorator(story => (
    <div style={{ padding: '0px 50px 0px 50px' }}>{story()}</div>
  ))
  .add('Normal view', () => (
    <AssetDetailsPage
      information={{ ...assetInfo }}
      match={{ params: { category: 'Solar Panel', assetId: '123' } }}
    />
  ))
  .add('Loading', () => <AssetDetailsPage match={{ params: { category: 'Solar Panel', assetId: '123' } }} />);

const daysToGo = (
  <AssetDetails information={{ ...assetInfo }} currentEthInUsd={700} />
);

assetInfo.dueDate = new Date().setDate(new Date().getDate() - 2);
const expired = (
  <AssetDetails information={{ ...assetInfo }} currentEthInUsd={700} />
);

assetInfo.dueDate = new Date().setDate(new Date().getDate() + 1);
const oneDayToGoTomorrow = (
  <AssetDetails information={{ ...assetInfo }} currentEthInUsd={700} />
);

assetInfo.dueDate = new Date().setDate(new Date().getDate() + 0.0001);
const oneDayToGoToday = (
  <AssetDetails information={{ ...assetInfo }} currentEthInUsd={700} />
);

assetInfo.raised = 100000;
const funded = (
  <AssetDetails information={{ ...assetInfo }} currentEthInUsd={700} />
);

storiesOf('Asset Details', module)
  .addDecorator(story => (
    <div style={{ padding: '0px 50px 0px 50px' }}>{story()}</div>
  ))
  .add('More than 1 day to go', () => daysToGo)
  .add('1 day to go (tomorrow)', () => oneDayToGoTomorrow)
  .add('1 day to go (today)', () => oneDayToGoToday)
  .add('End date expired', () => expired)
  .add('Goal reached', () => funded);

// @TODO Refactor this into a wrappable component through React.children
class AssetFundingWeb3Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { web3: undefined };
  }
  async componentWillMount() {
    this.setState({ web3: await getWeb3Async() });
  }
  render() {
    const { web3 } = this.state;
    return <div>{web3 && <AssetFunding web3={web3} />}</div>;
  }
}

storiesOf('Asset Funding', module).add('view', () => (
  <AssetFundingWeb3Wrapper />
));



const store = configureStore();

function Provider({ children, functionName, withData, specificData }) {
  return (
    <ReduxProvider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <ComponentWithState withData={withData} children={children} functionName={functionName} specificData={specificData} />
      </MemoryRouter>
    </ReduxProvider>
  );
};

storiesOf('Transaction History', module)
.add('Loading', (storyDetails) => (
  <Provider withData={false} children={<TransactionHistoryPage/>} functions={["setTransactionHistoryFilters"]} />
))
.add('No transactions', (storyDetails) => (
  <Provider withData children={<TransactionHistoryPage/>} functions={["setTransactionHistoryFilters"]} specificData={noTransactions} />
))
.add('With transactions', (api) => (
  <Provider withData children={<TransactionHistoryPage/>} functions={["setTransactionHistoryFilters"]} />
))
