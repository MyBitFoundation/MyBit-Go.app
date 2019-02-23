import Router from 'next/router';
import Link from 'next/link';
import {
  Tooltip,
  Icon,
} from 'antd';
import StyledCarouselWithNavigationWrapper from './styledCarouselWithNavigationWrapper';
import StyledCarouselWithNavigationSlide from './styledCarouselWithNavigationSlide';
import StyledCarouselWithNavigationNavButton from './styledCarouselWithNavigationNavButton';
import StyledCarouselWithNavigationCloseButton from './styledCarouselWithNavigationCloseButton';
import StyledCarouselWithNavigationNav from './styledCarouselWithNavigationNav';
import StyledCarouselWithNavigationButtons from './styledCarouselWithNavigationButtons';
import StyledCarouselWithNavigationButton from './styledCarouselWithNavigationButton';
import StyledCarouselWithNavigationArrow from './styledCarouselWithNavigationArrow';
import StyledCarouselWithNavigation from './styledCarouselWithNavigation';
import RightArrow from '../../static/onboarding/arrow-right.png';

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
      maxWidthDesktop,
      desktopAt,
      nextButtonHasArrow,
    } = this.props;

    const {
      hasBackButton,
      hasNextButton,
      nextButtonText,
      hasOneButton,
      nextButtonDisabled,
      isCivicButton,
      nextButtonHandler,
      nextButtonLoading,
    } = slides[currentSlide].buttons;

    const {
      error,
      hideButtons,
    } = slides[currentSlide];

    const hasTwoButtons = hasNextButton && hasBackButton;

    return (
      <StyledCarouselWithNavigation
        desktopAt={desktopAt}
        maxWidthDesktop={maxWidthDesktop}
      >
        <StyledCarouselWithNavigationCloseButton>
          <Link
            href="/explore"
          >
            <a>+</a>
          </Link>
        </StyledCarouselWithNavigationCloseButton>
        <StyledCarouselWithNavigationWrapper
          desktopAt={desktopAt}
          maxWidthDesktop={maxWidthDesktop}
          slideNumber={currentSlide}
          ref={(node) => { this.carousel = node; }}
          effect="slide"
          dots={false}
          infinite={false}
          swipe={false}
          afterChange={(to) => {
            this.setState({
              currentSlide: to,
            });
          }}
        >
        {slides.map(({Component, toRender}, index) => {
          return (
            <StyledCarouselWithNavigationSlide
              key={index}
              maxWidthDesktop={maxWidthDesktop}
              desktopAt={desktopAt}
            >
              {Component && (
                <Component
                  goToSlide={this.goToSlide}
                  onFinish={onFinish}
                />
              )}
              {toRender}
            </StyledCarouselWithNavigationSlide>
          )}
        )}
      </StyledCarouselWithNavigationWrapper>
      <StyledCarouselWithNavigationNav
        hideAt={desktopAt}
      >
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
      </StyledCarouselWithNavigationNav>
      {(!error && !hideButtons) && (
        <StyledCarouselWithNavigationButtons
          desktopAt={desktopAt}
          hasOneButton={!hasTwoButtons}
          hasTwoButtons={hasTwoButtons}
        >
          {hasBackButton && (
          <StyledCarouselWithNavigationButton
            key={`${nextButtonText} ${currentSlide} 'back'`}
            onClick={this.previous}
            desktopAt={desktopAt}
            isBack
          >
            Back
          </StyledCarouselWithNavigationButton>
          )}
          {hasNextButton && (
            <StyledCarouselWithNavigationButton
              key={`${nextButtonText} ${currentSlide} 'next'`}
              desktopAt={desktopAt}
              type="primary"
              onClick={nextButtonHandler ? nextButtonHandler : currentSlide === slides.length - 1 ? onFinish : this.next}
              disabled={nextButtonDisabled}
              isCivicButton={isCivicButton}
              loading={nextButtonLoading}
              isNext
            >
              {(nextButtonDisabled && 'All fields are required') || (nextButtonText || 'Next')}
              {!nextButtonLoading && <Icon type="right" />}
            </StyledCarouselWithNavigationButton>
          )}
        </StyledCarouselWithNavigationButtons>
      )}
    </StyledCarouselWithNavigation>
  )}
}

export default CarouselWithNavigation;
