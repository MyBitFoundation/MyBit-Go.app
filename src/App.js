import React, { Component } from 'react';
import './styles/App.css';

import AppHeader from './components/AppHeader';
import NavigationBar from './components/NavigationBar';
import ExplorePage from './components/ExplorePage';

import { connect } from 'react-redux';
import * as actions from './actions';

const App = ({ state, sendTestAction }) => (
  <div>
    {console.log(state)}
    <AppHeader
      exchangeRate={2.13}
      myBitBalance={215}
      ethBalance={20}
      address="0x123f681646d4a755815f9cb19e1acc8565a0c2ac"
    />
    <NavigationBar />
    <div className="page-wrapper">
      <ExplorePage />
    </div>
    <div>
      <button onClick={() => sendTestAction('clicked')}>Click me!</button>
    </div>
  </div>
);

App.propTypes = {
  sendTestAction: PropTypes.func.isRequired,
  state: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps =
    dispatch => ({ sendTestAction: value => dispatch(actions.sendTestAction(value)) });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
