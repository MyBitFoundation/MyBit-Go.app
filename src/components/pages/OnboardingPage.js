import React from 'react';
import Carousel from 'antd/lib/carousel';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import '../../styles/OnboardingPage.css';
import MyBitGoLogo from '../../images/onboarding/MyBitGoLogo.png';
import MyBitGlobe from '../../images/onboarding/onboarding_globe.png';
import MyBitDesk from '../../images/onboarding/onboarding_desk.png';

class OnboardingPage extends React.Component {
    constructor(props) {
        super(props)
        this.next = this.next.bind(this)
        this.previous = this.previous.bind(this)
        this.goToSlide = this.goToSlide.bind(this)
        this.state = {
          currentSlide: 0
        }
    }

    next() {
        this.carousel.next();
        this.setState(function(state) {
            return {
                currentSlide: state.currentSlide + 1
            }
        })
    }

    previous() {
        this.carousel.prev();
        this.setState(function(state) {
            return {
                currentSlide: state.currentSlide - 1
            }
        })
    }

    goToSlide(number) {
        this.carousel.goTo(number, false);
        this.setState(function() {
            return {
                currentSlide: number
            }
        })
    }

    render() {
        const { currentSlide } = this.state;
        console.log(currentSlide)
        return (
            <div>
                <Carousel ref={node => this.carousel = node} effect="slide" dots={false} >
                    <div key={1} className="Onboarding__slide">
                        <img src={MyBitGoLogo} className="Onboarding__mybit-logo" alt="MyBit Logo" />
                        <h1 className="Onboarding__main-title">Welcome to MyBit Go</h1>
                        <p className="Onboarding__paragraph">
                            We bring power and control back to you. <br />Invest without a bank, broker, fund or <br />third-party,
                            putting the power back in your <br />hands.
                        </p>
                        <h2 className="Onboarding__paragraph-title">What is MyBit Go?</h2>
                        <p className="Onboarding__paragraph width-80">
                            MyBit Go is a secure investment platform available to anyone.
                            We enable users to directly invest without the need of a broker or third-party,
                            while receiving the revenue in real-time.
                        </p>
                        <p className="Onboarding__paragraph width-80">
                            You actually own and control your investments(unlike stocks) and, likewise,
                            you and only you are responsible for your security.
                        </p>
                        <Button className="Onboarding__next-button" onClick={this.next}>
                          What is MyBit Go? <span className="Onboarding__next-button-arrow">></span>
                        </Button>
                    </div>

                    <div key={2} className="Onboarding__slide">
                        <img src={MyBitGlobe} className="Onboarding__mybit-logo" alt="MyBit Globe" />
                        <h1 className="Onboarding__main-title">
                          The <span className="Onboarding__main-title-blue">next generation</span> <br />investment portal
                        </h1>
                        <h2 className="Onboarding__paragraph-title">What is MyBit Go?</h2>
                        <h3>text soon</h3>
                        <Button className="Onboarding__next-button" onClick={this.next}>
                          What it isn't? <span className="Onboarding__next-button-arrow">></span>
                        </Button>
                        <Button className="Onboarding__back-button" onClick={this.previous}>Back</Button>
                    </div>

                    <div key={3} className="Onboarding__slide">
                        <img src={MyBitDesk} className="Onboarding__mybit-logo" alt="MyBit Globe" />
                        <h1 className="Onboarding__main-title">
                          It is <span className="Onboarding__main-title-red">not</span> an <br /> investment fund
                        </h1>
                        <h3>text soon</h3>
                        <Button className="Onboarding__next-button" onClick={this.next}>
                          What is blockchain? <span className="Onboarding__next-button-arrow">></span>
                        </Button>
                        <Button className="Onboarding__back-button" onClick={this.previous}>Back</Button>
                    </div>

                    <div key={4} className="Onboarding__slide">
                        <h1 className="Onboarding__main-title">
                          What is <span className="Onboarding__main-title-blue">blackchain?</span>
                        </h1>
                        <h3>text soon</h3>
                        <Button className="Onboarding__next-button" onClick={this.next}>
                          Next <span className="Onboarding__next-button-arrow">></span>
                        </Button>
                        <Button className="Onboarding__back-button" onClick={this.previous}>Back</Button>
                    </div>

                    <div key={5} className="Onboarding__slide">
                        <h1 className="Onboarding__main-title">
                          What are the <span className="Onboarding__main-title-blue">benefits?</span>
                        </h1>
                        <h3>text soon</h3>
                        <img src={MyBitGoLogo} className="Onboarding__img" alt="MyBit Globe" />
                        <Button className="Onboarding__next-button" onClick={this.next}>
                          What is Ethereum? <span className="Onboarding__next-button-arrow">></span>
                        </Button>
                        <Button className="Onboarding__back-button" onClick={this.previous}>Back</Button>
                    </div>

                    <div key={6} className="Onboarding__slide">
                        <h1 className="Onboarding__main-title">
                          Ethereum
                        </h1>
                        <h3>text soon</h3>
                        <img src={MyBitGoLogo} className="Onboarding__img" alt="MyBit Globe" />
                        <Button className="Onboarding__next-button" onClick={this.next}>
                          Smart contracts <span className="Onboarding__next-button-arrow">></span>
                        </Button>
                        <Button className="Onboarding__back-button" onClick={this.previous}>Back</Button>
                    </div>

                    <div key={7} className="Onboarding__slide">
                        <h1 className="Onboarding__main-title">
                          Smart <span className="Onboarding__main-title-blue">contracts</span>
                        </h1>
                        <h3>text soon</h3>
                        <img src={MyBitGoLogo} className="Onboarding__img" alt="MyBit Globe" />
                        <Button className="Onboarding__next-button" onClick={this.next}>
                          How do I invest? <span className="Onboarding__next-button-arrow">></span>
                        </Button>
                        <Button className="Onboarding__back-button" onClick={this.previous}>Back</Button>
                    </div>

                    <div key={8} className="Onboarding__slide">
                        <h1 className="Onboarding__main-title">
                          How do I invest?
                        </h1>
                        <h3>text soon</h3>
                        <Button className="Onboarding__next-button" onClick={this.next}>
                          How to secure my assets? <span className="Onboarding__next-button-arrow">></span>
                        </Button>
                        <Button className="Onboarding__back-button" onClick={this.previous}>Back</Button>
                    </div>

                    <div key={9} className="Onboarding__slide">
                        <img src={MyBitDesk} className="Onboarding__mybit-logo" alt="MyBit Globe" />
                        <h1 className="Onboarding__main-title">
                          <span className="Onboarding__main-title-blue">Key</span> security
                        </h1>
                        <h3>text soon</h3>
                        <Button className="Onboarding__next-button" onClick={this.next}>
                          How do I invest? <span className="Onboarding__next-button-arrow">></span>
                        </Button>
                        <Button className="Onboarding__back-button" onClick={this.previous}>Back</Button>
                    </div>

                    <div key={10} className="Onboarding__slide">
                        <img src={MyBitDesk} className="Onboarding__mybit-logo" alt="MyBit Globe" />
                        <h1 className="Onboarding__main-title">
                          <span className="Onboarding__main-title-blue">Required</span> setup
                        </h1>
                        <h3>text soon</h3>
                        <Button className="Onboarding__next-button" onClick={() => this.goToSlide(0)}>
                          Get started and explore <span className="Onboarding__next-button-arrow">></span>
                        </Button>
                        <Button className="Onboarding__back-button" onClick={this.previous}>Back</Button>
                    </div>
                </Carousel>

                <div className="Onboarding__slider-navigation">
                    {
                        SliderNavigationTooltips.map(slideTooltip => {
                            const buttonClass = currentSlide === slideTooltip.slide 
                                ? "Onboarding__slider-nav-button active-slide" 
                                : "Onboarding__slider-nav-button";
                            return (
                                <Tooltip title={slideTooltip.tooltip} 
                                    overlayClassName="Onboarding__tooltip-inner" 
                                    key={`slideTooltip${slideTooltip.slide}`}
                                >
                                    <Button className={buttonClass} onClick={() => this.goToSlide(slideTooltip.slide)} />
                                </Tooltip>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

const SliderNavigationTooltips = [
    { slide: 0, tooltip: "What is MyBit Go?" },
    { slide: 1, tooltip: "What can you use MyBit Go for?" },
    { slide: 2, tooltip: "What it isn't?" },
    { slide: 3, tooltip: "What is blockain?" },
    { slide: 4, tooltip: "What are the benefits?" },
    { slide: 5, tooltip: "What is Ethereum?" },
    { slide: 6, tooltip: "Smart contracts" },
    { slide: 7, tooltip: "How do I invest?" },
    { slide: 8, tooltip: "How to secure my assets?" },
    { slide: 9, tooltip: "Required setup" }
]


export default OnboardingPage;
