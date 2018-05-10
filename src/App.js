import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles/App.css';

import { AppHeader } from './components/AppHeader';
import { NavigationBar } from './components/NavigationBar';
import { ExplorePage } from './components/ExplorePage';

import * as actions from './actions';

const App = ({ sendTestAction }) => {
  // TODO: Do you really want this to happen on _every_ render?
  sendTestAction(false);
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
        <ExplorePage />
      </div>
    </div>
  );
};

App.propTypes = {
  sendTestAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log('printing a variable from redux state: ', state.example.testVar);

  return {
    testVar: state.example.testVar,
  };
};

export default withRouter(connect(mapStateToProps, actions)(App));
