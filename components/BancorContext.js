import React, { Component } from 'react';
export const { Provider, Consumer } = React.createContext({});

export const withBancorContext = (Component) =>
  (props) => (
    <Consumer>
        {state => <Component {...props} bancorContext={state} />}
    </Consumer>
  )

class BancorProvider extends Component {
  constructor(props) {
    super(props);
    this.initBancor = this.initBancor.bind(this);
    this.defaultOptions = {
      type: 0,
      // baseCurrencyId: '5b164627ae2482321708eb93',
      // pairCurrencyId: '5937d635231e97001f744267',
      blockchainType: 'ethereum',
      baseCurrencyId: '5b164627ae2482321708eb93',
      pairCurrencyId: '5937d635231e97001f744267',
      primaryColor: '#1890ff',
      displayCurrency: 'ETH',
      operation: 'buy',
    }
    this.state = {
      initBancor: this.initBancor,
    };
  }

  componentDidMount() {
    if (!document.getElementById('bancor-script')) {
      const scriptFile = document.createElement('script');
      scriptFile.setAttribute('src', 'https://widget-convert.bancor.network/v1');
      scriptFile.setAttribute('id', 'bancor-script');
      document.body.appendChild(scriptFile);
      window.scriptFile = scriptFile;
    }
  }

  initBancor(opt = {}) {
    const options = {...this.defaultOptions, ...opt};
    if (document.getElementById('bancor-wc')) {
      const elem = document.getElementById('bancor-wc');
      elem.parentNode.removeChild(elem);
    }
    const scriptDiv = document.createElement('div');
    scriptDiv.setAttribute('style', 'display: none;');
    scriptDiv.setAttribute('id', 'bancor-wc');
    document.body.appendChild(scriptDiv);
    if (window.BancorConvertWidget) {
      window.BancorConvertWidget.createInstance({
        ...options,
      });
      window.BancorConvertWidget.showConvertPopup();
    }
  }
  render() {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}

export default BancorProvider;
