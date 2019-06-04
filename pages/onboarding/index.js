import CarouselWithNavigation from 'ui/CarouselWithNavigation';
import {
  Slides,
} from './slides';
import Router from 'next/router';

const SliderNavigationTooltips = [
  { slide: 0, tooltip: 'What is MyBit Go?' },
  { slide: 1, tooltip: 'What can you use MyBit Go for?' },
  { slide: 2, tooltip: 'What it isn\'t?' },
  { slide: 3, tooltip: 'What is blockchain?' },
  { slide: 4, tooltip: 'What are the benefits?' },
  { slide: 5, tooltip: 'What is Ethereum?' },
  { slide: 6, tooltip: 'Smart contracts' },
  { slide: 7, tooltip: 'How do I invest?' },
  { slide: 8, tooltip: 'How to secure my assets?' },
  { slide: 9, tooltip: 'Required setup' },
];

class OnboardingPage extends React.Component {
  static async getInitialProps (ctx) {
    if(ctx.req){
      return {redirectTo: ctx.query.redirectTo};
    } else {
      return {};
    }
  }

  componentDidMount = () => {
    const {
      redirectTo,
    } = this.props;
    // When we redirect to this page on the server the
    // URL doesn't actually update. We already have
    // onboarding.js at this point so its inconsequent.
    // until a fix is found at least.
    if(window && redirectTo) {
      Router.push('/onboarding');
    }

    this.firstLocation = redirectTo || {
      href:'/explore',
      as: '/explore',
    };
  }
  finishOnboarding = () => {
    Router.push(this.firstLocation.href, this.firstLocation.as);
  }

  render() {
    return (
      <React.Fragment>
        <CarouselWithNavigation
          redirectOnClose={this.firstLocation}
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
