import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';
import Theme from '../theme';
import '../../../styles/BancorWidgetButton.css';

const BancorWidgetSpan = styled.span`
    font-size: 14px;
`;

class BancorWidgetButton extends Component {
  constructor(props) {
    super(props);
    this.initBancor = this.initBancor.bind(this);
    this.createSetup = this.createSetup.bind(this);
  }

  componentDidMount() {
    if(!document.getElementById('bancor-script')) {
      console.log('adding bancor-script')
      const scriptFile = document.createElement('script');
      scriptFile.setAttribute('src', 'https://widget-convert.bancor.network/v1');
      scriptFile.setAttribute('id', 'bancor-script');
      document.body.appendChild(scriptFile);
      window.scriptFile = scriptFile;
    } else {
      console.log('bancor script has already been added');
    }
  }

  createSetup() {
    if(document.getElementById('bancor-wc')) {
      console.log('bancor-wc exists and is now removed')
      let elem = document.getElementById('bancor-wc');
      elem.parentNode.removeChild(elem);
    }

    console.log('creating bancor-wc')
    const scriptDiv = document.createElement('div');
    scriptDiv.setAttribute('style', 'display: none;');
    scriptDiv.setAttribute('id', 'bancor-wc');
    document.body.appendChild(scriptDiv);
    this.initBancor();
  }

  initBancor() {
    if (window.BancorConvertWidget) {
      const {
        type, baseCurrencyId, pairCurrencyId, primaryColor, displayCurrency,
      } = this.props;
      window.BancorConvertWidget.init({
        type,
        baseCurrencyId,
        pairCurrencyId,
        primaryColor,
        displayCurrency,
      });
      window.BancorConvertWidget.showConvertPopup(this.props.operation);
    }
  }

  render() {
    return (
      <div className="BancorWidget__button">
        <Button
          styling={Theme.buttons.primary.blue}
          size="default"
          onClick={this.createSetup}
        >
          <BancorWidgetSpan>{this.props.children}</BancorWidgetSpan>
        </Button>
      </div>
    );
  }
}

BancorWidgetButton.propTypes = {
  children: PropTypes.node,
  type: PropTypes.number,
  baseCurrencyId: PropTypes.string,
  pairCurrencyId: PropTypes.string,
  primaryColor: PropTypes.string,
  displayCurrency: PropTypes.string,
  operation: PropTypes.oneOf(['buy', 'sell']),
};

BancorWidgetButton.defaultProps = {
  children: 'Buy MYB here',
  type: 1,
  baseCurrencyId: '5b164627ae2482321708eb93',
  pairCurrencyId: '5937d635231e97001f744267',
  primaryColor: '#1890ff',
  displayCurrency: 'ETH',
  operation: 'buy',
};


export default BancorWidgetButton;
