import {
  Icon,
} from 'antd';
import RevenueGeneratorWrapper from './revenueGeneratorWrapper';
import * as Brain from '../../apis/brain';
import { withMetamaskContext } from 'components/MetamaskContext';
import InputRevenueGenerator from './inputRevenueGenerator';
import {
  toWei,
} from 'utils/helpers';

class RevenueGenerator extends React.PureComponent {
  state = {
    inputActive: false,
    currentValue: 0,
  }

  handleInputTriggered = (e) => {
    this.setState({inputActive: true}, () => console.log(this.state));
  }

  handleValueChanged = currentValue => this.setState({currentValue})

  handleConfirm = () => {
    const {
      metamaskContext,
    } = this.props;
    const {
      user,
      isReadOnlyMode,
    } = metamaskContext;

    if(user.address && !isReadOnlyMode){
      Brain.issueDividends(toWei(this.state.currentValue), user.address, this.props.assetId)
      this.handleCancel();
    }
  }

  handleCancel = () => this.setState({inputActive: false})

  render = () => {
    const {
      currentValue,
      inputActive,
    } = this.state;

    const {
      metamaskContext,
    } = this.props;

    if(metamaskContext.isReadOnlyMode !== false){
      return null;
    }

    return (
      <div>
        <RevenueGeneratorWrapper onClick={this.handleInputTriggered}>
          <Icon type="gift" />
        </RevenueGeneratorWrapper>
        {inputActive && (
          <InputRevenueGenerator
            currentValue={currentValue}
            onValueChange={this.handleValueChanged}
            onConfirm={this.handleConfirm}
            onCancel={this.handleCancel}
          />
        )}
      </div>
    )
  }
}

export default withMetamaskContext(RevenueGenerator);
