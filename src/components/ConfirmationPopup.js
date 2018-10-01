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

  render() {
    const shouldShowConfirmAndCancel =
      (!this.state.isLoading && this.state.transactionStatus === '') || (this.state.transactionStatus !== '');

    return (
      <Modal
        visible={this.props.isPopupOpen()}
        title="Confirm with MetaMask"
        onOk={() => this.handleConfirmClicked()}
        onCancel={() => shouldShowConfirmAndCancel && this.props.handlePopupState(false)}
        okText={this.state.transactionStatus === 0 ? 'Try again' : this.state.transactionStatus === 1 ? 'Send again' : 'Confirm'}
        cancelText="Back"
        okButtonProps={{ disabled: !shouldShowConfirmAndCancel }}
        cancelButtonProps={{ disabled: !shouldShowConfirmAndCancel }}
      >
        <div>
          <p className="ConfirmationPopup__description">
            Your contribution:{' '}
            <span style={{ fontWeight: '400' }} className="ConfirmationPopup__description-amount">
              ${this.props.amountUsd.toLocaleString()}
              <span style={{ marginLeft: '10px', fontWeight: '500' }}>
                {this.props.amountEth.toLocaleString()} ETH
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
              ${this.props.amountUsd.toLocaleString()}
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
};

export default ConfirmationPopup;
