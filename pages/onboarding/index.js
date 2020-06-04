import CarouselWithNavigation from 'ui/CarouselWithNavigation';
import Router from 'next/router';
import BancorProvider from 'components/BancorContext';
import Welcome from "./slides/welcome";
import NextGeneration from "./slides/nextGeneration";
import InvestmentFund from "./slides/investmentFund";
import Blockchain from "./slides/blockchain";
import Benefits from "./slides/benefits";
import Ethereum from "./slides/ethereum";
import SmartContracts from "./slides/smartContracts";
import Invest from "./slides/invest";
import Security from "./slides/security";
import RequiredSetup from "./slides/requiredSetup";

const Slides = [{
  Component: Welcome,
  buttons: {
    hasNextButton: true,
    hasBackButton: false,
    nextButtonText: 'More on MyBit Go',
  }
}, {
  Component: NextGeneration,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: `What it isn't`,
  }
}, {
  Component: InvestmentFund,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'What is blockchain?',
  }
}, {
  Component: Blockchain,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'Next',
  }
}, {
  Component: Benefits,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'What is Ethereum?',
  }
}, {
  Component: Ethereum,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'Smart contracts',
  }
}, {
  Component: SmartContracts,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'How do I invest?',
  }
}, {
  Component: Invest,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'How to secure my assets?',
  }
}, {
  Component: Security,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'Next',
  }
}, {
  Component: RequiredSetup,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'Get started and explore',
  }
}];

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
    this.firstLocation = redirectTo;
    // The path / should redirect to /explore, user's first visit for example
    if(!redirectTo || (redirectTo && redirectTo.href === '/' && redirectTo.as === '/')) {
      this.firstLocation = {
        href:'/explore',
        as: '/explore',
      };
    }
  }

  finishOnboarding = () => {
    Router.push(this.firstLocation.href, this.firstLocation.as);
  }

  render() {
    return (
      <React.Fragment>
        <BancorProvider>
          <CarouselWithNavigation
            redirectOnClose={this.firstLocation}
            navigationTooltips={SliderNavigationTooltips}
            slides={Slides}
            onFinish={this.finishOnboarding}
            maxWidthDesktop="600px"
            nextButtonHasArrow
          />
        </BancorProvider>
      </React.Fragment>
    )
  }
}

export default OnboardingPage;
