import PortfolioModule from 'components/PortfolioModule';
import Portfolio from 'components/Portfolio';
import { withMetamaskErrors } from 'components/MetamaskErrors';
import {
  PortfolioTypes,
} from 'constants/portfolioTypes';

class PortfolioPage extends React.Component {


  render() {
    return (
      <PortfolioModule>
        {props => <Portfolio {...props} type={this.props.type} />}
      </PortfolioModule>
    )
  }
}

export const getInitialProps = (ctx) => {
  if (!ctx.query.type) {
    return { props: { type: PortfolioTypes.INVESTMENTS } };
  }
  return { pros: { type: ctx.query.type } };
}
export default withMetamaskErrors(PortfolioPage, false);
