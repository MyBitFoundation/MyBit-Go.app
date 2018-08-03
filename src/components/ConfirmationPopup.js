import React from 'react';
import PropTypes from 'prop-types';
import { ToggleSmall, Modal, Button, Loading } from 'carbon-components-react';
import '../styles/ConfirmationPopup.css';

class ConfirmationPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      transactionStatus: '',
      acceptedTos: false,
      displayWarning: false,
    };
  }

  setAcceptedTos(value) {
    this.setState({ acceptedTos: value });
    if (value === true && this.state.displayWarning) {
      this.setState({ displayWarning: false });
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
      this.setState({ displayWarning: true });
      return;
    }
    this.setState({ isLoading: true, transactionStatus: '' });
    try {
      const result = await this.props.fundAsset(this.props.assetId, this.props.amountEth);
      if (result) {
        this.setState({ isLoading: false, transactionStatus: 1 });
      } else {
        this.setState({ isLoading: false, transactionStatus: 0 });
      }
    } catch (err) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const shouldShowConfirmAndCancel = !this.state.isLoading && this.state.transactionStatus === '';
    return (
      <Modal open={this.props.isPopupOpen()} passiveModal>
        <div className="ConfirmationPopup">
          <p className="ConfirmationPopup__title">Confirm Purchase</p>
          <div className="ConfirmationPopup__wrapper">
            <p className="ConfirmationPopup__description">
              Your Contribution:{' '}
              <span className="ConfirmationPopup__description-amount">
                ${this.props.amountUsd}
              </span>
            </p>
            <p className="ConfirmationPopup__description">
              Ownership:{' '}
              <span className="ConfirmationPopup__description-amount">
                {this.props.ownership}%
              </span>
            </p>
            <p
              className="ConfirmationPopup__description"
              style={{ lineHeight: '1', paddingTop: '15px' }}
            >
              Expected annual return:{' '}
              <span className="ConfirmationPopup__description-amount ConfirmationPopup__description-amount--is-inactive">18%</span>
            </p>
            <p className="ConfirmationPopup__description-amount-right ConfirmationPopup__description-amount-right--is-inactive">$18,000</p>
            <p className="ConfirmationPopup__description-amount-right">
              {this.props.amountEth} <b>ETH</b>
            </p>
            <div className="ConfirmationPopup__line" />
            <p className="ConfirmationPopup__description ConfirmationPopup__description-cost">
              Total asset cost:{' '}
              <span className="ConfirmationPopup__description-amount">
                ${this.props.amountUsd}
              </span>
            </p>
            <p className="ConfirmationPopup__description-amount-right">
              {this.props.amountEth} <b>ETH</b>
            </p>
            <div className="ConfirmationPopup__tos-wrapper">
              <ToggleSmall
                onToggle={value => this.setAcceptedTos(value)}
                className="ConfirmationPopup__tos-toggle"
                ariaLabel="Terms and conditions"
                id="ConfirmationPopup__tos-toggle"
                toggled={this.state.acceptedTos}
                disabled={this.state.isLoading}
              />
              <p className="ConfirmationPopup__tos-text">
                I read and agree to the <a href="https://mybit.io">terms and conditions</a>
              </p>
            </div>
            <p
              className="ConfirmationPopup__tos-message-error"
              style={{ visibility: this.state.displayWarning ? 'visible' : 'hidden' }}
            >
              *Please accept our T&C before continuing
            </p>
            {shouldShowConfirmAndCancel &&
              <div>
                <Button onClick={() => this.handleConfirmClicked()}className="ConfirmationPopup__confirm-btn" kind="primary">
                    CONFIRM
                </Button>
                <Button onClick={() => this.props.handlePopupState(false)} className="ConfirmationPopup__cancel-btn" kind="secondary">
                    CANCEL
                </Button>
              </div>
            }
            {this.state.isLoading &&
            <div>
              <Loading
                small
                withOverlay={false}
                style={{ margin: '0 auto' }}
              />
              <p style={{ textAlign: 'center' }}>Accept the transaction in metamask and wait for a brief moment.</p>
            </div>
          }
            {this.state.transactionStatus === 1 &&
            <div>
              <p className="ConfirmationPopup__status-text">Sent successfuly!</p>
              <Button onClick={() => this.props.handlePopupState(false)} className="ConfirmationPopup__cancel-btn" kind="secondary">
                  GO BACK
              </Button>
            </div>
          }
            {this.state.transactionStatus === 0 &&
            <div>
              <p className="ConfirmationPopup__status-text" style={{ color: 'red' }}>Transaction failed.</p>
              <Button onClick={() => this.tryAgain()} className="ConfirmationPopup__cancel-btn" kind="secondary">
                  TRY AGAIN
              </Button>
            </div>
          }
          </div>
        </div>
      </Modal>
    );
  }
}

ConfirmationPopup.propTypes = {
  amountUsd: PropTypes.number.isRequired,
  amountEth: PropTypes.number.isRequired,
  ownership: PropTypes.number.isRequired,
  handlePopupState: PropTypes.func.isRequired,
  fundAsset: PropTypes.func.isRequired,
  assetId: PropTypes.string.isRequired,
  isPopupOpen: PropTypes.func.isRequired,
};


export default ConfirmationPopup;
