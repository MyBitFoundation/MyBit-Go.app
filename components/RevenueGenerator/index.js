import {
  Icon,
} from 'antd';
import { withMetamaskContext } from 'components/MetamaskContext';
import InputRevenueGenerator from './inputRevenueGenerator';
import { withBlockchainContext } from 'components/BlockchainContext';

class RevenueGenerator extends React.PureComponent {
  state = {
    inputActive: false,
    currentValue: 0,
  }

  handleInputTriggered = () => this.setState({inputActive: true});

  handleValueChanged = currentValue => this.setState({currentValue})

  handleConfirm = () => {
    const {
      metamaskContext,
      blockchainContext,
    } = this.props;
    const {
      user,
      isReadOnlyMode,
    } = metamaskContext;

    if(user.address && !isReadOnlyMode){
      blockchainContext.issueDividends(this.state.currentValue, this.props.assetId)
      this.handleCancel();
    }
  }

  handleCancel = () => this.setState({inputActive: false, currentValue: 0})

  render = () => {
    const {
      currentValue,
      inputActive,
    } = this.state;

    const {
      metamaskContext,
      managerPercentage,
    } = this.props;

    if(metamaskContext.isReadOnlyMode !== false){
      return null;
    }

    return (
      <div>
        <div onClick={this.handleInputTriggered}>
          {this.props.children}
        </div>
        {inputActive && (
          <InputRevenueGenerator
            currentValue={currentValue}
            onValueChange={this.handleValueChanged}
            onConfirm={this.handleConfirm}
            onCancel={this.handleCancel}
            managerPercentage={managerPercentage * 100}
          />
        )}
      </div>
    )
  }
}

export default withBlockchainContext(withMetamaskContext(RevenueGenerator));
