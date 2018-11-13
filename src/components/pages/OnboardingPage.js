import React from 'react';
import Carousel from 'antd/lib/carousel';
import Button from 'antd/lib/button';
import '../../styles/OnboardingPage.css';
import MyBitGoLogo from '../../images/onboarding/MyBitGoLogo.png';

class OnboardingPage extends React.Component {
    constructor(props) {
        super(props)
        this.next = this.next.bind(this)
        this.previous = this.previous.bind(this)
        this.goToSlide = this.goToSlide.bind(this)
    }

    next() {
        this.carousel.next();
    }

    previous() {
        this.carousel.prev();
    }

    goToSlide(number) {
        this.carousel.goTo(number, false);
    }

    render() {
        return (
            <div>
                <Carousel ref={node => this.carousel = node} effect="fade">
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
                        <Button className="Onboarding__next-button" onClick={this.next}>What is MyBit Go? ></Button>
                    </div>

                    <div key={2}><h3>2</h3></div>
                    <div key={3}><h3>3</h3></div>
                    <div key={4}><h3>4</h3></div>
                    <div key={5}><h3>5</h3></div>
                    <div key={6}><h3>6</h3></div>
                </Carousel>
                <div style={{ textAlign: 'center', marginTop: "50px" }}>
                    <button className='button' onClick={this.previous}>Previous</button>
                    <button className='button' onClick={this.next}>Next</button>
                    <button className='button' onClick={() => this.goToSlide(0)}>0</button>
                </div>
            </div>
        );
    }
}


export default OnboardingPage;


