import Router from 'next/router';
import CarouselWithNavigation from 'ui/CarouselWithNavigation';

import WhatSlide from 'components/asset-manager/WhatSlide';
import WhySlide from 'components/asset-manager/WhySlide';
import WhoSlide from 'components/asset-manager/WhoSlide';
import HowIncentivisedSlide from 'components/asset-manager/HowIncentivisedSlide';
import HowJobSlide from 'components/asset-manager/HowJobSlide';

const slides = [{
  Component: WhatSlide,
  buttons: {
    hasNextButton: true,
    hasBackButton: false,
    nextButtonText: 'Next',
  }
}, {
  Component: WhySlide,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'Next',
  }
}, {
  Component: WhoSlide,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'Next',
  }
}, {
  Component: HowIncentivisedSlide,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'Next',
  }
}, {
  Component: HowJobSlide,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'Get Started',
  }
}];



const SliderNavigationTooltips = [
  { slide: 0, tooltip: "KYC" },
  { slide: 1, tooltip: "Location" },
  { slide: 2, tooltip: "Select Asset" },
  { slide: 3, tooltip: "Asset Location" },
  { slide: 4, tooltip: "Supporting Documents" },
]

const AssetManager = () => (
  <React.Fragment>
    <CarouselWithNavigation
      redirectOnClose={{
        href: 'list-asset',
        as: 'list-asset',
      }}
      navigationTooltips={SliderNavigationTooltips}
      slides={slides}
      onFinish={() => Router.push("/list-asset")}
      maxWidthDesktop="550px"
      nextButtonHasArrow
    />
  </React.Fragment>
);

export default AssetManager;
