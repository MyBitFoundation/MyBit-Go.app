import Router from 'next/router';
import { withMetamaskContext } from 'components/MetamaskChecker'
import ErrorPage from 'components/ErrorPage';
import {
  Button,
} from 'antd';
import BackButton from 'ui/BackButton';

export const withMetamaskErrors = (Component, shouldRenderComponent = true, hasBackButton = false) => {
  return class withMetamaskErrors extends React.Component{
    render(){
      return (
        <MetamaskErrors
          shouldRenderComponent={shouldRenderComponent}
          hasBackButton={hasBackButton}
        >
          <Component {...this.props}/>
        </MetamaskErrors>
      )
    }
  }
}

const MetamaskErrors = withMetamaskContext(({
  children,
  metamaskContext,
  shouldRenderComponent = true,
  hasBackButton = false,
}) => {
  const metamaskErrors = metamaskContext.metamaskErrors();
  let childrenToRender = children;
  if(metamaskErrors.error && !shouldRenderComponent){
    childrenToRender = null;
  }
  return (
  <React.Fragment>
    {(metamaskErrors.error && hasBackButton) && <BackButton />}
    {childrenToRender}
    {metamaskErrors.error && (
      <ErrorPage
        title="Metamask"
        description={metamaskErrors.render}
      />
    )}
  </React.Fragment>
)})
