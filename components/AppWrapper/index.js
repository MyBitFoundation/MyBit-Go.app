import { withRouter } from 'next/router'
import AppHeader from 'components/AppHeader';
import NavigationBar from 'ui/NavigationBar';
import { withBlockchainContext } from 'components/Blockchain'
import { withMetamaskContext } from 'components/MetamaskChecker'
import PageWrapper from './pageWrapper';
import {
  navbarOptions,
} from 'constants';

const AppWrapper = React.memo(({
  metamaskContext,
  blockchainContext,
  children,
  router,
  isFullScreenPage,
  handleMobileMenuState,
}) => {
  const {
    prices,
  } = blockchainContext;

  const {
    isReadOnlyMode,
    user,
  } = metamaskContext;

  const{
    route: currentPath,
  } = router;

  return (
    <React.Fragment>
      <AppHeader
        readOnlyMode={isReadOnlyMode}
        user={user}
        prices={prices}
        hideOnMobile={isFullScreenPage}
        currentPath={currentPath}
        handleMobileMenuState={handleMobileMenuState}
      />
      <NavigationBar
        items={navbarOptions}
        currentPath={currentPath}
      />
      <PageWrapper
        isFullScreenPage={isFullScreenPage}
      >
        {children}
      </PageWrapper>
    </React.Fragment>
  )
});

export default withRouter(withMetamaskContext(withBlockchainContext(AppWrapper)));
