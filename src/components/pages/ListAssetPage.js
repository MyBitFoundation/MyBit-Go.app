import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import Carousel from 'antd/lib/carousel';
import { CarouselWrapper, SliderNavigation } from '../UI/OnboardingPage/styledListAssetPage'
import * as Slides from '../UI/ListAssetSlides'

class ListAssetPage extends React.Component {
    constructor(props) {
        super(props)
        this.disableButtons = this.disableButtons.bind(this)
        this.next = this.next.bind(this)
        this.previous = this.previous.bind(this)
        this.goToSlide = this.goToSlide.bind(this)
        this.state = {
            buttonsDisabled: false,
            currentSlide: 0
        }
    }

    next() {
        this.disableButtons();
        this.carousel.next();
        this.setState(function(state) {
            return {
                currentSlide: state.currentSlide + 1
            }
        })
    }

    disableButtons() {
        this.setState({ buttonsDisabled: true });
        setTimeout( () => { 
            this.setState({ buttonsDisabled: false });
        }, 325);
    }

    previous() {
        this.disableButtons();
        this.carousel.prev();
        this.setState(function(state) {
            return {
                currentSlide: state.currentSlide - 1
            }
        })
    }

    goToSlide(number) {
        this.disableButtons();
        this.carousel.goTo(number, false);
        this.setState(function() {
            return {
                currentSlide: number
            }
        })
    }

    handleSelectChange(value) {
        console.log(`Select ${value}`);
    }

    handleInputChange(e) {
        console.log(e.target.name + " " + e.target.value);
    }

    onSliderChange = (value) => {
        console.log("Slider ", value);
    }

    confirmAsset = () => {
        this.props.history.push('/explore')
    }

    render() {
        const { currentSlide, buttonsDisabled } = this.state;
        return (
            <CarouselWrapper>
                {currentSlide !== 0 &&
                    <Button type="secondary" onClick={this.previous} 
                        className="Slider__back-button" disabled={buttonsDisabled}>
                        Back
                    </Button>
                }
                <Carousel ref={node => this.carousel = node} effect="slide" dots={false} >
                    <Slides.IntroSlide 
                        next={this.next} 
                        buttonsDisabled={buttonsDisabled} 
                    />
                    <Slides.LocationSlide 
                        next={this.next} 
                        handleSelectChange={this.handleSelectChange} 
                        handleInputChange={this.handleInputChange} 
                        buttonsDisabled={buttonsDisabled}
                    />
                    <Slides.AvailableAssetsSlide 
                        next={this.next} 
                        handleSelectChange={this.handleSelectChange} 
                        handleInputChange={this.handleInputChange}
                        buttonsDisabled={buttonsDisabled}
                    />
                    <Slides.AssetLocationSlide 
                        next={this.next} 
                        handleSelectChange={this.handleSelectChange} 
                        handleInputChange={this.handleInputChange} 
                        buttonsDisabled={buttonsDisabled}
                    />
                    <Slides.UploadSlide 
                        next={this.next}
                        buttonsDisabled={buttonsDisabled}
                    />
                    <Slides.FeeSlide 
                        next={this.next} 
                        handleInputChange={this.handleInputChange} 
                        onSliderChange={this.onSliderChange}
                        buttonsDisabled={buttonsDisabled}
                    />
                    <Slides.CollateralSlide 
                        next={this.next} 
                        handleInputChange={this.handleInputChange} 
                        onSliderChange={this.onSliderChange} 
                        buttonsDisabled={buttonsDisabled}
                    />
                    <Slides.ConfirmAsset 
                        next={this.next} 
                        confirmAsset={this.confirmAsset}
                        buttonsDisabled={buttonsDisabled}
                    />
                </Carousel>

                <SliderNavigation>
                    {
                        SliderNavigationTooltips.map(slideTooltip => {
                            const buttonType = currentSlide === slideTooltip.slide ? "primary" : "secondary";
                            return (
                                <Tooltip title={slideTooltip.tooltip} key={`slideTooltip${slideTooltip.slide}`}>
                                    <Button 
                                        type={buttonType} 
                                        className="ListAsset-nav-button" 
                                        shape="circle"
                                        disabled={buttonsDisabled}
                                        onClick={() => this.goToSlide(slideTooltip.slide)} 
                                    />
                                </Tooltip>
                            )
                        })
                    }
                </SliderNavigation>
            </CarouselWrapper>
        );
    }
}

const SliderNavigationTooltips = [
    { slide: 0, tooltip: "KYC" },
    { slide: 1, tooltip: "Location" },
    { slide: 2, tooltip: "Select Asset" },
    { slide: 3, tooltip: "Asset Location" },
    { slide: 4, tooltip: "Supporting Documents" },
    { slide: 5, tooltip: "Management Fee" },
    { slide: 6, tooltip: "Asset Collateral" },
    { slide: 7, tooltip: "Confirm Asset" }
]

export default withRouter(ListAssetPage);
