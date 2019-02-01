import Router from 'next/router';
import Link from 'next/link';
import Tooltip from 'antd/lib/tooltip';
import 'antd/lib/tooltip/style/index.css';
import StyledCarouselWithNavigationWrapper from './styledCarouselWithNavigationWrapper';
import StyledCarouselWithNavigationSlide from './styledCarouselWithNavigationSlide';
import StyledCarouselWithNavigationNavButton from './styledCarouselWithNavigationNavButton';
import StyledCarouselWithNavigationCloseButton from './styledCarouselWithNavigationCloseButton';
import StyledCarouselWithNavigation from './styledCarouselWithNavigation';

class CarouselWithNavigation extends React.Component {
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
  }

  previous() {
    this.carousel.prev();
  }

  goToSlide(number) {
    this.carousel.goTo(number, false);
  }

  render() {
    const {
      currentSlide,
    } = this.state;

    const {
      slides,
      navigationTooltips,
      onFinish,
      minWidthStyle,
    } = this.props;

    return (
      <React.Fragment>
        <StyledCarouselWithNavigationWrapper
          minWidthStyle={minWidthStyle}
          slideNumber={currentSlide}
          ref={(node) => { this.carousel = node; }}
          effect="slide"
          dots={false}
          infinite={false}
          beforeChange={(from, to) => {
            return false;
          }}
          afterChange={(current) => {
            this.setState({
              currentSlide: current,
            });
          }}
        >
        {slides.map((Component, index) => (
          <StyledCarouselWithNavigationSlide
            key={index}
            minWidthStyle={minWidthStyle}
          >
            <StyledCarouselWithNavigationCloseButton>
              <Link
                href="/explore"
              >
                +
              </Link>
            </StyledCarouselWithNavigationCloseButton>
            <Component
              next={this.next}
              previous={this.previous}
              goToSlide={this.goToSlide}
              onFinish={onFinish}
            />
          </StyledCarouselWithNavigationSlide>
        ))}
      </StyledCarouselWithNavigationWrapper>
      <StyledCarouselWithNavigation>
        {navigationTooltips.map((slideTooltip) => {
          return (
            <Tooltip
              title={slideTooltip.tooltip}
              key={`slideTooltip${slideTooltip.slide}`}
            >
              <StyledCarouselWithNavigationNavButton
                isActive={currentSlide === slideTooltip.slide}
                onClick={() => this.goToSlide(slideTooltip.slide)}
              />
            </Tooltip>
          );
        })}
      </StyledCarouselWithNavigation>
    </React.Fragment>
  )}
}

export default CarouselWithNavigation;
