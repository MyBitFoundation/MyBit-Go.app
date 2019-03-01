import PortfolioModule from 'components/PortfolioModule';
import Portfolio from 'components/Portfolio';

const PortfolioPage = () => (
  <PortfolioModule>
    {props => <Portfolio {...props}/>}
  </PortfolioModule>
);

export default PortfolioPage;
