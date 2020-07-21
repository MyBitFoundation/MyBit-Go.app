import PortfolioModule from 'components/PortfolioModule';
import Portfolio from 'components/Portfolio';
import { withMetamaskErrors } from 'components/MetamaskErrors';
import {
  PortfolioTypes,
} from 'constants/portfolioTypes';

class PortfolioPage extends React.Component {
  static getInitialProps (ctx) {
    if(!ctx.query.type){
      return {type: PortfolioTypes.INVESTMENTS};
    }
    return {type: ctx.query.type};
  }

  render(){
  	return(
  		<PortfolioModule>
  	   {props => <Portfolio {...props} type={this.props.type}/>}
      </PortfolioModule>
  	)
  }
}

export default withMetamaskErrors(PortfolioPage, false);
