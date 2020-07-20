import Welcome from './welcome'
import NextGeneration from './nextGeneration';
import InvestmentFund from './investmentFund';
import Blockchain from './blockchain';
import Benefits from './benefits';
import Ethereum from './ethereum';
import SmartContracts from './smartContracts';
import Invest from './invest';
import Security from './security';
import RequiredSetup from './requiredSetup';

export const Slides = [{
  Component: Welcome,
  buttons: {
    hasNextButton: true,
    hasBackButton: false,
    nextButtonText: 'More on MyBit',
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
