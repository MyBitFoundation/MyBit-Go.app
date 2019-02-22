import Router from 'next/router';
import CarouselWithNavigation from 'ui/CarouselWithNavigation';
import {
  Slides,
} from './slides';

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

const getFirstLocation = () => {
  const onboardingIsFinished = localStorage.getItem('onboardingFinished');
  const location = onboardingIsFinished ? '/explore' : localStorage.getItem('onboardingRedirect');
  return location === '/onboarding' ? '/explore' : location;
}

class OnboardingPage extends React.Component {

  finishOnboarding = () => {
    const firstLocation = getFirstLocation();
    if (localStorage.getItem('onboardingFinished') === null) {
      localStorage.setItem('onboardingFinished', 'true');
    }
    Router.push(firstLocation);
  }

  render() {
    return (
      <React.Fragment>
        <CarouselWithNavigation
          navigationTooltips={SliderNavigationTooltips}
          slides={Slides}
          onFinish={this.finishOnboarding}
          maxWidthDesktop="600px"
          nextButtonHasArrow
        />
      </React.Fragment>
    )
  }
}

export default OnboardingPage;
