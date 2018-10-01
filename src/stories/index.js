import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MemoryRouter from 'react-router-dom/MemoryRouter';

import 'gridlex/dist/gridlex.min.css';
import '../styles/index.css';
import '../styles/NavigationBar.css';
import { assetInfo, assets, transactions } from './constants';

import getWeb3Async from '../util/web3';

import AssetDetailsPage from '../components/pages/AssetDetailsPage';
import ExploreAssetsPage from '../components/pages/ExploreAssetsPage';
import ExplorePage from '../components/pages/ExplorePage';
import PortfolioPage from '../components/pages/PortfolioPage';
import TransactionHistoryPage from '../components/pages/TransactionHistoryPage';

import AppHeader from '../components/AppHeader';
import AssetDetails from '../components/AssetDetails';
import AssetFunding from '../components/AssetFunding';
import NavigationBar from '../components/NavigationBar';
import Address from '../components/Address';

const MemoryDecorator = story => (
  <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
);

const Header = (
  <AppHeader
    prices={{ mybitPrice: 0.05 }}
    user={{
      myBitBalance: 100,
      ethBalance: 1000,
      userName: '0xd12cd8a37f074e7eafae618c986ff825666198bd',
    }}
  />
);

storiesOf('Header', module)
  .add('Normal view', () => Header)
  .add('Loading', () => <AppHeader prices={{}} user={{}} />);

const Nav = (
  <NavigationBar
    currentPath="/explore"
    clickHandler={action('Clicked nav bar option')}
  />
);
storiesOf('Navigation Bar', module)
  .addDecorator(MemoryDecorator)
  .add('view', () => Nav);

storiesOf('Header & Nav Bar', module)
  .addDecorator(MemoryDecorator)
  .add('view', () => (
    <div>
      {Header}
      {Nav}
    </div>
  ));

storiesOf('Explore Page', module)
  .addDecorator(MemoryDecorator)
  .add('Loading', () => (
    <div className="page-wrapper">
      <ExplorePage
        loading={{ assets: true }}
        clickHandler={action('Clicked category')}
      />
    </div>
  ))
  .add('Normal', () => (
    <div className="page-wrapper">
      <ExplorePage
        loading={{ assets: false }}
        assets={assets}
        clickHandler={action('Clicked category')}
      />
    </div>
  ));

storiesOf('Explore Assets Page', module)
  .addDecorator(MemoryDecorator)
  .addDecorator(story => (
    <div style={{ padding: '0px 50px 0px 50px' }}>{story()}</div>
  ))
  .add('Normal view', () => (
    <ExploreAssetsPage
      assets={assets}
      loading={{ assets: false }}
      match={{ params: { category: 'uncategorized' } }}
    />
  ))
  .add('Loading', () => (
    <ExploreAssetsPage
      loading={{ assets: true }}
      assets={[]}
      match={{ params: { category: 'uncategorized' } }}
    />
  ))
  .add('No assets', () => (
    <ExploreAssetsPage
      loading={{ assets: false }}
      assets={[]}
      match={{ params: { category: 'Solar Panel' } }}
      category="Solar Panel"
    />
  ));

storiesOf('Portfolio Page', module)
  .add('Normal view', () => (
    <PortfolioPage
      loading={{ transactionHistory: false }}
      prices={{ etherPrice: 400 }}
      assets={assets}
    />
  ))
  .add('Loading', () => (
    <PortfolioPage loading={{ transactionHistory: true }} />
  ));

storiesOf('Address', module)
  .add('Loading', () => <Address />)
  .add('Normal', () => (
    <Address userName="0xd12cd8a37f074e7eafae618c986ff825666198bd" />
  ));

storiesOf('Asset Details Page', module)
  .addDecorator(MemoryDecorator)
  .addDecorator(story => (
    <div style={{ padding: '0px 50px 0px 50px' }}>{story()}</div>
  ))
  .add('Normal view', () => (
    <AssetDetailsPage
      assets={assets}
      match={{
        params: {
          category: 'uncategorized',
          assetId:
            '0x32bcdca6197cf6bb2b3ec3045ad1e7ca72bafd52f147616f7621205127914ed1',
        },
      }}
      loading={{ assets: false }}
      prices={{ etherPrice: 400 }}
    />
  ))
  .add('Loading', () => <AssetDetailsPage loading={{ assets: true }} />);

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

storiesOf('Transaction History', module)
  .add('Loading', () => (
    <TransactionHistoryPage
      fetchTransactionHistory={() => {}}
      loading={{ transactionHistory: true }}
    />
  ))
  .add('Normal', () => (
    <TransactionHistoryPage
      fetchTransactionHistory={() => {}}
      loading={{ transactionHistory: false }}
      transactions={transactions}
    />
  ));
