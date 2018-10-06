/* eslint-disable react/no-unused-state */

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
      // currentSelectedAmountUsd: this.assetFunded ? 0 : Math.floor((goal - raised) / 2),
      currentSelectedAmountUsd: null,
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
    const { currentSelectedAmountUsd } = this.state;
    const { currentEthInUsd } = this.props;

    const maxInvestment =
      this.assetFunded || this.state.daysToGo < 0
        ? 0
        : (this.props.information.goal - this.props.information.raised).toFixed(5);

    const ownership = (
      (currentSelectedAmountUsd * 100) /
      this.props.information.goal
    ).toFixed(5);

    this.etherValueSelected = Number(currentSelectedAmountUsd / currentEthInUsd).toFixed(5);

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

      // this.etherValueSelected = null;
      // this.ownership = null;

    return (
      <Row>
        {this.state.isPopupOpen && (
          <BlockchainInfoContext.Consumer>
            {({ fundAsset }) => (
              <ConfirmationPopup
                amountUsd={currentSelectedAmountUsd}
                amountEth={this.etherValueSelected}
                ownership={ownership}
                isPopupOpen={() => this.isPopupOpen()}
                handlePopupState={val => this.handlePopupState(val)}
                assetId={this.props.information.assetID}
                fundAsset={fundAsset}
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
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <CalendarIcon className="AssetDetails__left-image-holder-calendar-icon" />
              <p className="AssetDetails__left-due-date">{this.state.endingAt}</p>
            </Col>
            {/* </div> */}
            {/* <div className="AssetDetails__left-funding-wrapper"> */}
            <Col xs={24} sm={24} md={24} lg={24} xl={24} className="AssetDetails__left-funding-wrapper">
              <div className="AssetDetails__left-funds-raised">
                <p className="AssetDetails__left-funding-title">Funds raised</p>
                <b
                  className="AssetDetails__left-funding-value"
                >
                  {this.assetFunded ? goal : this.props.information.raised} USD
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
            </Col>
            {/* </div> */}
            <p className="AssetDetails__left-calculate-title">
            Calculate your investment
            </p>

            <NumericInput
              style={{ width: '27%' }}
              placeHolderText="Amount in ETH"
              value={this.etherValueSelected}
              label="ETH"
              onChange={number =>
                this.setState({
                  currentSelectedAmountUsd:
                    Number((number * currentEthInUsd)),
                })
              }
            />
            <span className="AssetDetails__left-calculate-separator">=</span>
            <NumericInput
              style={{ width: '27%' }}
              placeHolderText="Amount in USD"
              value={this.state.currentSelectedAmountUsd}
              onChange={number => this.setState({ currentSelectedAmountUsd: number })}
              label="$"
            />
            <span className="AssetDetails__left-calculate-separator">=</span>

            <NumericInput
              style={{ width: '27%' }}
              placeHolderText="Amount %"
              value={Number(ownership)}
              label="%"
              onChange={number =>
                this.setState({
                  currentSelectedAmountUsd:
                    (this.props.information.goal / 100) * number,
                  })}
            />
            <Slider
              id="slider"
              defaultValue={
              Number(currentSelectedAmountUsd) >= minInvestment
              ? Number(currentSelectedAmountUsd)
              : minInvestment
            }
              min={minInvestment}
              max={maxInvestment}
              onChange={value => this.setState({ currentSelectedAmountUsd: Number(value) })}
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
              {currentSelectedAmountUsd} USD
            </b>
            <div className="AssetDetails__left-separator" />
            <b className="AssetDetails__left-contribution-value">
              {this.etherValueSelected} ETH
            </b>
            <div>
              <p className="AssetDetails__left-ownership">Your ownership:</p>
              <b className="AssetDetails__left-ownership-value">
                {ownership}%
              </b>
            </div>
            <Button
              className="AssetDetails__left-contribute-btn"
              type="primary"
              onClick={() => this.handlePopupState(true)}
              disabled={
              this.state.daysToGo < 0
              || maxInvestment === 0
              || currentSelectedAmountUsd < minInvestment
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
};

export default AssetDetails;
