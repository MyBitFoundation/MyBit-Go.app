import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import 'carbon-components/css/carbon-components.min.css';
import 'gridlex/dist/gridlex.min.css';
import '../styles/index.css';
import '../styles/NavigationBar.css';

import { AppHeader } from '../components/AppHeader';
import { NavigationOption } from '../components/NavigationOption';
import { Address } from '../components/Address';
import { ExplorePage } from '../components/ExplorePage';
import { Category } from '../components/Category';
import { ExploreAssetsPage } from '../components/ExploreAssetsPage';
import { FiltersBar } from '../components/FiltersBar';
import { Button } from '../components/Button';
import { Asset } from '../components/Asset';
import { PortfolioPage } from '../components/PortfolioPage';
import { SmallInfoPanel } from '../components/SmallInfoPanel';
import { TransactionsPage } from '../components/TransactionsPage';
import { TransactionHistory } from '../components/TransactionHistory';
import { Row } from '../components/Row';
import { AssetDetailsPage } from '../components/AssetDetailsPage';
import { AssetHero } from '../components/AssetHero';
import { AssetDetails } from '../components/AssetDetails';
import { AssetFunding } from '../components/AssetFunding';
import { ConfirmationPopup } from '../components/ConfirmationPopup';
import { Grid } from 'semantic-ui-react';
import { AppSidebar } from '../components/AppSidebar';
import { NavigationBar } from '../components/NavigationBar';

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

storiesOf('Explore Assets Page', module).add('view', () => (
  <ExploreAssetsPage />
));

storiesOf('Asset', module).add('view', () => (
  <Asset
    image={require('../images/Solar Panel 2.png')}
    path="/solar-energy"
    funded="2000"
    goal="4000"
    city="Lisbon"
    country="Portugal"
    name="Solar Powered Bench"
    clickHandler={action('Clicked to contribute')}
  />
));

storiesOf('Portfolio Page', module).add('view', () => <PortfolioPage />);

storiesOf('Transactions Page', module).add('view', () => <TransactionsPage />);

storiesOf('Asset Details Page', module).add('view', () => <AssetDetailsPage />);

storiesOf('Address', module).add('view', () => <Address />);

storiesOf('Category', module).add('view', () => <Category />);

storiesOf('Button', module).add('view', () => <Button />);

storiesOf('Small Info Panel', module).add('view', () => <SmallInfoPanel />);

storiesOf('Asset Hero', module).add('view', () => <AssetHero />);

storiesOf('Asset Details', module).add('view', () => <AssetDetails />);

storiesOf('Asset Funding', module).add('view', () => <AssetFunding />);

storiesOf('Confirmation Popup', module).add('view', () => (
  <ConfirmationPopup />
));

storiesOf('Transaction History', module).add('view', () => (
  <TransactionHistory />
));

storiesOf('Row', module).add('view', () => <Row />);
