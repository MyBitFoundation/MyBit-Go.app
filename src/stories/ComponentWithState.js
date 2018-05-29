import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import { newState } from './constants';
import '../styles/index.css';

const GetDispatchFunctions = (functions, props) => {
  const functionsToReturn = {};

  functions.forEach((functionName) => {
    switch (functionName) {
      case 'setTransactionHistoryFilters':
        functionsToReturn.setTransactionHistoryFilters = props.setTransactionHistoryFilters;
        break;
      default:
    }
  });
  return functionsToReturn;
};


class ComponentWithState extends Component {
  constructor(props) {
    super(props);
    this.nextState = {};
  }

  shouldComponentUpdate(nextProps) {
    this.nextState = nextProps.state;
    return true;
  }

  render() {
    const functionsRequiredByComponent = this.props.functions
      ? GetDispatchFunctions(this.props.functions, this.props)
      : {};

    const differentStates = JSON.stringify(this.nextState) !== JSON.stringify(this.props.state);

    if (!this.props.withData && differentStates) {
      this.props.resetState();
    } else if (this.props.withData && differentStates) {
      this.props.fillState(this.props.specificData ? this.props.specificData : newState);
    }

    return (
      <div className="page-wrapper">
        {React.cloneElement(
          this.props.children,
          {
 state: this.props.state,
            ...functionsRequiredByComponent,
          },
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps, actions)(ComponentWithState);

ComponentWithState.defaultProps = {
  functions: undefined,
  specificData: undefined,
};

ComponentWithState.propTypes = {
  children: PropTypes.element.isRequired,
  functions: PropTypes.arrayOf(PropTypes.string),
  withData: PropTypes.bool.isRequired,
  state: PropTypes.shape({ params: PropTypes.object }).isRequired,
  specificData: PropTypes.shape({ params: PropTypes.object }),
  resetState: PropTypes.func.isRequired,
  fillState: PropTypes.func.isRequired,
};
