import React from 'react';
import PropTypes from 'prop-types';
import { Slider,  } from 'carbon-components-react';
import { Button } from 'antd';
import dayjs from 'dayjs';
import ConfirmationPopup from './ConfirmationPopup';
import Address from './Address';
import '../styles/AssetDetails.css';
import locationIcon from '../images/location.png';
import calendarIcon from '../images/calendar.png';
import BlockchainInfoContext from './BlockchainInfoContext';

class AssetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.assetFunded = this.props.information.fundingStage === '3' || this.props.information.fundingStage === '4';
    const { goal, raised } = this.props.information;
    this.state = {
      currentSelectedAmount: this.assetFunded ? 0 : Math.floor((goal - raised) / 2),
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
    this.etherValueSelected = 0;
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
        endingAt: '',
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
        endingAt: `Funding period ends on ${dayjs(this.endDateLocal).format('dddd, MMMM D')} at ${dayjs(this.props.information.dueDate).format('H:mm:ss')}`,
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
    const maxInvestment =
      this.assetFunded || this.state.daysToGo < 0
        ? 0
        : (this.props.information.goal - this.props.information.raised).toFixed(2);
    const ownership = (
      (this.state.currentSelectedAmount * 100) /
      this.props.information.goal
    ).toFixed(2);
    this.etherValueSelected = Number((this.state.currentSelectedAmount / this.props.currentEthInUsd)
      .toFixed(2));
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

    return (
      <div className="AssetDetails grid">
        {this.state.isPopupOpen && (
          <BlockchainInfoContext.Consumer>
            {({ fundAsset }) => (
              <ConfirmationPopup
                amountUsd={this.state.currentSelectedAmount}
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
        <div className="AssetDetails__right col_lg-6 col_md-12">
        <b className="AssetDetails__left-name">
            {this.props.information.assetName}
          </b>
          <img
            alt="Location icon"
            className="AssetDetails__left-image-holder-location-icon"
            src={locationIcon}
          />
          <p className="AssetDetails__left-location">
            {this.props.information.city}, {this.props.information.country}
          </p>
          <img
            alt="Asset details background"
            className="AssetDetails__right-image"
            src={this.props.information.imageSrc}
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
        </div>
        <div className="AssetDetails__left col_lg-6 col_md-12">
          
          <div className="AssetDetails__left-days-to-go-wrapper">
            <img
              alt="Location icon"
              className="AssetDetails__left-image-holder-calendar-icon"
              src={calendarIcon}
            />
            <p className="AssetDetails__left-days-to-go">
              {this.state.timeToGo}
            </p>
          </div>
          <p className="AssetDetails__left-due-date">{this.state.endingAt}</p>
          <div className="AssetDetails__left-funding-wrapper">
            <div className="AssetDetails__left-funds-raised">
              <p className="AssetDetails__left-funding-title">Funds raised</p>
              <b
                className="AssetDetails__left-funding-value"
                style={{ color: '#2db84b' }}
              >
                {this.assetFunded ? goal : this.props.information.raised.toLocaleString()} USD
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
          <p className="AssetDetails__left-calculate-title">
            Calculate your investment
          </p>
          <Slider
            id="slider"
            value={this.state.currentSelectedAmount}
            min={minInvestment}
            max={maxInvestment}
            onChange={arg =>
              this.setState({ currentSelectedAmount: arg.value })
            }
            hideTextInput
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
            {this.state.currentSelectedAmount.toLocaleString()} USD
          </b>
          <div className="AssetDetails__left-separator" />
          <b className="AssetDetails__left-contribution-value">
            {this.etherValueSelected} ETH
          </b>
          <p className="AssetDetails__left-ownership">
            Ownership:{' '}
            <b className="AssetDetails__left-contribution-value">
              {ownership}%
            </b>
          </p>
          <p className="AssetDetails__left-contribution">
            Expected annual return:
          </p>
          <b className="AssetDetails__left-contribution-bordered AssetDetails__left-contribution-value AssetDetails__left-contribution-inactive">
            18%
          </b>
          <div className="AssetDetails__left-separator" />
          <b className="AssetDetails__left-contribution-bordered AssetDetails__left-contribution-value AssetDetails__left-contribution-inactive">
            990 USD
          </b>
          <div className="AssetDetails__left-separator" />
          <b className="AssetDetails__left-contribution-value AssetDetails__left-contribution-inactive">
            1.87 ETH
          </b>
          <Button
            type="primary"
            className="AssetDetails__left-contribute-btn"
            onClick={() => this.handlePopupState(true)}
            disabled={this.state.daysToGo < 0 || maxInvestment === 0}
          >
            Contribute
          </Button>
        </div>
        
      </div>
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
