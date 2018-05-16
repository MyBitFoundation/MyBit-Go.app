import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import 'carbon-components/css/carbon-components.min.css';
import 'gridlex/dist/gridlex.min.css';
import '../styles/index.css';
import '../styles/NavigationBar.css';

import getWeb3Async from '../util/web3';

import AssetDetailsPage from '../components/pages/AssetDetailsPage';
import ExploreAssetsPage from '../components/pages/ExploreAssetsPage';
import ExplorePage from '../components/pages/ExplorePage';
import PortfolioPage from '../components/pages/PortfolioPage';
import TransactionHistoryPage from '../components/pages/TransactionHistoryPage';

import Address from '../components/Address';
import AppHeader from '../components/AppHeader';
import AssetHero from '../components/AssetHero';
import AssetDetails from '../components/AssetDetails';
import AssetFunding from '../components/AssetFunding';
import Button from '../components/Button';
import Category from '../components/Category';
import ConfirmationPopup from '../components/ConfirmationPopup';
import NavigationBar from '../components/NavigationBar';
import Row from '../components/Row';
import SmallInfoPanel from '../components/SmallInfoPanel';

const solarPanel1 = require('../images/Solar-Panel.png');
const solarPanel2 = require('../images/Solar-Panel-2.png');
const bitcoinAtm = require('../images/bitcoin-atm-4-2.png');

const Header = (
  <AppHeader
    exchangeRate={2.13}
    myBitBalance={215}
    ethBalance={20}
    address="0x123f681646d4a755815f9cb19e1acc8565a0c2ac"
  />
);

storiesOf('Header', module)
  .add('Normal view', () => Header)
  .add('Loading', () => <AppHeader />);

storiesOf('Navigation Bar', module).add('view', () => (
  <NavigationBar clickHandler={action('Clicked nav bar option')} />
));

storiesOf('Header & Nav Bar', module).add('view', () => (
  <div>
    {Header}
    <NavigationBar clickHandler={action('Clicked nav bar option')} />
  </div>
));

storiesOf('Explore Page', module).add('view', () => (
  <div className="page-wrapper">
    <ExplorePage clickHandler={action('Clicked category')} />
  </div>
));

storiesOf('Explore Assets Page', module)
  .addDecorator(story => (
    <div style={{ padding: '0px 50px 0px 50px' }}>{story()}</div>
  ))
  .add('Normal view', () => (
    <ExploreAssetsPage
      assetsInfo={[
        {
          image: solarPanel1,
          path: '/crypto-currency-atm',
          funded: '1000',
          goal: '4000',
          city: 'Lisbon',
          country: 'Portugal',
          name: 'Solar Powered Bench',
        },
        {
          image: solarPanel2,
          path: '/solar-energy',
          funded: '2000',
          goal: '4000',
          city: 'Lisbon',
          country: 'Portugal',
          name: 'Solar Powered Bench',
        },
        {
          image: bitcoinAtm,
          path: '/crypto-currency-atm',
          funded: '3000',
          goal: '4000',
          city: 'Lisbon',
          country: 'Portugal',
          name: 'Bitcoin ATM',
        },
        {
          image: bitcoinAtm,
          path: '/solar-energy',
          funded: '4000',
          goal: '4000',
          city: 'Lisbon',
          country: 'Portugal',
          name: 'Bitcoin ATM',
        },
      ]}
    />
  ))
  .add('Loading', () => <ExploreAssetsPage loading assetsInfo={[]} />)
  .add('No assets', () => (
    <ExploreAssetsPage loading={false} assetsInfo={[]} category="Solar Panel" />
  ));

storiesOf('Portfolio Page', module).add('view', () => <PortfolioPage />);

storiesOf('Asset Details Page', module).add('view', () => <AssetDetailsPage />);

storiesOf('Address', module).add('view', () => <Address />);

storiesOf('Category', module).add('view', () => <Category />);

storiesOf('Button', module).add('view', () => <Button />);

storiesOf('Small Info Panel', module).add('view', () => <SmallInfoPanel />);

storiesOf('Asset Hero', module).add('view', () => <AssetHero />);

storiesOf('Asset Details', module).add('view', () => <AssetDetails />);

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

storiesOf('Confirmation Popup', module).add('view', () => (
  <ConfirmationPopup />
));

storiesOf('Transaction History', module).add('view', () => (
  <TransactionHistoryPage />
));

storiesOf('Row', module).add('view', () => <Row />);
