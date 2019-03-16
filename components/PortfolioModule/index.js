import React from 'react';
import { compose } from 'recompose';
import Loading from 'components/Loading';
import { withBlockchainContext } from 'components/Blockchain'
import { withMetamaskContext } from 'components/MetamaskChecker'

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
    getPortfolioAssetDetails(ownedAssets, (assets) => {
      this.setState({
        loading: false,
        assets,
        withdrawingAssetIds,
        payoutAsset,
        callingPayout,
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
);

export default enhance(PortfolioModule);
