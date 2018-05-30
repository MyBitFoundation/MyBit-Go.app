import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import { newState } from './constants';
import '../styles/index.css';

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
    const differentStates = JSON.stringify(this.nextState) !== JSON.stringify(this.props.state);

    if (!this.props.withData && differentStates) {
      this.props.actions.resetState();
    } else if (this.props.withData && differentStates) {
      this.props.actions.fillState(this.props.specificData ? this.props.specificData : newState);
    }

    return (
      <div className="page-wrapper">
        {React.cloneElement(
          this.props.children,
          {
            state: this.props.state,
            actions: this.props.actions,
          },
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actionCreators, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithState);

ComponentWithState.defaultProps = {
  specificData: undefined,
};

ComponentWithState.propTypes = {
  children: PropTypes.element.isRequired,
  withData: PropTypes.bool.isRequired,
  state: PropTypes.shape().isRequired,
  actions: PropTypes.shape({
    resetState: PropTypes.func.isRequired,
    fillState: PropTypes.func.isRequired,
  }).isRequired,
  specificData: PropTypes.shape(),
};
