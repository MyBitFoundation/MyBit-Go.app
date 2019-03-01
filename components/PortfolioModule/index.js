import React from 'react';
import { compose } from 'recompose';
import Loading from 'components/Loading';
import { withBlockchainContext } from 'components/Blockchain'
import { withMetamaskContext } from 'components/MetamaskChecker'
import { withTokenPricesContext } from 'components/TokenPrices'

import {
  getPortfolioAssetDetails,
  getAllUserAssets,
} from './finantials';

class PortfolioModule extends React.Component {
  constructor(props){
    super(props);

    const{
      withdrawInvestorProfit,
      withdrawingAssetIds,
    } = props.blockchainContext;

    this.state = {
      loading: true,
      withdrawInvestorProfit,
      withdrawingAssetIds,
    }
  }

  componentDidMount = () => this.loadData(this.props);

  componentWillReceiveProps = (nextProps) => {
    this.loadData(nextProps)
  }

  loadData(props){
    const {
      blockchainContext,
      metamaskContext,
      pricesContext,
    } = props;

    const {
      loading,
      assets,
      withdrawingAssetIds,
    } = blockchainContext;

    const {
      user,
    } = metamaskContext;

    const {
      prices,
      loading: pricesLoading,
    } = pricesContext;

    const { currentView } = this.state;

    if (loading.assets || pricesLoading || loading.userAssetsInfo) {
      this.setState({loading: true});
      return;
    }

    const { ethereum } = prices;
    const ownedAssets = getAllUserAssets(assets, user.address);
    getPortfolioAssetDetails(ownedAssets, ethereum.price, (assets) => {
      this.setState({
        loading: false,
        prices: pricesContext.prices,
        assets,
        withdrawingAssetIds,
      })
    });
  }

  render = () => {
    console.count('portfolio module')
    return this.props.children(this.state);
  }
};


const enhance = compose(
  withMetamaskContext,
  withBlockchainContext,
  withTokenPricesContext,
);

export default enhance(PortfolioModule);
