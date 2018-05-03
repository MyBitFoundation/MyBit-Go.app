import React, { Component } from 'react';
import './styles/App.css';

import { AppHeader } from './components/AppHeader';
import { NavigationBar } from './components/NavigationBar';
import { AssetDetailsPage } from './components/AssetDetailsPage';

import { connect } from 'react-redux';
import * as actions from './actions';

class App extends Component {
  render() {
    this.props.sendTestAction(false);
    return (
      <div>
        <AppHeader
          exchangeRate={2.13}
          myBitBalance={215}
          ethBalance={20}
          address="0x123f681646d4a755815f9cb19e1acc8565a0c2ac"
        />
        <NavigationBar />
        <div className="page-wrapper">
          <AssetDetailsPage
            information={{
              assetName: 'Bitcoin ATM',
              city: 'Zug',
              country: 'Switzerland',
              endDate: 'Fri, Apr 27',
              dueDate: new Date().setDate(new Date().getDate() + 2),
              raised: 99930,
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
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('printing a variable from redux state: ', state.example.testVar);

  return {
    testVar: state.example.testVar
  };
};

export default connect(mapStateToProps, actions)(App);