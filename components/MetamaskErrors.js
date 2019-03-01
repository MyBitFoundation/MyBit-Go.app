import { withMetamaskContext } from 'components/MetamaskChecker'
import ErrorPage from 'components/ErrorPage';

export const withMetamaskErrors = (Component, shouldRenderComponent = true) => {
  return class withMetamaskErrors extends React.Component{
    render(){
      return (
        <MetamaskErrors
          shouldRenderComponent={shouldRenderComponent}
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
}) => {
  const metamaskErrors = metamaskContext.metamaskErrors();
  let childrenToRender = children;
  if(metamaskErrors.error && !shouldRenderComponent){
    childrenToRender = null;
  }
  return (
  <React.Fragment>
    {childrenToRender}
    {metamaskErrors.error && (
      <ErrorPage
        title="Metamask"
        description={metamaskErrors.render}
      />
    )}
  </React.Fragment>
)})
