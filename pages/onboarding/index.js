import CarouselWithNavigation from 'ui/CarouselWithNavigation';
import Router from 'next/router';
import BancorProvider from 'components/BancorContext';

import WelcomeSlide from 'components/onboarding/WelcomeSlide';
import NextGenerationSlide from 'components/onboarding/NextGenerationSlide';
import InvestmentFundSlide from 'components/onboarding/InvestmentFundSlide';
import BlockchainSlide from 'components/onboarding/BlockchainSlide';
import BenefitsSlide from 'components/onboarding/BenefitsSlide';
import EthereumSlide from 'components/onboarding/EthereumSlide';
import SmartContractsSlide from 'components/onboarding/SmartContractsSlide';
import InvestSlide from 'components/onboarding/InvestSlide';
import SecuritySlide from 'components/onboarding/SecuritySlide';
import RequiredSetupSlide from 'components/onboarding/RequiredSetupSlide';

const slides = [{
  Component: WelcomeSlide,
  buttons: {
    hasNextButton: true,
    hasBackButton: false,
    nextButtonText: 'More on MyBit Go',
  }
}, {
  Component: NextGenerationSlide,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: `What it isn't`,
  }
}, {
  Component: InvestmentFundSlide,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'What is blockchain?',
  }
}, {
  Component: BlockchainSlide,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'Next',
  }
}, {
  Component: BenefitsSlide,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'What is Ethereum?',
  }
}, {
  Component: EthereumSlide,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'Smart contracts',
  }
}, {
  Component: SmartContractsSlide,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'How do I invest?',
  }
}, {
  Component: InvestSlide,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'How to secure my assets?',
  }
}, {
  Component: SecuritySlide,
  buttons: {
    hasNextButton: true,
    hasBackButton: true,
    nextButtonText: 'Next',
  }
}, {
  Component: RequiredSetupSlide,
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
            slides={slides}
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
