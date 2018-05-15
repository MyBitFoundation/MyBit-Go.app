import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles/App.css';

import AppHeader from './components/AppHeader';
import NavigationBar from './components/NavigationBar';
import ExplorePage from './components/ExplorePage';

import * as actions from './actions';

const App = ({ sendTestAction }) => (
  <div>
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
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps =
    dispatch => ({ sendTestAction: value => dispatch(actions.sendTestAction(value)) });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
