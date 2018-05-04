import React from 'react';
import { ToggleSmall, Button } from 'carbon-components-react';
import '../styles/ConfirmationPopup.css';

export const ConfirmationPopup = ({
  amountUsd,
  amountEth,
  ownership,
  setAcceptedTos,
  displayWarning,
  getAcceptedTos
}) => {
  return (
    <div className="ConfirmationPopup">
      <p className="ConfirmationPopup__title">Confirm Purchase</p>
      <div className="ConfirmationPopup__wrapper">
        <p className="ConfirmationPopup__description">
          Your Contribution:{' '}
          <span className="ConfirmationPopup__description-amount">
            ${amountUsd}
          </span>
        </p>
        <p className="ConfirmationPopup__description">
          Ownership:{' '}
          <span className="ConfirmationPopup__description-amount">
            {ownership}%
          </span>
        </p>
        <p
          className="ConfirmationPopup__description"
          style={{ lineHeight: '1', paddingTop: '15px' }}
        >
          Expected annual return:{' '}
          <span className="ConfirmationPopup__description-amount">18%</span>
        </p>
        <p className="ConfirmationPopup__description-amount-right">$18,000</p>
        <p className="ConfirmationPopup__description-amount-right">
          {amountEth} <b>ETH</b>
        </p>
        <div className="ConfirmationPopup__line" />
        <p className="ConfirmationPopup__description ConfirmationPopup__description-cost">
          Total asset cost:{' '}
          <span className="ConfirmationPopup__description-amount">
            ${amountUsd}
          </span>
        </p>
        <p className="ConfirmationPopup__description-amount-right">
          {amountEth} <b>ETH</b>
        </p>
        <div className="ConfirmationPopup__tos-wrapper">
          <ToggleSmall
            onToggle={value => setAcceptedTos(value)}
            className="ConfirmationPopup__tos-toggle"
            ariaLabel="Terms and conditions"
            id="ConfirmationPopup__tos-toggle"
            toggled={getAcceptedTos()}
          />
          <p className="ConfirmationPopup__tos-text">
            I read and agree to the <a href="">terms and conditions</a>
          </p>
        </div>
        <p
          className="ConfirmationPopup__tos-message-error"
          style={{ visibility: displayWarning ? 'visible' : 'hidden' }}
        >
          *Please accept our T&C before continuing
        </p>
      </div>
    </div>
  );
};
