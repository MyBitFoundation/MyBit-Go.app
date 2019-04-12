import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import AssetDeadlineWrapper from './assetDeadlineWrapper';
import AssetDeadlineCalendarIcon from './assetDeadlineCalendarIcon';

class AssetDeadline extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      endingAt: '',
    };
  }

  componentDidMount = () => {
    this.setDateDetails();
  }

  componentWillUnmount = () => {
    this.clearInterval();
  }

  clearInterval = () => {
    clearInterval(this.setDateInterval);
  }

  setDateDetails = () => {
    const {
      fundingDeadline,
      funded,
      pastDate,
      handleDeadlineHit,
    } = this.props;

    // funding goal has been reached
    if (funded) {
      this.setState({
        endingAt: 'Funding goal has been reached',
      });
      this.clearInterval();
      return;
    }

    const days = fundingDeadline.diff(dayjs(), 'days');
    const seconds = fundingDeadline.diff(dayjs(), 'seconds');
    const calculateRemainingTime = dayjs()
      .startOf('day')
      .add(seconds, 'seconds');

    if(pastDate || seconds <= 0){
      this.clearInterval();
      handleDeadlineHit();
      // funding period has reached end date
      this.setState({
        endingAt: `Funding period has ended on ${dayjs(fundingDeadline).format('dddd, MMMM D')}`,
      });
      return;
    }

    // less than 1 day until funding period ends
    if (days === 0) {
      const secondsToEndDate = fundingDeadline.diff(dayjs(), 'seconds');
      const aux = dayjs()
        .startOf('day')
        .add(86400, 'seconds');
      const secondsToMidnight = aux.diff(dayjs(), 'seconds');
      let day = 'today';
      if (secondsToEndDate > secondsToMidnight) day = 'tomorrow';

      this.setState({
        endingAt: `Ending in ${calculateRemainingTime.hour()}h ${calculateRemainingTime.minute()}m ${calculateRemainingTime.second()}s at ${dayjs(fundingDeadline).format('H:mm:ss')}`,
      });

      if (!this.setDateInterval || this.runningMinInterval) {
        this.setDateInterval = setInterval(() => {
          this.setDateDetails();
        }, 1000);
        this.runningMinInterval = false;
      }
    } else if (days < 8){
      // less than 1 week to finish
      const dayString = days === 1 ? 'day' : 'days';
      this.setState({
        endingAt: `${days} ${dayString} and ${calculateRemainingTime.hour()} hours to go.\n Funding period ends on ${dayjs(fundingDeadline).format('dddd, MMMM D')}`,
      });
      if (!this.setDateInterval) {
        this.setDateInterval = setInterval(() => {
          this.setDateDetails();
        }, 60000);
        this.runningMinInterval = true;
      }
    } else {
      this.setState({
        endingAt: `Funding period ends on ${dayjs(fundingDeadline).format('dddd, MMMM D')}`,
      });
    }
  }

  render = () => (
    <AssetDeadlineWrapper>
      <AssetDeadlineCalendarIcon />
      <span>{this.state.endingAt}</span>
    </AssetDeadlineWrapper>
  )
}

export default AssetDeadline;
