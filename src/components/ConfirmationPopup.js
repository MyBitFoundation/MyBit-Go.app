/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';
import Checkbox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style';
import '../styles/ConfirmationPopup.css';
import AlertMessage from './AlertMessage';
import { ethereumNetwork } from '../constants/index';

class ConfirmationPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      transactionStatus: '',
      acceptedTos: false,
      alertType: '',
      alertMessage: '',
    };
  }

  setAcceptedTos(value) {
    this.setState({ acceptedTos: value });
    if (value === true && this.state.alertType) {
      this.setState({
        alertType: undefined,
        alertMessage: undefined,
      });
    }
  }

  handleCancel() {
    this.props.handlePopupState(false);
  }

  tryAgain() {
    this.setState({ transactionStatus: '' });
  }

  async handleConfirmClicked() {
    if (!this.state.acceptedTos) {
      this.setState({
        alertType: 'error',
        alertMessage: 'Please accept our T&C before continuing.',
      });
      return;
    }
    this.setState({
      isLoading: true,
      transactionStatus: '',
      alertType: 'info',
      alertMessage: 'Accept the transaction in metamask and wait for a brief moment.',
    });
    try {
      const result = await this.props.fundAsset(
        this.props.assetId,
        this.props.amountEth,
      );
      if (result) {
        this.setState({
          isLoading: false,
          transactionStatus: 1,
          alertType: 'success',
          alertMessage: 'Sent Successfuly!',
        });
      } else {
        this.setState({
          isLoading: false,
          transactionStatus: 0,
          alertType: 'error',
          alertMessage: 'Transaction failed. Please try again.',
        });
      }
    } catch (err) {
      this.setState({ isLoading: false });
    }
  }

  renderMetamaskErrors() {
    let toRender;
    const {
      userHasMetamask, extensionUrl, network, userIsLoggedIn, isBraveBrowser,
    } = this.props;

    if (!userHasMetamask && extensionUrl) {
      toRender = (
        <p>Please connect via <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">Metamask</a> to confirm contribution.
          You can download the extension via
          <a href={this.props.extensionUrl} target="_blank" rel="noopener noreferrer"> this </a>link.
        </p>
      );
    } else if (!userHasMetamask && !extensionUrl && !isBraveBrowser) {
      toRender = (
        <div>
          <span>Your browser is not supported. Metamask supports the following browsers:
            <a
              href="https://www.google.com/chrome/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Chrome
            </a>,
            <a
              href="https://www.mozilla.org/en-US/firefox/new/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Firefox
            </a>,
            <a
              href="https://www.opera.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Opera
            </a>{' '}
            or
            <a
              href="https://brave.com/download/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Brave
            </a>
          </span>
        </div>
      );
    } else if (!userHasMetamask && isBraveBrowser) {
      toRender = (
        <p>
          The Brave browser comes pre-installed with Metamask, please enable it to contribute. Click
          <a
            href="https://brave.com/into-the-blockchain-brave-with-metamask/"
            target="_blank"
            rel="noopener noreferrer"
          >
           here
          </a>
          to see how.
        </p>
      );
    } else if (userHasMetamask && !userIsLoggedIn) {
      toRender = (
        <p>Please login in Metamask to be able to contribute.</p>
      );
    } else if (network !== ethereumNetwork) {
      toRender = (
        <p>
          The main Ethereum network is not supported yet,
          please change to the Ropsten network to contribute.
        </p>
      );
    }

    return toRender && (
      <AlertMessage
        className="ConfirmationPopup__metamask-alert"
        type="error"
        message={toRender}
        showIcon
        closable={false}
      />
    );
  }

  render() {
    const { userHasMetamask, network, userIsLoggedIn } = this.props;

    const shouldShowConfirmAndCancel =
      (!this.state.isLoading && this.state.transactionStatus === '' && userHasMetamask && userIsLoggedIn && network === ethereumNetwork);

    return (
      <Modal
        visible={this.props.isPopupOpen()}
        title="Confirm with MetaMask"
        onOk={() => this.handleConfirmClicked()}
        onCancel={() => this.props.handlePopupState(false)}
        okText={this.state.transactionStatus === 0 ? 'Try again' : this.state.transactionStatus === 1 ? 'Send again' : 'Confirm'}
        cancelText="Back"
        okButtonProps={{ disabled: !shouldShowConfirmAndCancel }}
      >
        <div>
          {this.renderMetamaskErrors()}
          <p className="ConfirmationPopup__description">
            Your contribution:{' '}
            <span style={{ fontWeight: '400' }} className="ConfirmationPopup__description-amount">
              ${this.props.amountUsd}
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
              ${this.props.amountUsd}
            </span>
          </p>
          <div className="ConfirmationPopup__tos-wrapper">
            <Checkbox
              onChange={e => this.setAcceptedTos(e.target.checked)}
              checked={this.state.acceptedTos}
              disabled={this.state.isLoading}
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
        {this.state.alertType && (
          <div className="ConfirmationPopup__alert-wrapper">
            <AlertMessage
              type={this.state.alertType}
              message={this.state.alertMessage}
              handleAlertClosed={() => this.setState({ alertType: undefined })}
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
  amountUsd: PropTypes.number.isRequired,
  amountEth: PropTypes.number.isRequired,
  ownership: PropTypes.string.isRequired,
  handlePopupState: PropTypes.func.isRequired,
  fundAsset: PropTypes.func.isRequired,
  assetId: PropTypes.string.isRequired,
  isPopupOpen: PropTypes.func.isRequired,
  userHasMetamask: PropTypes.func.isRequired,
  extensionUrl: PropTypes.string.isRequired,
  network: PropTypes.string.isRequired,
  userIsLoggedIn: PropTypes.bool.isRequired,
  isBraveBrowser: PropTypes.bool.isRequired,
};

export default ConfirmationPopup;
