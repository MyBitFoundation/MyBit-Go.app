import {
  Button,
} from 'antd';
import { withMetamaskContext } from 'components/MetamaskChecker';
import Separator from 'ui/Separator';
import AssetFundingTitle from 'components/AssetFunding/assetFundingTitle';
import AssetFundingConfirmItem from './assetFundingConfirmItem';
import AssetFundingConfirmItemName from './assetFundingConfirmItemName';
import AssetFundingConfirmItemValue from './assetFundingConfirmItemValue';
import AssetFundingConfirmListWrapper from './assetFundingConfirmListWrapper';
import AssetFundingConfirmTotalLabel from './assetFundingConfirmTotalLabel';
import TokenSelector from 'components/TokenSelector';
import AssetFundingConfirmDropdownButton from './assetFundingConfirmDropdownButton';
import AssetFundingConfirmPayWith from './assetFundingConfirmPayWith';
import TermsAndConditions from 'ui/TermsAndConditions';
import AssetFundingFooter from './assetFundingFooter';
import {
  AssetFundingConfirmFooterMessage,
  AssetFundingConfirmFooterMessageUrl,
} from './assetFundingConfirmFooterMessage';

import {
  getFooter,
} from './footer';
import {
  DEFAULT_TOKEN,
} from 'constants';

import {
  formatMonetaryValue,
  convertTokenAmount,
} from 'utils/helpers';
import AssetFundingButton from 'components/AssetFunding/assetFundingButton';

const separatorStyleFullWidth = {
  position: 'absolute',
  left: '0px',
  marginTop: '10px',
}

const separatorStyle = {
  marginTop: '15px',
  marginBottom: '10px',
};

class AssetFundingConfirm extends React.Component {
  state = {
    acceptedTos: false,
  }

  setAcceptedTos = (e) => this.setState({acceptedTos: e.target.checked})

  handleTokenChange = selectedToken => this.setState({selectedToken});

  render(){
    const {
      acceptedTos,
      selectedToken,
    } = this.state;

    const {
      metamaskContext,
      selectedOwnership,
      amount,
    } = this.props;

    const {
      user,
      extensionUrl,
    } = metamaskContext;

    const metamaskErrors = metamaskContext.metamaskErrors();
    const footer = getFooter(metamaskErrors.error, extensionUrl, 900, user.balances, this.props.fundAsset);
    const {
      buttonProps,
      messageProps,
    } = footer;
    const footerButton = (
      <AssetFundingButton
        size="large"
        type={buttonProps.error ? 'default' : 'primary'}
        onClick={buttonProps.onClick}
        disabled={buttonProps.error || (!acceptedTos && !buttonProps.href)}
        href={buttonProps.href}
        target={buttonProps.href ? '_blank' : false}
      >
        {buttonProps.text}
      </AssetFundingButton>
    )

    let footerMessage = messageProps ?
      !messageProps.href ? (
        <AssetFundingConfirmFooterMessage>
          {messageProps.text}
        </AssetFundingConfirmFooterMessage>
      ) : (
        <AssetFundingConfirmFooterMessageUrl
          href={messageProps.href}
          target="_blank"
          rel="noreferrer"
        >
          {messageProps.text}
        </AssetFundingConfirmFooterMessageUrl>
      ) : null;

    return (
      <React.Fragment>
        <AssetFundingTitle>
          You will own {selectedOwnership}% of the asset
        </AssetFundingTitle>
        <Separator style={separatorStyleFullWidth}/>
        <AssetFundingConfirmListWrapper>
          <AssetFundingConfirmItem>
            <AssetFundingConfirmItemName>
              Contribution
            </AssetFundingConfirmItemName>
            <AssetFundingConfirmItemValue>
              <p>{formatMonetaryValue(amount)}</p>
              <p>{!selectedToken ? <span>loading</span> : formatMonetaryValue(convertTokenAmount(selectedToken, DEFAULT_TOKEN, user.balances, amount), 0, true, selectedToken)}</p>
            </AssetFundingConfirmItemValue>
          </AssetFundingConfirmItem>
          <Separator style={separatorStyle}/>
          <AssetFundingConfirmItem>
            <AssetFundingConfirmItemName>
              MyBit Foundation Fees
            </AssetFundingConfirmItemName>
            <AssetFundingConfirmItemValue>
              <p>120 DAI</p>
              <p>120 DAI</p>
            </AssetFundingConfirmItemValue>
          </AssetFundingConfirmItem>
          <Separator style={separatorStyle}/>
          <AssetFundingConfirmItem>
            <AssetFundingConfirmItemName>
              Gas Fee
            </AssetFundingConfirmItemName>
            <AssetFundingConfirmItemValue>
              <p>1 DAI</p>
              <p>1 DAI</p>
            </AssetFundingConfirmItemValue>
          </AssetFundingConfirmItem>
          <Separator style={separatorStyle}/>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <AssetFundingConfirmTotalLabel>
              Total to pay:
            </AssetFundingConfirmTotalLabel>
            <AssetFundingConfirmItemValue
              isLarge
            >
              <p>{formatMonetaryValue(amount)}</p>
              <p>5,500 DAI</p>
            </AssetFundingConfirmItemValue>
          </div>
          <AssetFundingConfirmDropdownButton>
            <AssetFundingConfirmPayWith>
              Pay with
            </AssetFundingConfirmPayWith>
            <TokenSelector
              balances={user.balances}
              amountToPay={900}
              onChange={this.handleTokenChange}
            />
          </AssetFundingConfirmDropdownButton>
          <Separator style={separatorStyleFullWidth}/>
          <AssetFundingFooter>
            <TermsAndConditions
              checked={acceptedTos}
              disabled={false}
              onChange={this.setAcceptedTos}
            />
            {footerButton}
            {footerMessage}
          </AssetFundingFooter>
        </AssetFundingConfirmListWrapper>
      </React.Fragment>
    )
  }
}

export default withMetamaskContext(AssetFundingConfirm);
