import PortfolioModule from 'components/PortfolioModule';
import Portfolio from 'components/Portfolio';
import { withMetamaskErrors } from 'components/MetamaskErrors';

const PortfolioPage = () => (
  <PortfolioModule>
    {props => <Portfolio {...props}/>}
  </PortfolioModule>
);

export default withMetamaskErrors(PortfolioPage, false);
