import React from 'react';
import { compose } from 'recompose';
import Loading from 'components/Loading';
import { withBlockchainContext } from 'components/BlockchainContext'
import { withAssetsContext } from 'components/AssetsContext'
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
      assetsContext,
      blockchainContext,
      metamaskContext,
    } = props;
    const {
      withdrawingAssetIds,
      payoutAsset,
      callingPayout,
    } = blockchainContext;
    const {
      loadingAssets,
      assets,
      loadingUserInfo,
    } = assetsContext;
    const { user } = metamaskContext;
    const { currentView } = this.state;

    if (loadingAssets || loadingUserInfo) {
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
  withAssetsContext,
);

export default enhance(PortfolioModule);
