import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import Carousel from 'antd/lib/carousel';
import { Consumer as BancorConsumer } from '../UI/BancorContainer/index';
import {
  CarouselWrapper,
  SliderNavigation,
  Slide,
} from '../UI/OnboardingPage/styledOnboardingPage';
import MyBitGoLogo from '../../images/onboarding/mybitgo.png';
import MyBitGlobe from '../../images/onboarding/globe.png';
import MyBitDesk from '../../images/onboarding/desk.png';
import SafeGraphic from '../../images/onboarding/safe-graphic.png';
import EthereumGraphic from '../../images/onboarding/ethereum.png';
import SmartContract from '../../images/onboarding/smart_contract.png';
import Key from '../../images/onboarding/key.png';
import SetupGraphic from '../../images/onboarding/setup.png';
import RightArrow from '../../images/onboarding/arrow-right.png';

const SliderNavigationTooltips = [
  { slide: 0, tooltip: 'What is MyBit Go?' },
  { slide: 1, tooltip: 'What can you use MyBit Go for?' },
  { slide: 2, tooltip: 'What it isn\'t?' },
  { slide: 3, tooltip: 'What is blockain?' },
  { slide: 4, tooltip: 'What are the benefits?' },
  { slide: 5, tooltip: 'What is Ethereum?' },
  { slide: 6, tooltip: 'Smart contracts' },
  { slide: 7, tooltip: 'How do I invest?' },
  { slide: 8, tooltip: 'How to secure my assets?' },
  { slide: 9, tooltip: 'Required setup' },
];

class OnboardingPage extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.state = {
      currentSlide: 0,
    };
  }

  next() {
    this.carousel.next();
    // this.setState(state => ({
    //   currentSlide: state.currentSlide + 1,
    // }));
  }

  previous() {
    this.carousel.prev();
    // this.setState(state => ({
    //   currentSlide: state.currentSlide - 1,
    // }));
  }

  goToSlide(number) {
    this.carousel.goTo(number, false);
    // this.setState(() => ({
    //   currentSlide: number,
    // }));
  }

  render() {
    const { currentSlide } = this.state;
    return (
      <CarouselWrapper>
        <Carousel
          ref={(node) => { this.carousel = node; }}
          effect="slide"
          dots={false}
          afterChange={(current) => {
            this.setState({
              currentSlide: current,
            });
          }}
        >
          <Slide>
            <Link to="/explore" className="Onboarding__btn-close">
              +
            </Link>
            <img
              src={MyBitGoLogo}
              width="90"
              className="Onboarding__img-default"
              alt="MyBit Onboarding Slide 1"
            />
            <h1 className="Onboarding__main-title">Welcome to MyBit Go</h1>
            <p className="Onboarding__paragraph--intro">
              <strong>
                MyBit Go brings power and control back to you. Invest without a
                bank, broker, fund or third-party.
              </strong>
            </p>
            <p className="Onboarding__paragraph">
              MyBit Go is a secure investment platform available to anyone. It
              enables you to invest in high ROI opportunities and receive
              revenue in real-time.
            </p>
            <p className="Onboarding__paragraph">
              In addition, you actually own and control your investments, unlike
              stocks.
            </p>
            <div className="Onboarding__buttons">
              <Button
                className="Onboarding__buttons-next"
                type="primary"
                onClick={this.next}
              >
                More on MyBit Go{' '}
                <img
                  src={RightArrow}
                  className="Onboarding__buttons-next-arrow"
                  alt="Next Button Arrow"
                />
              </Button>
            </div>
          </Slide>

          <Slide>
            <Link to="/explore" className="Onboarding__btn-close">
              +
            </Link>
            <img
              src={MyBitGlobe}
              width="164"
              className="Onboarding__img-globe"
              alt="MyBit Onboarding Slide 2"
            />
            <h1 className="Onboarding__main-title--long">
              The{" "}
              <span className="Onboarding__main-title--blue">
                next generation
              </span>{" "}
              <br />
              investment portal
            </h1>
            <h2 className="Onboarding__paragraph-title--big">
              What can you use MyBit Go for?
            </h2>
            <ul className="Onboarding__list">
              <li className="Onboarding__list-item">
                Invest in a variety of assets without a broker or intermediary
              </li>
              <li className="Onboarding__list-item">
                Invest without a bank account
              </li>
              <li className="Onboarding__list-item">
                Be in full control of your capital and investments
              </li>
              <li className="Onboarding__list-item">
                Invest without location restrictions, anyone can access
                investment opportunities
              </li>
              <li className="Onboarding__list-item">
                Receive payouts in real-time. No more waiting for quarterly or
                annual distributions
              </li>
              <li className="Onboarding__list-item">
                Be protected from failure. If MyBit Go ceases to exist, your
                investments will still be safe
              </li>
            </ul>
            <div className="Onboarding__buttons">
              <Button
                className="Onboarding__buttons-next"
                type="primary"
                onClick={this.next}
              >
                What it isn't{" "}
                <img
                  src={RightArrow}
                  className="Onboarding__buttons-next-arrow"
                  alt="Next Button Arrow"
                />
              </Button>
            </div>
            <Button
              className="Onboarding__buttons-back"
              onClick={this.previous}
            >
              Back
            </Button>
          </Slide>

          <Slide>
            <Link to="/explore" className="Onboarding__btn-close">
              +
            </Link>
            <img
              src={MyBitDesk}
              width="190"
              className="Onboarding__img-desk"
              alt="MyBit Onboarding Slide 3"
            />
            <h1 className="Onboarding__main-title">
              MyBit Go is{" "}
              <span className="Onboarding__main-title--red">not</span> an <br />{" "}
              investment fund
            </h1>
            <ul className="Onboarding__list">
              <li className="Onboarding__list-item">
                We do not invest on your behalf
              </li>
              <li className="Onboarding__list-item">
                We do not store your personal data
              </li>
              <li className="Onboarding__list-item">
                We do not provide investment advice
              </li>
              <li className="Onboarding__list-item">
                We do not hold your investments or capital
              </li>
              <li className="Onboarding__list-item">
                We cannot enforce investments
              </li>
              <li className="Onboarding__list-item">
                We do not guarantee returns
              </li>
            </ul>
            <div className="Onboarding__buttons">
              <Button
                className="Onboarding__buttons-skip"
                onClick={() => this.goToSlide(7)}
              >
                Skip… I know Blockchain
              </Button>
              <Button
                className="Onboarding__buttons-next"
                type="primary"
                onClick={this.next}
              >
                What is blockchain?{" "}
                <img
                  src={RightArrow}
                  className="Onboarding__buttons-next-arrow"
                  alt="Next Button Arrow"
                />
              </Button>
            </div>
            <Button
              className="Onboarding__buttons-back"
              onClick={this.previous}
            >
              Back
            </Button>
          </Slide>

          <Slide>
            <Link to="/explore" className="Onboarding__btn-close">
              +
            </Link>
            <h1 className="Onboarding__main-title">
              What is{" "}
              <span className="Onboarding__main-title--blue">blockchain?</span>
            </h1>
            <p className="Onboarding__paragraph--no-images">
              It is the “value” layer that the internet is missing. The internet
              lets users transfer data and communicate with each other. The
              blockchain enables users to store and transfer value.
            </p>
            <p className="Onboarding__paragraph--no-images">
              It acts like a giant spreadsheet which keeps track of every
              account balance and transaction for currencies, investments,
              assets, and other forms of value.
            </p>
            <p className="Onboarding__paragraph--no-images">
              It is maintained by thousands of people across the globe who are
              incentivised to validate transactions and ensure that balances are
              accurate.
            </p>
            <p className="Onboarding__paragraph--no-images">
              It is highly secure. Bitcoin has been around for over 10 years and
              its network has not suffered one hack or malfunction.
            </p>
            <div className="Onboarding__buttons">
              <Button
                className="Onboarding__buttons-next"
                type="primary"
                onClick={this.next}
              >
                Next{" "}
                <img
                  src={RightArrow}
                  className="Onboarding__buttons-next-arrow"
                  alt="Next Button Arrow"
                />
              </Button>
            </div>
            <Button
              className="Onboarding__buttons-back"
              onClick={this.previous}
            >
              Back
            </Button>
          </Slide>

          <Slide>
            <Link to="/explore" className="Onboarding__btn-close">
              +
            </Link>
            <h1 className="Onboarding__main-title">
              What are the{" "}
              <span className="Onboarding__main-title--blue">benefits?</span>
            </h1>
            <ul className="Onboarding__list--small-mt">
              <li className="Onboarding__list--small-mt-item">
                Faster, cheaper, safer, and more accessible
              </li>
              <li className="Onboarding__list--small-mt-item">
                No single point of failure risk
              </li>
              <li className="Onboarding__list--small-mt-item">
                No counterparty risk and no relying on third parties to complete
                transactions
              </li>
              <li className="Onboarding__list--small-mt-item">
                Fast and cheap transactions to anyone, anywhere
              </li>
              <li className="Onboarding__list--small-mt-item">
                Give ownership back to the people, putting them back in control
                of capital, investments, and value
              </li>
            </ul>
            <div className="Onboarding__static-img-wrapper">
              <img
                src={SafeGraphic}
                width="113"
                className="Onboarding__img-static"
                alt="MyBit Globe"
              />
            </div>
            <div className="Onboarding__buttons">
              <Button
                className="Onboarding__buttons-next"
                type="primary"
                onClick={this.next}
              >
                What is Ethereum?{" "}
                <img
                  src={RightArrow}
                  className="Onboarding__buttons-next-arrow"
                  alt="Next Button Arrow"
                />
              </Button>
            </div>
            <Button
              className="Onboarding__buttons-back"
              onClick={this.previous}
            >
              Back
            </Button>
          </Slide>

          <Slide>
            <Link to="/explore" className="Onboarding__btn-close">
              +
            </Link>
            <h1 className="Onboarding__main-title">Ethereum</h1>
            <div className="Onboarding__paragraph-wrapper">
              <p className="Onboarding__paragraph--no-images--small">
                Ethereum is a platform based on blockchain technology. Unlike
                Bitcoin, users can builld applications on top of it.
              </p>
              <p className="Onboarding__paragraph--no-images--small">
                For comparison, you can think of it like this: if Bitcoin is a
                next generation bank, then Ethereum is the software that lets
                anyone build a next generation bank.
              </p>
              <p className="Onboarding__paragraph--no-images--small">
                The possibilities of what can be built on Ethereum extend to
                nearly every business industry.
              </p>
            </div>
            <div className="Onboarding__static-img-wrapper">
              <img
                src={EthereumGraphic}
                width="230"
                className="Onboarding__img-static"
                alt="MyBit Globe"
              />
            </div>
            <div className="Onboarding__buttons">
              <Button
                className="Onboarding__buttons-next"
                type="primary"
                onClick={this.next}
              >
                Smart contracts{" "}
                <img
                  src={RightArrow}
                  className="Onboarding__buttons-next-arrow"
                  alt="Next Button Arrow"
                />
              </Button>
            </div>
            <Button
              className="Onboarding__buttons-back"
              onClick={this.previous}
            >
              Back
            </Button>
          </Slide>

          <Slide>
            <Link to="/explore" className="Onboarding__btn-close">
              +
            </Link>
            <h1 className="Onboarding__main-title">
              <span className="Onboarding__main-title--blue">Smart</span>{" "}
              contracts
            </h1>
            <p className="Onboarding__paragraph--no-images-full">
              'Smart contracts' is a phrase used to describe computer code that
              automatically executes when specific conditions are met. This is
              extremely useful for the exchange of money, content, property, or
              anything of value.
            </p>
            <p className="Onboarding__paragraph--no-images-full">
              With smart contracts, the investor can be assured the contractual
              agreement will execute according to the defined conditions. This
              creates a more secure environment and also leads to lower fees
              because no manual process involving human labour is needed.
            </p>
            <div className="Onboarding__static-img-wrapper">
              <img
                src={SmartContract}
                width="199"
                className="Onboarding__img-static"
                alt="MyBit Globe"
              />
            </div>
            <div className="Onboarding__buttons">
              <Button
                className="Onboarding__buttons-next"
                type="primary"
                onClick={this.next}
              >
                How do I invest?{" "}
                <img
                  src={RightArrow}
                  className="Onboarding__buttons-next-arrow"
                  alt="Next Button Arrow"
                />
              </Button>
            </div>
            <Button
              className="Onboarding__buttons-back"
              onClick={this.previous}
            >
              Back
            </Button>
          </Slide>

          <Slide>
            <Link to="/explore" className="Onboarding__btn-close">
              +
            </Link>
            <h1 className="Onboarding__main-title">How do I invest?</h1>
            <p className="Onboarding__paragraph--no-images-full">
              Find an investment you are interested in and choose the amount you
              would like to invest. This will trigger a pop-up in metamask to
              confirm the transaction.
            </p>
            <p className="Onboarding__paragraph--no-images-full">
              It may take several minutes for the Ethereum network to process
              the transaction. Once confirmed, you are now the owner of the
              asset.
            </p>
            <p className="Onboarding__paragraph--no-images-full">
              When it begins generating revenue, you will receive the profits to
              your account in real-time!
            </p>
            <div className="Onboarding__buttons">
              <Button
                className="Onboarding__buttons-next"
                type="primary"
                onClick={this.next}
              >
                How to secure my assets?{" "}
                <img
                  src={RightArrow}
                  className="Onboarding__buttons-next-arrow"
                  alt="Next Button Arrow"
                />
              </Button>
            </div>
            <Button
              className="Onboarding__buttons-back"
              onClick={this.previous}
            >
              Back
            </Button>
          </Slide>

          <Slide>
            <Link to="/explore" className="Onboarding__btn-close">
              +
            </Link>
            <img
              src={Key}
              width="69"
              className="Onboarding__img-key"
              alt="MyBit Globe"
            />
            <h1 className="Onboarding__main-title">
              <span className="Onboarding__main-title--blue">Key</span> security
            </h1>
            <p className="Onboarding__paragraph--no-images-full">
              All of your investments are linked to your metamask <br />
              account. We have no control over it or ability to restore it.{" "}
              <br />
              If you lose your private key or password, it is gone forever.
            </p>
            <h2 className="Onboarding__paragraph-title">
              Follow these steps to avoid loss!
            </h2>
            <ul className="Onboarding__list--key-security">
              <li className="Onboarding__list--key-security-item">
                Make a backup of your private key and password. DO NOT just
                store it on your computer. Print it out on a piece of paper or
                save it to a USB drive.
              </li>
              <li className="Onboarding__list--key-security-item">
                Store this paper or USB drive in a different physical location.
                A backup is not useful if it is destroyed by a fire or flood
                along with your laptop.
              </li>
              <li className="Onboarding__list--key-security-item">
                Do not store your private key in Dropbox, Google Drive, or other
                cloud storage. If that account is compromised, your funds will
                be stolen.
              </li>
              <li className="Onboarding__list-item">
                For added protection,{" "}
                <a
                  href="https://trezor.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  get a hardware wallet
                </a>
                .
              </li>
            </ul>
            <div className="Onboarding__buttons">
              <Button
                className="Onboarding__buttons-next"
                type="primary"
                onClick={this.next}
              >
                Next{" "}
                <img
                  src={RightArrow}
                  className="Onboarding__buttons-next-arrow"
                  alt="Next Button Arrow"
                />
              </Button>
            </div>
            <Button
              className="Onboarding__buttons-back"
              onClick={this.previous}
            >
              Back
            </Button>
          </Slide>

          <Slide>
            <Link to="/explore" className="Onboarding__btn-close">
              +
            </Link>
            <BancorConsumer>
              {({ initBancor }) => (
                <React.Fragment>
                  <img
                    src={SetupGraphic}
                    width="77"
                    className="Onboarding__img-setup"
                    alt="MyBit Globe"
                  />
                  <h1 className="Onboarding__main-title">
                    <span className="Onboarding__main-title--blue">
                      Required
                    </span>{" "}
                    setup
                  </h1>
                  <h2 className="Onboarding__paragraph-title">
                    Before you are able to use the MyBit Go platform, you will
                    need the following:
                  </h2>
                  <p className="Onboarding__paragraph--no-images">
                    MetaMask, a browser extension that turns any ordinary
                    browser into one that can interact with blockchain
                    applications.
                    <a
                      href="http://metamask.io"
                      className="Onboarding__buttons-get"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get MetaMask
                    </a>
                  </p>
                  <p className="Onboarding__paragraph--no-images">
                    Cryptocurrency, such as Ether or DAI, which are the main
                    cryptocurrencies MyBit Go uses to invest in assets; however,
                    many more are supported.{" "}
                    <a
                      href="/bankor"
                      onClick={(e) => {
                        e.preventDefault();
                        initBancor({
                          type: 1,
                          baseCurrencyId: '5937d635231e97001f744267',
                          pairCurrencyId: '5937d635231e97001f744267',
                          primaryColor: '#1890ff',
                          displayCurrency: 'ETH',
                          operation: 'buy',
                        });
                      }}
                    >
                      Get Ether
                    </a>
                  </p>
                  <p className="Onboarding__paragraph--no-images">
                    MyBit Tokens (MYB), the native token that fuels the <br />
                    MyBit Network. Applications such as MyBit Go, which <br />
                    run on the Network, require MYB to use.{" "}
                    <a
                      href="/bankor"
                      onClick={(e) => {
                        e.preventDefault();
                        initBancor();
                      }}
                    >
                      Get MYB
                    </a>
                  </p>
                  <div className="Onboarding__buttons">
                    <Button
                      className="Onboarding__buttons-next"
                      type="primary"
                      onClick={() => this.props.history.push("/explore")}
                    >
                      Get started and explore{" "}
                      <img
                        src={RightArrow}
                        className="Onboarding__buttons-next-arrow"
                        alt="Next Button Arrow"
                      />
                    </Button>
                  </div>
                  <Button
                    className="Onboarding__buttons-back"
                    onClick={this.previous}
                  >
                    Back
                  </Button>
                </React.Fragment>
              )}
            </BancorConsumer>
          </Slide>
        </Carousel>

        <SliderNavigation>
          {SliderNavigationTooltips.map((slideTooltip) => {
            const buttonClass = (
              currentSlide === slideTooltip.slide
                ? 'Onboarding__slider-nav-button active-slide'
                : 'Onboarding__slider-nav-button'
            );
            return (
              <Tooltip
                title={slideTooltip.tooltip}
                overlayClassName="Onboarding__tooltip-inner"
                key={`slideTooltip${slideTooltip.slide}`}
              >
                <Button
                  className={buttonClass}
                  onClick={() => this.goToSlide(slideTooltip.slide)}
                />
              </Tooltip>
            );
          })}
        </SliderNavigation>
      </CarouselWrapper>
    );
  }
}

export default withRouter(OnboardingPage);
