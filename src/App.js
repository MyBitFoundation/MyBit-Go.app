import React, { Component } from 'react';
import './styles/App.css';

import { AppHeader } from './components/AppHeader';
import { NavigationBar } from './components/NavigationBar';
import { ExploreAssetsPage } from './components/ExploreAssetsPage';

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
          <ExploreAssetsPage
            loading={false}
            assetsInfo={[]}
            category="Solar Panel"
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
