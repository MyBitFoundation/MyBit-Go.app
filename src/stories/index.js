import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import 'carbon-components/css/carbon-components.min.css';
import 'gridlex/dist/gridlex.min.css';
import '../styles/index.css';
import '../styles/NavigationBar.css';

import { getWeb3Async } from '../util/web3';

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
import { default as AssetFunding } from '../components/AssetFunding';
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

storiesOf('Explore Assets Page', module)
  .addDecorator(story => (
    <div style={{ padding: '0px 50px 0px 50px' }}>{story()}</div>
  ))
  .add('Normal view', () => (
    <ExploreAssetsPage
      assetsInfo={[
        {
          image: require('../images/Solar-Panel.png'),
          path: '/crypto-currency-atm',
          funded: '1000',
          goal: '4000',
          city: 'Lisbon',
          country: 'Portugal',
          name: 'Solar Powered Bench'
        },
        {
          image: require('../images/Solar-Panel-2.png'),
          path: '/solar-energy',
          funded: '2000',
          goal: '4000',
          city: 'Lisbon',
          country: 'Portugal',
          name: 'Solar Powered Bench'
        },
        {
          image: require('../images/bitcoin-atm-4-2.png'),
          path: '/crypto-currency-atm',
          funded: '3000',
          goal: '4000',
          city: 'Lisbon',
          country: 'Portugal',
          name: 'Bitcoin ATM'
        },
        {
          image: require('../images/bitcoin-atm-4-2.png'),
          path: '/solar-energy',
          funded: '4000',
          goal: '4000',
          city: 'Lisbon',
          country: 'Portugal',
          name: 'Bitcoin ATM'
        }
      ]}
    />
  ))
  .add('Loading', () => <ExploreAssetsPage loading={true} assetsInfo={[]} />)
  .add('No assets', () => (
    <ExploreAssetsPage loading={false} assetsInfo={[]} category="Solar Panel" />
  ));

storiesOf('Portfolio Page', module).add('view', () => <PortfolioPage />);

storiesOf('Transactions Page', module).add('view', () => <TransactionsPage />);

let assetInfo = {
  assetName: 'Bitcoin ATM',
  city: 'Zug',
  country: 'Switzerland',
  dueDate: new Date().setDate(new Date().getDate() + 2),
  raised: 50000,
  goal: 100000,
  investors: 5,
  minInvestment: 950,
  maxInvestment: 9990,
  expectedReturn: 18,
  details:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis metus, pretium eget venenatis quis, fringilla in mauris. Phasellus sit amet massa tellus. Proin eros augue, lobortis eget ex sit amet, accumsan tristique lorem.',
  description:
    'Proin luctus, neque eget tincidunt molestie, orci leo fringilla mauris, at tristique nisl quam vel turpis. Curabitur aliquam ante ac nulla vulputate, non vehicula quam venenatis. Sed pellentesque est justo, ac faucibus ex rutrum a. Sed placerat magna vitae justo tempus, in imperdiet enim pellentesque. Ut eget pulvinar massa. Morbi vitae turpis justo. Quisque tincidunt odio et eros vulputate sollicitudin. Nulla erat ipsum, tincidunt elementum felis eu, commodo sagittis lacus. Donec et ullamcorper est. Nullam tincidunt enim in tempus consequat.',
  address: '0xDe384n4aw4fs52'
};

storiesOf('Asset Details Page', module)
  .addDecorator(story => (
    <div style={{ padding: '0px 50px 0px 50px' }}>{story()}</div>
  ))
  .add('Normal view', () => <AssetDetailsPage information={assetInfo} />)
  .add('Loading', () => <AssetDetailsPage />);

const daysToGo = (
  <AssetDetails information={{ ...assetInfo }} currentEthInUsd={700} />
);

assetInfo['dueDate'] = new Date().setDate(new Date().getDate() - 2);
const expired = (
  <AssetDetails information={{ ...assetInfo }} currentEthInUsd={700} />
);

assetInfo['dueDate'] = new Date().setDate(new Date().getDate() + 1);
const oneDayToGoTomorrow = (
  <AssetDetails information={{ ...assetInfo }} currentEthInUsd={700} />
);

assetInfo['dueDate'] = new Date().setDate(new Date().getDate() + 0.0001);
const oneDayToGoToday = (
  <AssetDetails information={{ ...assetInfo }} currentEthInUsd={700} />
);

assetInfo['raised'] = 100000;
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

storiesOf('Address', module).add('Normal', () => (
  <Address address={'0x123f681646d4a755815f9cb19e1acc8565a0c2ac'} />
));

storiesOf('Category', module).add('view', () => <Category />);

storiesOf('Button', module).add('view', () => <Button />);

storiesOf('Small Info Panel', module).add('view', () => <SmallInfoPanel />);

storiesOf('Asset Hero', module).add('view', () => <AssetHero />);

//@TODO Refactor this into a wrappeable component through React.children
class AssetFundingWeb3Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { web3: undefined };
  }
  async componentDidMount() {
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
  <TransactionHistory />
));

storiesOf('Row', module).add('view', () => <Row />);
