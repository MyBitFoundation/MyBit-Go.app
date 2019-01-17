/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';
import Checkbox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style';
import '../styles/ConfirmationPopup.css';
import AlertMessage from './AlertMessage';
import MetamaskErrors from './MetamaskErrors';
import {
  CORRECT_NETWORK,
} from '../constants';

class ConfirmationPopup extends React.Component {
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

  handleCancel() {
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
      extensionUrl,
      isBraveBrowser,
    } = this.props;

    const {
      acceptedTos,
      transactionStatus,
      isLoading,
      alertType,
      alertMessage,
    } = this.state;


    const shouldShowConfirmAndCancel =
      (((!isLoading && transactionStatus === '') || (transactionStatus === 1)) && userHasMetamask && userIsLoggedIn && network === CORRECT_NETWORK);

    const metamaskErrorsToRender = (
      <MetamaskErrors
        className=""
        userHasMetamask
        extensionUrl={extensionUrl}
        isBraveBrowser
        userIsLoggedIn
        network={network}
      />
    )

    return (
      <Modal
        className={transactionStatus === 1 ? 'ConfirmationPopup--is-success' : ''}
        visible={this.props.isPopupOpen()}
        title="Confirm with MetaMask"
        onOk={() => this.handleConfirmClicked(transactionStatus)}
        onCancel={() => this.props.handlePopupState(false)}
        okText={this.getOkText()}
        cancelText={transactionStatus === 1 ? null : 'Back'}
        confirmLoading={isLoading}
        okButtonProps={{ disabled: !shouldShowConfirmAndCancel }}
      >
        <div>
          {metamaskErrorsToRender && (
            <AlertMessage
              className="ConfirmationPopup__metamask-alert"
              type="error"
              message={metamaskErrorsToRender}
              showIcon
              closable={false}
            />
          )}
          <p className="ConfirmationPopup__description">
            Your contribution:{' '}
            <span style={{ fontWeight: '400' }} className="ConfirmationPopup__description-amount">
              {this.props.amountUsd}
              <span style={{ marginLeft: '10px', fontWeight: '500' }}>
                {this.props.amountEth} ETH
              </span>
            </span>
          </p>
          <p className="ConfirmationPopup__description">
            Ownership:{' '}
            <span className="ConfirmationPopup__description-amount">
              {this.props.ownership}%
            </span>
          </p>
          <p className="ConfirmationPopup__description ConfirmationPopup__description-cost">
            Total asset costs:{' '}
            <span className="ConfirmationPopup__description-amount">
              {this.props.amountUsd}
            </span>
          </p>
          <div className="ConfirmationPopup__tos-wrapper">
            <Checkbox
              onChange={e => this.setAcceptedTos(e.target.checked)}
              checked={acceptedTos}
              disabled={isLoading}
            />
            <p className="ConfirmationPopup__tos-text">
              I've read and agree to the {' '}
              <a
                href="https://docs.google.com/document/d/1LUArMnGpnvpe5fI4-QI_lvkJTb5Xf6me0XU1zznCqmk/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions
              </a>
              .
            </p>
          </div>
        </div>
        {alertType && (
          <div className="ConfirmationPopup__alert-wrapper">
            <AlertMessage
              type={alertType}
              message={alertMessage}
              handleAlertClosed={() => this.setState({
                alertType: undefined,
              })}
              showIcon
              closable
            />
          </div>
        )}
      </Modal>
    );
  }
}

ConfirmationPopup.propTypes = {
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

export default ConfirmationPopup;
