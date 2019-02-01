import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import Carousel from 'antd/lib/carousel';
import { CarouselWrapper, SliderNavigation } from '../UI/AssetManagerPage/styledAssetManagerPage'
import * as Slides from '../UI/AssetManagerPage'

class AssetManagerPage extends React.Component {
  constructor(props) {
    super(props)
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.goToSlide = this.goToSlide.bind(this)
    this.state = {
        currentSlide: 0,
    }
  }

  getCurrentSlide = () => {
    setTimeout(() => {
      let activeSlide = parseInt(
        document.getElementsByClassName('slick-current')[0]
          .getAttribute('data-index')
      );
      this.setState({ currentSlide: activeSlide })
    }, 25);
  }

  next() {
    this.carousel.next();
    this.getCurrentSlide();
  }

  previous() {
    this.carousel.prev();
    this.getCurrentSlide();
  }

  goToSlide(number) {
    this.carousel.goTo(number, false);
    this.getCurrentSlide();
  }

  render() {
    const { currentSlide } = this.state;
    return (
      <CarouselWrapper>
        <Carousel ref={node => this.carousel = node} infinite={false} effect="slide" dots={false} swipe={false} accessibility={false} >
          <Slides.WhatSlide next={this.next} />
          <Slides.WhySlide next={this.next} previous={this.previous} />
          <Slides.WhoSlide next={this.next} previous={this.previous} />
          <Slides.HowSlide next={this.next} previous={this.previous} />
          <Slides.HowSlideLast next={() => this.props.history.push("/list-asset")} previous={this.previous} />
        </Carousel>

        <SliderNavigation>
          {
            SliderNavigationTooltips.map(slideTooltip => {
              const buttonType = currentSlide === slideTooltip.slide ? "primary" : "secondary";
              return (
                <Tooltip title={slideTooltip.tooltip} key={`slideTooltip${slideTooltip.slide}`} >
                  <Button
                    type={buttonType}
                    className="ListAsset-nav-button"
                    shape="circle"
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
]

export default withRouter(AssetManagerPage);
