import React from 'react';
import PropTypes from 'prop-types';
import { Button, Loading } from 'carbon-components-react';
import axios from 'axios';
import AssetDetails from '../AssetDetails';
import { debug } from '../../constants';
import '../../styles/AssetDetailsPage.css';


class AssetDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEthInUsd: -1,
    };

    this.getEthereumValue = this.getEthereumValue.bind(this);
    this.coinMarketCapInterval = setInterval(() => {
      this.getEthereumValue();
    }, 5 * 60000);
  }

  componentDidMount() {
    this.getEthereumValue();
  }

  componentWillUnmount() {
    clearInterval(this.coinMarketCapInterval);
  }

  getEthereumValue() {
    axios
      .get('https://api.coinmarketcap.com/v2/ticker/1027/')
      .then((response) => {
        try {
          this.setState({
            currentEthInUsd: response.data.data.quotes.USD.price,
          });
        } catch (err) {
          debug(err);
        }
      }).catch(err => debug(err));
  }

  render() {
    const { assetId, category } = this.props.match.params;
    const loading = this.state.currentEthInUsd === -1 || !this.props.information;
    const backButton = (
      <Button
        kind="secondary"
        className="AssetDetailsPage__back-button"
        onClick={debug('Clicked to go back')}
      >
        BACK
      </Button>
    );

    const loadingElement = loading && (
      <div style={{ width: '100%', position: 'relative', top: '50px' }}>
        <Loading className="AssetDetailsPage--is-loading" withOverlay={false} />
        <p className="AssetDetailsPage-loading-message">
          Loading asset information
        </p>
      </div>
    );

    const assetDetails = !loading && (
      <AssetDetails
        information={this.props.information}
        currentEthInUsd={this.state.currentEthInUsd}
        handleContributeClicked={this.handleContributeClicked}
      />
    );

    return (
      <div style={{ position: 'relative' }}>
        {backButton}
        <h1>{`${category} / ${assetId}`}</h1>
        {loadingElement}
        {assetDetails}
      </div>
    );
  }
}

AssetDetailsPage.propTypes = {
  information: PropTypes.shape({}),
  match: PropTypes.shape({ params: PropTypes.object }).isRequired,
};

AssetDetailsPage.defaultProps = {
  information: undefined,
};

export default AssetDetailsPage;
