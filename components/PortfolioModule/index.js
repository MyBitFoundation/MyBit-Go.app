import React from 'react';
import { compose } from 'recompose';
import Loading from 'components/Loading';
import { withBlockchainContext } from 'components/BlockchainContext'
import { withMetamaskContext } from 'components/MetamaskContext'

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
    } = props;

    const {
      loading,
      assets,
      withdrawingAssetIds,
      payoutAsset,
      callingPayout,
    } = blockchainContext;

    const {
      user,
    } = metamaskContext;

    const { currentView } = this.state;

    if (loading.assets || loading.userAssetsInfo) {
      this.setState({loading: true});
      return;
    }

    const ownedAssets = getAllUserAssets(assets, user.address);
    getPortfolioAssetDetails(ownedAssets, portfolioData => {
      this.setState({
        loading: false,
        portfolioData,
        withdrawingAssetIds,
        payoutAsset,
        callingPayout,
      })
    });
  }

  render = () => this.props.children(this.state)
}

const enhance = compose(
  withMetamaskContext,
  withBlockchainContext,
);

export default enhance(PortfolioModule);
