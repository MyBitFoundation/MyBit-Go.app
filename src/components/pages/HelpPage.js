import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Loading } from 'carbon-components-react';
import PropTypes from 'prop-types';

import '../../styles/HelpPage.css';
import CirclesBackgroundWrapper from '../CirclesBackgroundWrapper';

const classNames = require('classnames');
const exploreIcon = require('../../images/search.png');
const transactionsIcon = require('../../images/history.png');
const portfolioIcon = require('../../images/chart-area.png');
const metamaskIcon = require('../../images/metamask.png');
const bugIcon = require('../../images/medium-bug.png');

class HelpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendingMyb: false,
      transactionStatus: ''
    };
  }

  async handleGetMYB() {
    this.setState({ sendingMyb: true, transactionStatus: '' });
    try {
      const result = await this.props.fetchMyBit();
      if (result) {
        this.setState({ sendingMyb: false, transactionStatus: 1 });
      } else {
        this.setState({ sendingMyb: false, transactionStatus: 0 });
      }
    } catch (err) {
      this.setState({ sendingMyb: false });
    }
  }

  render() {
    const navOptions = [
      {
        imageSrc: exploreIcon,
        url: '/explore',
        title: 'Explore',
        desc:
          'Here you can explore the different assets currently listed for sale on the platform. Simply select a catagory then select an asset to see more information.'
      },
      {
        imageSrc: portfolioIcon,
        url: '/portfolio',
        title: 'Portfolio',
        desc:
          'Once you’ve invested in a device it goes into your portfolio tab. From here you can check its performance, ownership and more detailed information.'
      },
      {
        imageSrc: transactionsIcon,
        url: '/transaction-history',
        title: 'Transactions',
        desc:
          'From here you can see a complete list of all your transactions; from investments you’ve made to revenue you’ve generated; from a particular device.'
      }
    ];

    const buttons = [
      {
        imageSrc: metamaskIcon,
        url: 'https://www.youtube.com/watch?time_continue=25&v=6Gf_kRE4MJU',
        text: 'Need help setting up Metamask? Click here.',
        className: 'HelpPage__footer-button--is-metamask'
      },
      {
        imageSrc: bugIcon,
        url: '',
        text: 'Found a bug? Click here.',
        className: 'HelpPage__footer-button--is-bug'
      }
    ];

    return (
      <CirclesBackgroundWrapper>
        <div className="HelpPage">
          <h1 className="HelpPage__title">Welcome to the MyBit Alpha.</h1>
          <p className="HelpPage__desc">
            Here are some helpful tips to get you started. Remember to connect
            to the Ethereum Ropsten testnet via Metamask. If you need to come
            back to this page click the help button in the top right.
          </p>
          <p className="HelpPage__faucet-text">
            Don’t forget to get your faucet MYB here.
          </p>

          {!this.state.sendingMyb && (
            <Button
              small
              kind="primary"
              className=""
              onClick={() => this.handleGetMYB()}
            >
              Send me the cash
            </Button>
          )}
          {this.state.transactionStatus === 1 && (
            <p className="HelpPage__faucet-status-text">Sent successfuly!</p>
          )}
          {this.state.transactionStatus === 0 && (
            <p className="HelpPage__faucet-status-text">
              Transaction failed, please try again.
            </p>
          )}
          {this.state.sendingMyb && (
            <div>
              <Loading small withOverlay={false} style={{ margin: '0 auto' }} />
              <p>
                Accept the transaction in metamask and wait for a brief moment.
              </p>
            </div>
          )}
          <div className="HelpPage__navigation">
            {navOptions.map(option => (
              <Link
                className="HelpPage__navigation-item"
                key={option.url}
                to={option.url}
                href={option.url}
              >
                <div className="HelpPage__navigation-item-image-wrapper">
                  <img
                    className="HelpPage__navigation-item-image"
                    src={option.imageSrc}
                    alt={option.title}
                  />
                </div>
                <b className="HelpPage__navigation-item-title">
                  {option.title}
                </b>
                <p className="HelpPage__navigation-item-description">
                  {option.desc}
                </p>
              </Link>
            ))}
          </div>
          <div className="HelpPage__footer">
            {buttons.map(option => (
              <a
                key={option.url}
                to={option.url}
                href={option.url}
                className={classNames({
                  'HelpPage__footer-button': true,
                  [option.className]: true
                })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="HelpPage__footer-button-image-wrapper">
                  <img
                    className="HelpPage__footer-button-image"
                    src={option.imageSrc}
                    alt={option.text}
                  />
                </div>
                <b className="HelpPage__footer-button-text">{option.text}</b>
              </a>
            ))}
          </div>
        </div>
      </CirclesBackgroundWrapper>
    );
  }
}

HelpPage.propTypes = {
  fetchMyBit: PropTypes.func
};

HelpPage.defaultProps = {
  fetchMyBit: ''
};

export default HelpPage;
