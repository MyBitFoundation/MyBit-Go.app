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

import ValueDisplay from './ValueDisplay';
import Watch from './Watch';
import ConfirmationPopup from './ConfirmationPopup';
import '../styles/AssetDetails.css';
import LocationIcon from '../images/Location-blue.svg';
import MyBitLogo from '../images/mybit-blue.svg';
import Sliders from '../images/sliders.svg';
import Civic from '../images/civic.svg';
import CalendarIcon from '../images/calendar.svg';
import BlockchainInfoContext from './BlockchainInfoContext';
import NumericInput from './NumericInput';
import {
  formatMonetaryValue,
  shortenAddress,
} from '../util/helpers';
import { S3_URL } from '../constants';

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

  componentWillReceiveProps(){
    this.setDateDetails();
  }

  setDateDetails() {
    const {
      fundingStage,
    } = this.props.information;

    const assetFunded = this.props.information.fundingStage === '3' || this.props.information.fundingStage === '4'
    const maxInvestment =
      this.props.information.goal - this.props.information.raised;

    // funding goal has been reached
    if (maxInvestment === 0 || assetFunded) {
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
    clearInterval(this.setDateInterval);
  }

  componenWillUnmount() {
    this.clearInterval();
  }

  getFilesToRender(files, assetId){
    if(!files || files.length === 0){
      return <span>None</span>;
    }
    const toReturn = files.map(file => (
      <a
        href={`${S3_URL}${assetId}:${file}`}
      >
        {file}
      </a>
    ))

    return toReturn;
  }

  render() {
    const { selectedAmountUsd, selectedAmountEth } = this.state;
    const { currentEthInUsd } = this.props;
    const {
      goal,
      raised,
      city,
      country,
      assetID,
      details,
      description,
      address,
      numberOfInvestors,
      watchListed,
      files,
      managerPercentage
    } = this.props.information;

    const filesToRender = this.getFilesToRender(files, assetID);

    const maxInvestment =
      this.assetFunded || this.state.daysToGo < 0
        ? 0
        : Number((goal - raised).toFixed(2));

    let minInvestment =
      this.state.daysToGo < 0 || maxInvestment === 0 ? 0 : 100;

    if (maxInvestment <= 100 && maxInvestment > 0 && this.state.daysToGo > 0) {
      minInvestment = 1;
    }

    const goalFormatted = formatMonetaryValue(goal);

    const maxEther = Number(maxInvestment / currentEthInUsd).toFixed(5);
    const maxOwnership = maxInvestment && (
      (maxInvestment * 100) /
      this.props.information.goal
    ).toFixed(2);

    return (
      <Row>
        {this.state.isPopupOpen && (
          <BlockchainInfoContext.Consumer>
            {({
              fundAsset,
              userHasMetamask,
              userIsLoggedIn,
              network,
              extensionUrl,
              isBraveBrowser,
              updateNotification,
            }) => (
              <ConfirmationPopup
                amountUsd={formatMonetaryValue(selectedAmountUsd)}
                amountEth={this.state.selectedAmountEth}
                ownership={this.state.selectedOwnership}
                isPopupOpen={() => this.isPopupOpen()}
                handlePopupState={val => this.handlePopupState(val)}
                assetId={assetID}
                fundAsset={fundAsset}
                userHasMetamask={userHasMetamask}
                userIsLoggedIn={userIsLoggedIn}
                network={network}
                extensionUrl={extensionUrl}
                isBraveBrowser={isBraveBrowser}
                updateNotification={updateNotification}
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
              {city}, {country}
            </p>
            <div
              alt="Asset details background"
              className="AssetDetails__right-container"
              style={{ backgroundImage: `url(${this.props.information.imageSrc})` }}
            >
              <BlockchainInfoContext.Consumer>
                {({
                  usingServer,
                  handleClickedAssetFavorite,
                }) =>
                  !usingServer && (
                    <Watch
                      active={watchListed}
                      handleClick={handleClickedAssetFavorite}
                      assetId={assetID}
                    />
                )}
              </BlockchainInfoContext.Consumer>
              {/* div as unary operator that does image showing.
              because img cant support proper image render */}
              <div
                alt="Asset details background"
                className="AssetDetails__right-image"
                style={{ backgroundImage: `url(${this.props.information.imageSrc})` }}
              />
            </div>

            <div className="AssetDetails__right-wrapper">
              <b className="AssetDetails__right-title-details">Asset Details</b>
              <p className="AssetDetails__right-content-details">
                {details}
              </p>
              <b className="AssetDetails__right-title-details">Description</b>
              <p className="AssetDetails__right-content-details">
                {description}
              </p>
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
                  {this.assetFunded ? goalFormatted : `${formatMonetaryValue(raised)}`}
                </b>
              </div>
              <div className="AssetDetails__left-funds-goal">
                <p className="AssetDetails__left-funding-title">Funding goal</p>
                <b className="AssetDetails__left-funding-value">
                  {goalFormatted}
                </b>
              </div>
              <div className="AssetDetails__left-funds-investors">
                <p className="AssetDetails__left-funding-title">
                Number of investors so far
                </p>
                <b className="AssetDetails__left-funding-value">
                  {numberOfInvestors}
                </b>
              </div>
            </div>
            {/* </div> */}
            <p className="AssetDetails__left-calculate-title">
            Calculate your investment
            </p>

            <NumericInput
              style={{ width: '28%' }}
              placeholdertext="ETH Amount"
              value={this.state.selectedAmountEth}
              label="ETH"
              onChange={number => number > Number(maxEther) ?
                this.setState({
                  selectedAmountEth: maxEther,
                })
                : this.setState({
                    selectedAmountUsd:
                    Number((number * currentEthInUsd).toFixed(2)),
                    selectedAmountEth: number,
                    selectedOwnership: (number * currentEthInUsd) && (
                  (number * currentEthInUsd * 100) /
                  goal
                ).toFixed(2),
              })
              }
              min={0}
              precision={5}
            />
            <span className="AssetDetails__left-calculate-separator">=</span>
            <NumericInput
              style={{ width: '28%' }}
              placeholdertext="USD Amount"
              value={this.state.selectedAmountUsd}
              onChange={number => number > Number(maxInvestment)
              ? this.setState({
                selectedAmountUsd: maxInvestment,
              })
              : this.setState({
                selectedAmountUsd: number,
                selectedAmountEth: Number(number / currentEthInUsd).toFixed(5),
                selectedOwnership: number && ((number * 100) / goal).toFixed(2),
              })}
              label="$"
              min={0}
              precision={2}
            />
            <span className="AssetDetails__left-calculate-separator">=</span>

            <NumericInput
              style={{ width: '28%' }}
              placeholdertext="% Amount"
              value={this.state.selectedOwnership}
              min={0}
              label="%"
              onChange={number => number > Number(maxOwnership)
                ? this.setState({
                    selectedOwnership: maxOwnership,
                  })
                : this.setState({
                  selectedAmountUsd: (goal / 100) * number,
                  selectedOwnership: number,
                  selectedAmountEth: (Number(maxEther) * (number / 100)).toFixed(5),
                })
              }
              precision={2}
            />
            <Slider
              id="slider"
              step={0.01}
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
                  selectedOwnership: number && ((number * 100) / goal).toFixed(2),
                })}
              disabled={this.state.daysToGo < 0 || maxInvestment === 0}
            />
            {/* 100USD minimum as per connor's indication */}
            <p className="AssetDetails__left-slider-min">
            Min. <b>{formatMonetaryValue(minInvestment).substring(1)} USD</b>
            </p>
            <p className="AssetDetails__left-slider-max">
            Max. <b>{formatMonetaryValue(maxInvestment).substring(1)} USD</b>
            </p>
            <p className="AssetDetails__left-contribution">Your contribution:</p>
            <b className="AssetDetails__left-contribution-bordered AssetDetails__left-contribution-value">
              {selectedAmountUsd ? formatMonetaryValue(selectedAmountUsd).substring(1) : 0} USD
            </b>
            <div className="AssetDetails__left-separator" />
            <b className="AssetDetails__left-contribution-value">
              {selectedAmountUsd ? parseFloat(Number(selectedAmountEth).toFixed(5)) : 0} ETH
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
            <div className="AssetDetails__left-assetManager">
              <div className="AssetDetails__left-assetManager-left">
                <p className="AssetDetails__left-assetManager-title">Asset Manager</p>
                <Civic className="AssetDetails__left-assetManager-civic"/>
                <a
                  className="AssetDetails__left-assetManager-address"
                  href={`https://ropsten.etherscan.io/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortenAddress(address, 5, 2)}
                </a>
                <p className="AssetDetails__left-assetManager-supportingDocuments">Supporting documents</p>
                {filesToRender}
              </div>
              <div className="AssetDetails__left-assetManager-right">
                <ValueDisplay
                  text="Total Management Fee"
                  icon={<Sliders />}
                  value={`${managerPercentage}%`}
                  hasSeparator
                  hasIcon
                />
                <ValueDisplay
                  text="Asset Collateral"
                  icon={<MyBitLogo />}
                  value="0%"
                  hasSeparator
                  hasIcon
                />
              </div>
            </div>
          </Col>
        </div>
      </Row>
    );
  }
}

AssetDetails.defaultProps = {
  currentEthInUsd: undefined,
  information: {
    imageSrc: '',
  },
};

AssetDetails.propTypes = {
  information: PropTypes.shape({
    assetID: PropTypes.string.isRequired,
    dueDate: PropTypes.shape({ params: PropTypes.object }).isRequired,
    goal: PropTypes.number.isRequired,
    raised: PropTypes.number.isRequired,
    assetName: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    numberOfInvestors: PropTypes.number.isRequired,
    imageSrc: PropTypes.string,
    fundingStage: PropTypes.string.isRequired,
    pastDate: PropTypes.bool.isRequired,
    watchListed: PropTypes.bool.isRequired,
  }),
  currentEthInUsd: PropTypes.number,
};

export default AssetDetails;
