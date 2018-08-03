import React from 'react';
import { debug } from '../constants';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    debug(error, info);
    this.state({ hasError: true });
  }

  render() {
    return null;
  }
}

export default ErrorBoundary;
