/* eslint-disable react/no-unused-state */
/* eslint-disable no-confusing-arrow */

import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Button } from 'antd';
import dayjs from 'dayjs';

import Row from 'antd/lib/row';
import 'antd/lib/row/style';
import Col from 'antd/lib/col';
import 'antd/lib/col/style';

import ConfirmationPopup from './ConfirmationPopup';
import Address from './Address';
import '../styles/AssetDetails.css';
import LocationIcon from '../images/Location-blue.svg';
import CalendarIcon from '../images/calendar.svg';
import BlockchainInfoContext from './BlockchainInfoContext';
import NumericInput from './NumericInput';

class AssetDetails extends React.Component {
  constructor(props) {
    super(props);
    const { goal, raised } = this.props.information;
    this.assetFunded = raised === goal;
    this.state = {
      selectedAmountUsd: null,
      selectedAmountEth: null,
      selectedOwnership: null,
      daysToGo: 0,
      timeToGo: '',
      endingAt: '',
      isPopupOpen: false,
    };
    this.setDateDetails = this.setDateDetails.bind(this);
    this.endDateLocal = this.props.information.dueDate;
    this.clearInterval = this.clearInterval.bind(this);
    this.getAcceptedTos = this.getAcceptedTos.bind(this);
    this.runningMinInterval = false;
    this.etherValueSelected = null;
  }

  componentDidMount() {
    this.setDateDetails();
  }

  setDateDetails() {
    const maxInvestment =
      this.props.information.goal - this.props.information.raised;

    // funding goal has been reached
    if (maxInvestment === 0 || this.assetFunded) {
      this.setState({
        timeToGo: 'Funding goal has been reached',
        daysToGo: 0,
        endingAt: 'Funding goal has been reached',
      });
      this.clearInterval();
      return;
    }
    // funding period has reached end date
    if (this.props.information.pastDate) {
      this.setState({
        daysToGo: -1,
        timeToGo: 'Funding period has ended',
        endingAt: `Funding period has ended on ${dayjs(this.endDateLocal).format('dddd, MMMM D')}`,
      });
      this.clearInterval();
      return;
    }
    const days = this.endDateLocal.diff(dayjs(), 'days');
    const seconds = this.endDateLocal.diff(dayjs(), 'seconds');
    const calculateRemainingTime = dayjs()
      .startOf('day')
      .add(seconds, 'seconds');

    // less than 1 day until funding period ends
    if (days === 0) {
      const secondsToEndDate = this.endDateLocal.diff(dayjs(), 'seconds');
      const aux = dayjs()
        .startOf('day')
        .add(86400, 'seconds');
      const secondsToMidnight = aux.diff(dayjs(), 'seconds');
      let day = 'today';
      if (secondsToEndDate > secondsToMidnight) day = 'tomorrow';

      this.setState({
        timeToGo: `Ending in ${calculateRemainingTime.hour()}h ${calculateRemainingTime.minute()}m ${calculateRemainingTime.second()}s`,
        daysToGo: 0,
        endingAt: `Funding period ends ${day} at ${dayjs(this.endDateLocal).format('H:mm:ss')}`,
      });

      if (!this.setDateInterval || this.runningMinInterval) {
        this.setDateInterval = setInterval(() => {
          this.setDateDetails();
        }, 1000);
        this.runningMinInterval = false;
      }
    } else {
      // 1 or more days until funding period ends
      const dayString = days === 1 ? 'day' : 'days';
      this.setState({
        timeToGo: `${days} ${dayString} and ${calculateRemainingTime.hour()} hours to go`,
        daysToGo: days,
        endingAt: `Funding period ends on ${dayjs(this.endDateLocal).format('dddd, MMMM D')}`,
      });
      if (!this.setDateInterval) {
        this.setDateInterval = setInterval(() => {
          this.setDateDetails();
        }, 60000);
        this.runningMinInterval = true;
      }
    }
  }

  getAcceptedTos() {
    return this.state.acceptedTos;
  }

  handlePopupState(value) {
    this.setState({ isPopupOpen: value });
    this.props.changeNotificationPlace(value ? 'confirmation' : 'notification');
    if (value) {
      this.props.setAssertsStatusState(null);
      return null;
    }
    this.props.setAssertsStatusState({
      alertType: undefined,
      alertMessage: undefined,
    });
    return null;
  }

  isPopupOpen() {
    return this.state.isPopupOpen;
  }

  clearInterval() {
    if (this.setDateInterval) {
      clearInterval(this.setDateInterval);
    }
  }

  componenWillUnmount() {
    this.clearInterval();
  }

  render() {
    const { selectedAmountUsd } = this.state;
    const { currentEthInUsd } = this.props;

    const maxInvestment =
      this.assetFunded || this.state.daysToGo < 0
        ? 0
        : (this.props.information.goal - this.props.information.raised).toFixed(2);

    this.etherValueSelected =
      selectedAmountUsd && Number(selectedAmountUsd / currentEthInUsd).toFixed(5);

    let minInvestment =
      this.state.daysToGo < 0 || maxInvestment === 0 ? 0 : 100;

    if (maxInvestment <= 100 && maxInvestment > 0 && this.state.daysToGo > 0) {
      minInvestment = 1;
    }

    const goal = Number(this.props.information.goal)
      .toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    const maxEther = Number(maxInvestment / currentEthInUsd).toFixed(5);
    const maxOwnership = maxInvestment && (
      (maxInvestment * 100) /
      this.props.information.goal
    ).toFixed(2);

    return (
      <Row>
        {this.state.isPopupOpen && (
          <BlockchainInfoContext.Consumer>
            {({ fundAsset, assertsNotification, setAssertsStatusState }) => (
              <ConfirmationPopup
                amountUsd={selectedAmountUsd}
                amountEth={this.state.selectedAmountEth}
                ownership={this.state.selectedOwnership}
                isPopupOpen={() => this.isPopupOpen()}
                handlePopupState={val => this.handlePopupState(val)}
                assetId={this.props.information.assetID}
                fundAsset={fundAsset}
                assertsNotification={assertsNotification}
                changeNotificationPlace={assertsNotification.changeNotificationPlace}
                setAssertsStatusState={setAssertsStatusState}
              />
            )}
          </BlockchainInfoContext.Consumer>
        )}
        <div>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} className="AssetDetails__right">
            <b className="AssetDetails__left-name">
              {this.props.information.assetName}
            </b>
            <LocationIcon
              className="AssetDetails__left-image-holder-location-icon"
            />
            <p className="AssetDetails__left-location">
              {this.props.information.city}, {this.props.information.country}
            </p>
            <div
              alt="Asset details background"
              className="AssetDetails__right-image"
              style={{ backgroundImage: `url(${this.props.information.imageSrc})` }}
            />
            <div className="AssetDetails__right-wrapper">
              <b className="AssetDetails__right-title-details">Asset Details</b>
              <p className="AssetDetails__right-content-details">
                {this.props.information.details}
              </p>
              <b className="AssetDetails__right-title-details">Description</b>
              <p className="AssetDetails__right-content-details">
                {this.props.information.description}
              </p>
              <b className="AssetDetails__right-title-details">Asset manager</b>
              <Address
                userName={this.props.information.address}
                className="AssetDetails__right-address"
              />
            </div>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12} className="AssetDetails__left">
            {/* <div className="AssetDetails__left-days-to-go-wrapper"> */}
            {/* TODO: dont panic; its commented because we are testing migration */}
            <div>
              <CalendarIcon className="AssetDetails__left-image-holder-calendar-icon" />
              <p className="AssetDetails__left-due-date">{this.state.endingAt}</p>
            </div>
            {/* </div> */}
            {/* <div className="AssetDetails__left-funding-wrapper"> */}
            <div className="AssetDetails__left-funding-wrapper">
              <div className="AssetDetails__left-funds-raised">
                <p className="AssetDetails__left-funding-title">Funds raised</p>
                <b
                  className="AssetDetails__left-funding-value"
                >
                  {this.assetFunded ? goal : `$${this.props.information.raised}`}
                </b>
              </div>
              <div className="AssetDetails__left-funds-goal">
                <p className="AssetDetails__left-funding-title">Funding goal</p>
                <b className="AssetDetails__left-funding-value">
                  {goal}
                </b>
              </div>
              <div className="AssetDetails__left-funds-investors">
                <p className="AssetDetails__left-funding-title">
                Number of investors so far
                </p>
                <b className="AssetDetails__left-funding-value">
                  {this.props.information.numberOfInvestors}
                </b>
              </div>
            </div>
            {/* </div> */}
            <p className="AssetDetails__left-calculate-title">
            Calculate your investment
            </p>

            <NumericInput
              style={{ width: '28%' }}
              placeHolderText="ETH Amount"
              value={this.state.selectedAmountEth}
              label="ETH"
              onChange={number => number > Number(maxEther) ?
                this.setState({
                  selectedAmountEth: maxEther,
                })
                : this.setState({
                    selectedAmountUsd:
                    number * currentEthInUsd,
                    selectedAmountEth: number,
                    selectedOwnership: (number * currentEthInUsd) && (
                  (number * currentEthInUsd * 100) /
                  this.props.information.goal
                ).toFixed(2),
              })
              }
              min={0}
              precision={5}
            />
            <span className="AssetDetails__left-calculate-separator">=</span>
            <NumericInput
              style={{ width: '28%' }}
              placeHolderText="USD Amount"
              value={this.state.selectedAmountUsd}
              onChange={number => number > Number(maxInvestment)
              ? this.setState({
                selectedAmountUsd: maxInvestment,
              })
              : this.setState({
                selectedAmountUsd: number,
                selectedAmountEth: Number(number / currentEthInUsd).toFixed(5),
                selectedOwnership: number && (
                  (number * 100) /
                  this.props.information.goal
                ).toFixed(2),
              })}
              label="$"
              min={0}
              precision={2}
            />
            <span className="AssetDetails__left-calculate-separator">=</span>

            <NumericInput
              style={{ width: '28%' }}
              placeHolderText="% Amount"
              value={this.state.selectedOwnership}
              min={0}
              label="%"
              onChange={number => number > Number(maxOwnership)
                ? this.setState({
                    selectedOwnership: maxOwnership,
                  })
                : this.setState({
                  selectedAmountUsd:
                    (this.props.information.goal / 100) * number,
                  selectedOwnership: number,
                  selectedAmountEth: (Number(maxEther) * (number / 100)).toFixed(5),
                })
              }
              precision={2}
            />
            <Slider
              id="slider"
              defaultValue={0}
              value={
                Number(selectedAmountUsd) >= minInvestment
                ? Number(selectedAmountUsd)
                : minInvestment
              }
              min={minInvestment}
              max={maxInvestment}
              onChange={number =>
                this.setState({
                selectedAmountUsd: number,
                selectedAmountEth: Number(number / currentEthInUsd).toFixed(5),
                selectedOwnership: number && (
                  (number * 100) /
                  this.props.information.goal
                ).toFixed(2),
                })}
              disabled={this.state.daysToGo < 0 || maxInvestment === 0}
            />
            {/* 100USD minimum as per connor's indication */}
            <p className="AssetDetails__left-slider-min">
            Min. <b>{minInvestment} USD</b>
            </p>
            <p className="AssetDetails__left-slider-max">
            Max. <b>{maxInvestment} USD</b>
            </p>
            <p className="AssetDetails__left-contribution">Your contribution:</p>
            <b className="AssetDetails__left-contribution-bordered AssetDetails__left-contribution-value">
              {selectedAmountUsd ? parseFloat(Number(selectedAmountUsd).toFixed(2)) : 0} USD
            </b>
            <div className="AssetDetails__left-separator" />
            <b className="AssetDetails__left-contribution-value">
              {selectedAmountUsd ? parseFloat(Number(this.etherValueSelected).toFixed(5)) : 0} ETH
            </b>
            <div>
              <p className="AssetDetails__left-ownership">Your ownership:</p>
              <b className="AssetDetails__left-ownership-value">
                {selectedAmountUsd ? this.state.selectedOwnership : 0}%
              </b>
            </div>
            <Button
              className="AssetDetails__left-contribute-btn"
              type="primary"
              onClick={() => this.handlePopupState(true)}
              disabled={
              this.state.daysToGo < 0
              || maxInvestment === 0
              || selectedAmountUsd < minInvestment
            }
            >
            Contribute
            </Button>
          </Col>
        </div>
      </Row>
    );
  }
}

AssetDetails.defaultProps = {
  currentEthInUsd: undefined,
};

AssetDetails.propTypes = {
  information: PropTypes.shape({
    assetID: PropTypes.string.isRequired,
    dueDate: PropTypes.number.isRequired,
    goal: PropTypes.string.isRequired,
    raised: PropTypes.string.isRequired,
    assetName: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    numberOfInvestors: PropTypes.number.isRequired,
    imageSrc: PropTypes.string.isRequired,
    fundingStage: PropTypes.string.isRequired,
    pastDate: PropTypes.bool.isRequired,
  }).isRequired,
  currentEthInUsd: PropTypes.number,
  changeNotificationPlace: PropTypes.func.isRequired,
  setAssertsStatusState: PropTypes.func.isRequired,
};

export default AssetDetails;
