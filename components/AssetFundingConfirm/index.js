import {
  Button,
} from 'antd';
import { withMetamaskContext } from 'components/MetamaskContext';
import { withKyberContext } from 'components/KyberContext';
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
  MAX_DECIMALS_ERC20,
  MAX_DECIMALS_DEFAULT_TOKEN,
} from 'constants/numberFormatting';
import {
  getFooter,
} from './footer';
import {
  DEFAULT_TOKEN,
} from 'constants/app';
import {
  MYBIT_FOUNDATION_FEE,
} from 'constants/platformFees';

import {
  formatMonetaryValue,
  convertTokenAmount,
} from 'utils/helpers';
import AssetFundingButton from 'components/AssetFunding/assetFundingButton';
import BN from 'bignumber.js';
BN.config({ EXPONENTIAL_AT: 80 });

// represented in ETH (at 8 GWEI)
const AVG_GAS_FUND_TRANSACTION = 0.018767;

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
    selectedToken: DEFAULT_TOKEN,
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
      amount: amountContributed,
      supportedTokensInfo,
    } = this.props;

    const {
      user,
      extensionUrl,
    } = metamaskContext;

    const amountInBn = BN(amountContributed);
    const mybitPlatformFee = amountInBn.times(MYBIT_FOUNDATION_FEE).toNumber();
    let amountToPay = amountInBn.plus(mybitPlatformFee).toNumber();

    console.log("mybitPlatformFee: ", mybitPlatformFee)
    console.log("amountToPay: ", amountToPay)
    const metamaskErrors = metamaskContext.metamaskErrors();
    const footer = getFooter(metamaskErrors.error, extensionUrl, amountToPay, amountContributed, user.balances, this.props.fundAsset);
    const {
      buttonProps,
      messageProps,
    } = footer;
    const footerButton = (
      <AssetFundingButton
        size="large"
        type={buttonProps.error ? 'default' : 'primary'}
        onClick={buttonProps.onClick}
        disabled={buttonProps.error || (!acceptedTos && !buttonProps.href && buttonProps.text !== 'Connect MetaMask')}
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

    const amountInSelectedToken = selectedToken === DEFAULT_TOKEN ? amountContributed : convertTokenAmount(selectedToken, DEFAULT_TOKEN, supportedTokensInfo, amountContributed);
    const gasInDai = parseFloat(convertTokenAmount(DEFAULT_TOKEN, 'ETH', supportedTokensInfo, AVG_GAS_FUND_TRANSACTION).toFixed(2));
    const gasInSelectedToken = selectedToken === DEFAULT_TOKEN ? gasInDai : convertTokenAmount(selectedToken, 'ETH', supportedTokensInfo, AVG_GAS_FUND_TRANSACTION);
    const totalToPayInDai = amountToPay + gasInDai;
    const totalToPayInSelectedToken = selectedToken === DEFAULT_TOKEN ? totalToPayInDai : convertTokenAmount(selectedToken, DEFAULT_TOKEN, supportedTokensInfo, totalToPayInDai);
    const mybitPlatformFeeSelectedToken = selectedToken === DEFAULT_TOKEN ? mybitPlatformFee : convertTokenAmount(selectedToken, DEFAULT_TOKEN, supportedTokensInfo, mybitPlatformFee);
    const maxDecimalsErc20 = selectedToken === DEFAULT_TOKEN ? MAX_DECIMALS_DEFAULT_TOKEN : MAX_DECIMALS_ERC20;
    return (
      <React.Fragment>
        <AssetFundingTitle
          text={`You will own ${selectedOwnership}% of the asset`}
          onClick={this.props.cancel}
        />
        <Separator style={separatorStyleFullWidth}/>
        <AssetFundingConfirmListWrapper>
          <AssetFundingConfirmItem>
            <AssetFundingConfirmItemName>
              Contribution
            </AssetFundingConfirmItemName>
            <AssetFundingConfirmItemValue>
              <p>{formatMonetaryValue(amountContributed)}</p>
              <p>{!selectedToken ? <span>loading</span> : formatMonetaryValue(amountInSelectedToken, maxDecimalsErc20, true, selectedToken)}</p>
            </AssetFundingConfirmItemValue>
          </AssetFundingConfirmItem>
          <Separator style={separatorStyle}/>
          <AssetFundingConfirmItem>
            <AssetFundingConfirmItemName>
              MyBit Foundation Fee ({MYBIT_FOUNDATION_FEE * 100}%)
            </AssetFundingConfirmItemName>
            <AssetFundingConfirmItemValue>
              <p>{formatMonetaryValue(mybitPlatformFee)}</p>
              <p>{!selectedToken ? <span>loading</span> : formatMonetaryValue(mybitPlatformFeeSelectedToken, maxDecimalsErc20, true, selectedToken)}</p>
            </AssetFundingConfirmItemValue>
          </AssetFundingConfirmItem>
          <Separator style={separatorStyle}/>
          <AssetFundingConfirmItem>
            <AssetFundingConfirmItemName>
              Gas Fee
            </AssetFundingConfirmItemName>
            <AssetFundingConfirmItemValue>
              <p>~{formatMonetaryValue(gasInDai)}</p>
              <p>~{!selectedToken ? <span>loading</span> : formatMonetaryValue(gasInSelectedToken, maxDecimalsErc20, true, selectedToken)}</p>
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
              <p>{formatMonetaryValue(totalToPayInDai)}</p>
              <p>{!selectedToken ? <span>loading</span> : formatMonetaryValue(totalToPayInSelectedToken, maxDecimalsErc20, true, selectedToken)}</p>
            </AssetFundingConfirmItemValue>
          </div>
          <AssetFundingConfirmDropdownButton>
            <AssetFundingConfirmPayWith>
              Pay with
            </AssetFundingConfirmPayWith>
            <TokenSelector
              balances={user.balances}
              amountToPay={amountToPay}
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

export default withKyberContext(withMetamaskContext(AssetFundingConfirm));
