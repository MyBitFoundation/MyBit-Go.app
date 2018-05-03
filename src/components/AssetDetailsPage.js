import React from 'react';
import { Button, Loading } from 'carbon-components-react';
import { AssetDetails } from './AssetDetails';
import { debug } from '../constants';
import '../styles/AssetDetailsPage.css';
import axios from 'axios';

export class AssetDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      loading: true,
      currentEthInUsd: -1
    };

    this.getEthereumValue = this.getEthereumValue.bind(this);
    this.coinMarketCapInterval = setInterval(() => {
      this.getEthereumValue();
    }, 5 * 60000);
  }

  componentDidMount() {
    this.getEthereumValue();
  }

  componenWillUnmount() {
    this.clearInterval();
  }

  clearInterval() {
    if (this.coinMarketCapInterval) {
      clearInterval(this.coinMarketCapInterval);
    }
  }

  getEthereumValue() {
    axios
      .get('https://api.coinmarketcap.com/v2/ticker/1027/')
      .then(response => {
        try {
          this.setState({
            currentEthInUsd: response.data.data.quotes.USD.price
          });
          if (this.props.information) {
            this.setState({ loading: false });
          }
        } catch (err) {
          debug(err);
        }
      })
      .catch(function(err) {
        debug(err);
      });
  }

  render() {
    const backButton = (
      <Button
        kind="secondary"
        className="AssetDetailsPage__back-button"
        onClick={debug('Clicked to go back')}
      >
        BACK
      </Button>
    );

    const loadingElement = this.state.loading && (
      <div style={{ width: '100%', position: 'relative', top: '50px' }}>
        <Loading className="AssetDetailsPage--is-loading" withOverlay={false} />
        <p className="AssetDetailsPage-loading-message">
          Loading asset information
        </p>
      </div>
    );

    const assetDetails = !this.state.loading && (
      <AssetDetails
        information={this.props.information}
        currentEthInUsd={this.state.currentEthInUsd}
      />
    );

    return (
      <div>
        {backButton}
        {loadingElement}
        {assetDetails}
      </div>
    );
  }
}
