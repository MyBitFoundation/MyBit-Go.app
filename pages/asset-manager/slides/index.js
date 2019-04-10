import What from './what';
import Why from './why';
import Who from './who';
import HowIncentivised from './howIncentivised';
import HowJob from './howJob';

export const Slides = [{
  Component: What,
  buttons: {
    hasNextButton: true,
    hasBackButton: false,
    nextButtonText: 'Next',
  }
}, {
  Component: Why,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'Next',
  }
}, {
  Component: Who,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'Next',
  }
}, {
  Component: HowIncentivised,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'Next',
  }
}, {
  Component: HowJob,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'Get Started',
  }
}];
