import { withRouter } from 'next/router'
import AppHeader from 'components/AppHeader';
import NavigationBar from 'ui/NavigationBar';
import { withBlockchainContext } from 'components/Blockchain'
import PageWrapper from './pageWrapper';
import {
  navbarOptions,
} from 'constants';

const AppWrapper = ({
  blockchainContext,
  children,
  router,
  isFullScreenPage,
  handleMobileMenuState,
}) => {
  const {
    user,
    prices,
    isReadOnlyMode,
  } = blockchainContext;

  const{
    route: currentPath,
  } = router;

  return (
    <React.Fragment>
      <AppHeader
        readOnlyMode={isReadOnlyMode()}
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
};

export default withRouter(withBlockchainContext(AppWrapper));
