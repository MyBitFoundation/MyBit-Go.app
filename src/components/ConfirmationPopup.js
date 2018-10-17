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
import {
  ethereumNetwork,
  metamaskErrors,
} from '../constants/index';

class ConfirmationPopup extends React.Component {
  setAcceptedTos(value) {
    const { assertsNotification, setAssertsStatusState } = this.props;

    setAssertsStatusState({
      ...assertsNotification,
      acceptedTos: value,
    });

    if (value === true && this.props.assertsNotification.alertType) {
      setAssertsStatusState({
        ...assertsNotification,
        alertType: undefined,
        alertMessage: undefined,
      });
    }
  }

  handleCancel() {
    this.props.handlePopupState(false);
  }

  tryAgain() {
    this.props.setAssertsStatusState({
      transactionStatus: '',
    });
  }

  handleConfirmClicked() {
    const { assertsNotification, setAssertsStatusState } = this.props;

    if (!assertsNotification.acceptedTos) {
      setAssertsStatusState({
        alertType: 'error',
        alertMessage: 'Please accept our T&C before continuing.',
      });
      return null;
    }

    this.props.fundAsset(
      this.props.assetId,
      this.props.amountEth,

    );
    return null;
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
      isLoading, transactionStatus, acceptedTos, alertType, alertMessage,
    } = this.props.assertsNotification;


    const shouldShowConfirmAndCancel =
      (((!isLoading && transactionStatus === '') || (transactionStatus === 1)) && userHasMetamask && userIsLoggedIn && network === ethereumNetwork);

    const metamaskErrorsToRender = metamaskErrors('', userHasMetamask, extensionUrl, isBraveBrowser, userIsLoggedIn, network);

    return (
      <Modal
        visible={this.props.isPopupOpen()}
        title="Confirm with MetaMask"
        onOk={() => this.handleConfirmClicked()}
        onCancel={() => this.props.handlePopupState(false)}
        okText={transactionStatus === 0 ? 'Try again' : transactionStatus === 1 ? 'Send again' : 'Confirm'}
        cancelText="Back"
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
              handleAlertClosed={() => this.props.setAssertsStatusState({
                ...this.props.assertsNotification,
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

ConfirmationPopup.defaultProps = {
  assertsNotification: {
    alertType: '',
    alertMessage: '',
  },
};

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
  setAssertsStatusState: PropTypes.func.isRequired,
  assertsNotification: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    transactionStatus: PropTypes.string,
    acceptedTos: PropTypes.bool.isRequired,
    alertType: PropTypes.string,
    alertMessage: PropTypes.string,
  }),
};

export default ConfirmationPopup;
