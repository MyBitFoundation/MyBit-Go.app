import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import Carousel from 'antd/lib/carousel';
import { CarouselWrapper, SliderNavigation, Slide, IntroList } from '../UI/OnboardingPage/styledListAssetPage'
import * as Slides from '../UI/ListAssetSlides'

class ListAssetPage extends React.Component {
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

    handleSelectChange(value) {
        console.log(`Select ${value}`);
    }

    handleInputChange(e) {
        console.log(e.target.name + " " + e.target.value);
    }

    onSliderChange = (value) => {
        console.log("Slider ", value);
    }

    render() {
        const { currentSlide } = this.state;
        return (
            <CarouselWrapper>
                <Carousel ref={node => this.carousel = node} effect="slide" dots={false} >
                    <Slides.IntroSlide next={this.next} />
                    <Slides.LocationSlide next={this.next} handleSelectChange={this.handleSelectChange} handleInputChange={this.handleInputChange} />
                    <Slides.AvailableAssetsSlide next={this.next} handleSelectChange={this.handleSelectChange} handleInputChange={this.handleInputChange} />
                    <Slides.AssetLocationSlide next={this.next} handleSelectChange={this.handleSelectChange} handleInputChange={this.handleInputChange} />
                    <Slides.UploadSlide next={this.next} />
                    <Slides.FeeSlide next={this.next} handleInputChange={this.handleInputChange} onSliderChange={this.onSliderChange} />
                </Carousel>

                <SliderNavigation>
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
                </SliderNavigation>
            </CarouselWrapper>
        );
    }
}


const SliderNavigationTooltips = [
    { slide: 0, tooltip: "What is MyBit Go?" },
    { slide: 1, tooltip: "What can you use MyBit Go for?" },
    { slide: 2, tooltip: "What it isn't?" },
]

export default withRouter(ListAssetPage);
