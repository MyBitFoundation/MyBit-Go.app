import React from 'react';
import {
  Button,
} from 'antd';
import Loading from 'components/Loading';
import { withBlockchainContext } from 'components/Blockchain'
import PieChart from 'static/chart-pie.svg';
import LineChart from 'static/chart-line.svg';
import Sliders from 'static/sliders.svg';
import {
  formatMonetaryValue,
  fromWeiToEth,
} from 'utils/helpers';
import ValueDisplay from 'ui/ValueDisplay';

class ManageAssetPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      blockchainContext,
    } = this.props;

    const {
      loading,
      assets,
      prices,
      withdrawInvestorProfit,
      withdrawingAssetIds,
      user,
    } = blockchainContext;

    if (loading.assets || !prices.ether) {
      return (
        <Loading
          message="Loading asset information"
          hasBackButton
        />
      );
    }

    return (
      <div>
        <p>Manage Pagesssssasdasdadqaqa</p>
      </div>
    );
  }
};

export default withBlockchainContext(ManageAssetPage);
