import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MemoryRouter from 'react-router-dom/MemoryRouter';
import { Provider as ReduxProvider } from 'react-redux';
import PropTypes from 'prop-types';

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

import AppHeader from '../components/AppHeader';
import AssetDetails from '../components/AssetDetails';
import AssetFunding from '../components/AssetFunding';
import Button from '../components/Button';
import NavigationBar from '../components/NavigationBar';

import Address from '../components/Address';

import store from '..';
import { assetInfo, portfolio, noTransactions, headerLoading, header, explorePage, portfolioLoading } from './constants';

import ComponentWithState from './ComponentWithState';

const MemoryDecorator = (story, kind, isHeader = false) => (
  <MemoryRouter initialEntries={['/']}><div className={!isHeader ? 'page-wrapper' : 'aaa'}>{story()}</div></MemoryRouter>
);

const Header = (
  <AppHeader
    state={header}
  />
);

const Provider = ({
  children, withData, specificData,
}) =>
  (
    <ReduxProvider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <ComponentWithState
          withData={withData}
          specificData={specificData}
        >
          {children}
        </ComponentWithState>
      </MemoryRouter>
    </ReduxProvider>
  );

storiesOf('Header', module)
  .addDecorator((story, kind) => MemoryDecorator(story, kind, true))
  .add('Normal view', () => Header)
  .add('Loading', () => <AppHeader state={headerLoading} />);

storiesOf('Navigation Bar', module)
  .addDecorator((story, kind) => MemoryDecorator(story, kind, true))
  .add('view', () => (
    <NavigationBar currentPath="/explore" clickHandler={action('Clicked nav bar option')} />
  ));

storiesOf('Header & Nav Bar', module)
  .addDecorator((story, kind) => MemoryDecorator(story, kind, true))
  .add('view', () => (
    <div>
      {Header}
      <NavigationBar currentPath="/explore" clickHandler={action('Clicked nav bar option')} />
    </div>
  ));

storiesOf('Explore Page', module)
  .addDecorator(MemoryDecorator)
  .add('Normal View', () => (
    <ExplorePage state={{ loading: { assets: true } }} clickHandler={action('Clicked category')} />
  ))
  .add('Loading', () => (
    <ExplorePage state={explorePage} clickHandler={action('Clicked category')} />
  ));

storiesOf('Explore Assets Page', module)
  .addDecorator(MemoryDecorator)
  .add('Normal view', () => (
    <ExploreAssetsPage
      state={explorePage}
      match={{ params: { category: 'uncategorized' } }}
    />
  ))
  .add('Loading', () => <ExploreAssetsPage state={{ ...explorePage, loading: { assets: true } }} match={{ params: { category: 'Solar Panel' } }} />)
  .add('No assets', () => (
    <ExploreAssetsPage state={{ ...explorePage, loading: { assets: false } }} match={{ params: { category: 'Solar Panel' } }} />
  ));

storiesOf('Portfolio Page', module)
  .addDecorator(MemoryDecorator)
  .add('Normal view', () => <PortfolioPage state={portfolio} />)
  .add('Loading', () => <PortfolioPage state={portfolioLoading} />);

storiesOf('Address', module).add('view', () => <Address userName="0x123f681646d4a755815f9cb19e1acc8565a0c2ac" />);

storiesOf('Button', module).add('view', () => <Button />);

storiesOf('Asset Details Page', module)
  .addDecorator(MemoryDecorator)
  .add('Normal view', () => (
    <AssetDetailsPage
      state={{ ...explorePage, loading: { assets: true }, misc: { currentEthInUsd: 600 } }}
      match={{ params: { category: 'uncategorized', assetId: '0xc481012a7563a254e34971fa6eb679d6556726ebfafa7c0cb62d444f90b6f82c' } }}
    />
  ))
  .add('Loading', () => <AssetDetailsPage state={{ ...explorePage, loading: { assets: true }, misc: {} }} match={{ params: { category: 'Solar Panel', assetId: '123' } }} />);

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
    <Provider withData={false}>
      <TransactionHistoryPage />
    </Provider>
  ))
  .add('No transactions', () => (
    <Provider withData specificData={noTransactions}>
      <TransactionHistoryPage />
    </Provider>
  ))
  .add('With transactions', () => (
    <Provider withData >
      <TransactionHistoryPage />
    </Provider>
  ));


Provider.defaultProps = {
  specificData: undefined,
};

Provider.propTypes = {
  children: PropTypes.element.isRequired,
  withData: PropTypes.bool.isRequired,
  specificData: PropTypes.shape(),
};
