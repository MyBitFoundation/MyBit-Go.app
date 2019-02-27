/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import AlertMessage from 'ui/AlertMessage';
import {
  Checkbox,
  Modal,
} from 'antd';
import StyledContributionPopup from './styledContributionPopup';
import StyledContributionPopupDescription from './styledContributionPopupDescription';
import StyledContributionPopupAmount from './styledContributionPopupAmount';
import StyledContributionPopupToS from './styledContributionPopupToS';
import StyledContributionPopupTosText from './styledContributionPopupTosText';
import StyledContributionPopupAlertWrapper from './styledContributionPopupAlertWrapper';
import StyledContributionPopupEthAmount from './styledContributionPopupEthAmount';
import { withMetamaskContext } from 'components/MetamaskChecker';

class ContributionPopup extends React.Component {
  state = {
    acceptedTos: false,
    alertType: undefined,
    alertMessage: undefined,
    transactionStatus: '',
    isLoading: false,
  }

  componentDidMount(){
    this.ismounted = true;
  }

  componentWillUnmount() {
     this.ismounted = false;
  }

  componentDidUpdate = (prevProps) => {
    const {
      privacyModeEnabled: oldPrivacyModeEnabled,
    } = prevProps;

    const {
      privacyModeEnabled: newPrivacyModeEnabled,
    } = this.props;

    if(oldPrivacyModeEnabled === undefined && newPrivacyModeEnabled !== undefined){
      this.setState({
        alertType: undefined,
        alertMessage: undefined,
      })
    }
  }

  setAcceptedTos = (value) => {
    const {
      alertType
    } = this.state;
    if (value === true && alertType) {
      this.setState({
        alertType: undefined,
        alertMessage: undefined,
      });
    }
    this.setState({
      acceptedTos: value,
    })
  }

  handleCancel = () => {
    this.props.handlePopupState(false);
  }

  onSuccess = () => {
    if(!this.ismounted){
      return;
    }
    this.setState({
      transactionStatus: 1,
      isLoading: false,
    })
  }

  onFailure = () => {
    if(!this.ismounted){
      return;
    }
    this.setState({
      transactionStatus: 0,
      isLoading: false,
    });
  }

  handleConfirmClicked = (transactionStatus) => {
    const {
      metamaskContext,
    } = this.props;

    const {
      userHasMetamask,
      network,
      userIsLoggedIn,
      extensionUrl,
      privacyModeEnabled,
    } = metamaskContext;

    if (transactionStatus === 1) {
      return this.handleCancel();
    }

    if (!this.state.acceptedTos) {
      this.setState({
        alertType: 'error',
        alertMessage: 'Please accept the Terms and Conditions before continuing.',
      });
      return null;
    }

    const metamaskErrorsToRender = false || metamaskContext.metamaskErrors('');

    if(metamaskErrorsToRender){
      this.setState({
        alertType: 'error',
        alertMessage: metamaskErrorsToRender.render,
      });
      return null;
    }

    this.setState({
      isLoading: true,
    })

    this.props.fundAsset(
      this.props.assetId,
      this.props.amountEth,
      this.onSuccess,
      this.onFailure,
      this.props.amountUsd
    );

    this.props.handlePopupState(false);

    return null;
  }

  getOkText = () => {
    const {
      loadingUserInfo
    } = this.props;

    if(loadingUserInfo){
      return 'Please wait';
    }
    const {
      isLoading,
      transactionStatus,
    } = this.state;

    if(isLoading){
      return 'Confirming';
    }

    switch (transactionStatus) {
      case 0:
        return 'Try again';
      case 1:
        return 'Close';
      default:
        return 'Confirm';
    }
  }

  render() {
    const {
      userHasMetamask,
      network,
      userIsLoggedIn,
      loadingUserInfo,
    } = this.props;

    const {
      acceptedTos,
      transactionStatus,
      isLoading,
      alertType,
      alertMessage,
    } = this.state;

    const shouldShowConfirmAndCancel =
      (!isLoading && transactionStatus === '') || (transactionStatus === 1);

    return (
      <StyledContributionPopup
        transactionStatus={transactionStatus}
      >
        <Modal
          visible={this.props.isPopupOpen()}
          title="Confirm with MetaMask"
          onOk={() => this.handleConfirmClicked(transactionStatus)}
          onCancel={() => this.props.handlePopupState(false)}
          okText={this.getOkText()}
          cancelText={transactionStatus === 1 ? null : 'Back'}
          confirmLoading={isLoading || loadingUserInfo}
          okButtonProps={{ disabled: !shouldShowConfirmAndCancel }}
        >
          <React.Fragment>
            <StyledContributionPopupDescription>
              Your contribution:{' '}
              <StyledContributionPopupAmount hasMobileFix>
                {this.props.amountUsd}
                <StyledContributionPopupEthAmount hasMobileFix>
                  {this.props.amountEth} ETH
                </StyledContributionPopupEthAmount>
              </StyledContributionPopupAmount>
            </StyledContributionPopupDescription>
            <StyledContributionPopupDescription hasMobileFix>
              Ownership:{' '}
              <StyledContributionPopupAmount>
                {this.props.ownership}%
              </StyledContributionPopupAmount>
            </StyledContributionPopupDescription>
            <StyledContributionPopupDescription
              paddedTop
            >
              Total asset costs:{' '}
              <StyledContributionPopupAmount>
                {this.props.amountUsd}
              </StyledContributionPopupAmount>
            </StyledContributionPopupDescription>
            <StyledContributionPopupToS>
              <Checkbox
                onChange={e => this.setAcceptedTos(e.target.checked)}
                checked={acceptedTos}
                disabled={isLoading}
              />
              <StyledContributionPopupTosText>
                I've read and agree to the {' '}
                <a
                  href="https://docs.google.com/document/d/1LUArMnGpnvpe5fI4-QI_lvkJTb5Xf6me0XU1zznCqmk/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions
                </a>
                .
              </StyledContributionPopupTosText>
            </StyledContributionPopupToS>
          </React.Fragment>
          {alertType && (
            <StyledContributionPopupAlertWrapper>
              <AlertMessage
                type={alertType}
                message={alertMessage}
                handleAlertClosed={() => this.setState({
                  alertType: undefined,
                })}
                showIcon
                closable
              />
            </StyledContributionPopupAlertWrapper>
          )}
        </Modal>
      </StyledContributionPopup>
    );
  }
}

ContributionPopup.propTypes = {
  amountUsd: PropTypes.string.isRequired,
  amountEth: PropTypes.string.isRequired,
  ownership: PropTypes.string.isRequired,
  handlePopupState: PropTypes.func.isRequired,
  fundAsset: PropTypes.func.isRequired,
  assetId: PropTypes.string.isRequired,
  isPopupOpen: PropTypes.func.isRequired,
  userHasMetamask: PropTypes.bool.isRequired,
  extensionUrl: PropTypes.string.isRequired,
  network: PropTypes.string.isRequired,
  userIsLoggedIn: PropTypes.bool.isRequired,
  isBraveBrowser: PropTypes.bool.isRequired,
};

export default withMetamaskContext(ContributionPopup);
