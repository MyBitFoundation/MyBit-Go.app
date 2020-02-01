import PortfolioModule from 'components/PortfolioModule';
import Portfolio from 'components/Portfolio';
import { withMetamaskErrors } from 'components/MetamaskErrors';
import {
  PortfolioTypes,
} from 'constants/portfolioTypes';
import { withRouter } from 'next/router';

class PortfolioPage extends React.Component {
  render(){
    const type = this.props.router.query.type || PortfolioTypes.INVESTMENTS;
    return (
      <PortfolioModule>
        {props => <Portfolio {...props} type={type}/>}
      </PortfolioModule>
    );
  }
}

export default withRouter(withMetamaskErrors(PortfolioPage, false));
