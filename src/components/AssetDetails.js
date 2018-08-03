import React from 'react';
import PropTypes from 'prop-types';
import { Slider, ModalWrapper } from 'carbon-components-react';
import dayjs from 'dayjs';
import Web3 from 'web3';
import ConfirmationPopup from './ConfirmationPopup';
import Address from './Address';
import * as FundingHub from '../constants/contracts/FundingHub';
import { debug } from '../constants';
import '../styles/AssetDetails.css';
import locationIcon from '../images/location.png';
import calendarIcon from '../images/calendar.png';

class AssetDetails extends React.Component {
  constructor(props) {
    super(props);
    const { goal, raised } = this.props.information;
    this.state = {
      currentSelectedAmount: Math.floor((goal - raised) / 2),
      daysToGo: 0,
      timeToGo: '',
      endingAt: '',
      acceptedTos: false,
      displayWarning: false
    };
    this.setDateDetails = this.setDateDetails.bind(this);
    this.endDateLocal = dayjs(this.props.information.dueDate);
    this.clearInterval = this.clearInterval.bind(this);
    this.handleConfirmClicked = this.handleConfirmClicked.bind(this);
    this.setAcceptedTos = this.setAcceptedTos.bind(this);
    this.getAcceptedTos = this.getAcceptedTos.bind(this);
    this.runningMinInterval = false;
  }

  componentDidMount() {
    this.setDateDetails();
  }

  setDateDetails() {
    const maxInvestment =
      this.props.information.goal - this.props.information.raised;

    // funding goal has been reached
    if (maxInvestment === 0) {
      this.setState({
        timeToGo: 'Funding goal has been reached',
        daysToGo: 0,
        endingAt: ''
      });
      this.clearInterval();
      return;
    }
    // funding period has reached end date
    if (dayjs(new Date()) > this.endDateLocal) {
      this.setState({
        daysToGo: -1,
        timeToGo: 'Funding period has ended',
        endingAt: `Funding period has ended on ${dayjs(
          this.endDateLocal
        ).format('dddd, MMMM D')}`
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
        endingAt: `Funding period ends ${day} at ${dayjs(
          this.endDateLocal
        ).format('H:mm:ss')}`
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
        endingAt: `Funding period ends on ${dayjs(this.endDateLocal).format(
          'dddd, MMMM D'
        )} at ${dayjs(this.props.information.dueDate).format('H:mm:ss')}`
      });
      if (!this.setDateInterval) {
        this.setDateInterval = setInterval(() => {
          this.setDateDetails();
        }, 60000);
        this.runningMinInterval = true;
      }
    }
  }

  setAcceptedTos(acceptedTos) {
    this.setState({ acceptedTos });
    if (acceptedTos && this.state.displayWarning) {
      this.setState({ displayWarning: false });
    }
  }

  getAcceptedTos() {
    return this.state.acceptedTos;
  }

  clearInterval() {
    if (this.setDateInterval) {
      clearInterval(this.setDateInterval);
    }
  }

  componenWillUnmount() {
    this.clearInterval();
  }

  handleConfirmClicked() {
    if (!this.state.acceptedTos) {
      this.setState({ displayWarning: true });
      return false;
    }
    const fundingHubContract = new Web3.eth.Contract(
      FundingHub.ABI,
      FundingHub.ADDRESS
    );
    this.setState({ acceptedTos: false });
    const weiAmount = Web3.utils.toWei('0.5', 'ether');
    fundingHubContract.methods
      .fund(
        '0x1935c946aa27ed139ed7518a06b639cae47be52d556a99baf7075db6bb460153'
      )
      .send({
        value: weiAmount,
        from: '0x11cF613d319DC923f3248175e0271588F1B26991'
      })
      .then(debug)
      .catch(debug);

    return true;
  }

  render() {
    const maxInvestment =
      this.state.daysToGo < 0
        ? 0
        : this.props.information.goal - this.props.information.raised;
    const ownership =
      (this.state.currentSelectedAmount * 100) / this.props.information.goal;
    const etherValue = Number(
      (this.state.currentSelectedAmount / this.props.currentEthInUsd).toFixed(2)
    );
    let minInvestment =
      this.state.daysToGo < 0 || maxInvestment === 0 ? 0 : 100;

    if (maxInvestment <= 100 && maxInvestment > 0 && this.state.daysToGo > 0) {
      minInvestment = 1;
    }

    return (
      <div className="AssetDetails grid">
        <div className="AssetDetails__left col_lg-6 col_md-12">
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
                {this.props.information.raised.toLocaleString()} USD
              </b>
            </div>
            <div className="AssetDetails__left-funds-goal">
              <p className="AssetDetails__left-funding-title">Funding goal</p>
              <b className="AssetDetails__left-funding-value">
                {Number(this.props.information.goal).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
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
            {etherValue} ETH
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
          <ModalWrapper
            id="ConfirmationPopup__container"
            buttonTriggerText="Contribute"
            shouldCloseAfterSubmit
            modalBeforeContent={false}
            primaryButtonText="Confirm"
            secondaryButtonText="Cancel"
            handleSubmit={this.handleConfirmClicked}
            disabled={this.state.daysToGo < 0 || maxInvestment === 0}
          >
            <ConfirmationPopup
              amountUsd={this.state.currentSelectedAmount}
              amountEth={etherValue}
              ownership={ownership}
              setAcceptedTos={this.setAcceptedTos}
              displayWarning={this.state.displayWarning}
              getAcceptedTos={this.getAcceptedTos}
            />
          </ModalWrapper>
        </div>
        <div className="AssetDetails__right col_lg-6 col_md-12">
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
      </div>
    );
  }
}

AssetDetails.defaultProps = {
  currentEthInUsd: undefined
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
    imageSrc: PropTypes.string.isRequired
  }).isRequired,
  currentEthInUsd: PropTypes.number
};

export default AssetDetails;
