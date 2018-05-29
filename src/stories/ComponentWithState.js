import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { newState } from './constants';

class ComponentWithState extends Component {
  constructor(props) {
    super(props);
    this.nextState;
  }

  shouldComponentUpdate(nextProps) {
    this.nextState = nextProps.state;
    return true;
  }

  render() {
    const functionsRequiredByComponent = this.props.functions ? GetDispatchFunctions(this.props.functions, this.props) : {};

    const differentStates = JSON.stringify(this.nextState) !== JSON.stringify(this.props.state);

    if (!this.props.withData && differentStates) {
      this.props.resetState();
    } else if (this.props.withData && differentStates) {
      this.props.fillState(this.props.specificData ? this.props.specificData : newState);
    }

    return (
      <div style={{ padding: '0px 50px' }}>
        {React.cloneElement(this.props.children, { state: this.props.state, ...functionsRequiredByComponent })}
      </div>
    );
  }
}

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps, actions)(ComponentWithState);


function GetDispatchFunctions(functions, props) {
  const functionsToReturn = {};

  functions.map((functionName) => {
    switch (functionName) {
      case 'setTransactionHistoryFilters':
        functionsToReturn.setTransactionHistoryFilters = props.setTransactionHistoryFilters;
    }
  });
  return functionsToReturn;
}
