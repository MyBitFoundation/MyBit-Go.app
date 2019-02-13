import { withRouter } from 'next/router'
import AppHeader from 'components/AppHeader';
import NavigationBar from 'ui/NavigationBar';
import Theme from 'ui/Theme';
import { withBlockchainContext } from 'components/Blockchain'
import StyledPageWrapper from './styledPageWrapper';
import MobileMenu from 'components/MobileMenu';
import {
  navbarOptions,
} from 'constants';

const AppWrapper = ({
  blockchainContext,
  children,
  router,
  isFullScreenPage,
  hideAtHeader,
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
        styling={Theme}
        readOnlyMode={isReadOnlyMode()}
        user={user}
        prices={prices}
        show={!isFullScreenPage}
        hideAt={hideAtHeader}
        currentPath={currentPath}
        handleMobileMenuState={handleMobileMenuState}
      />
      <NavigationBar
        items={navbarOptions}
        currentPath={currentPath}
        show={!isFullScreenPage}
        hideAt={hideAtHeader}
      />
      <StyledPageWrapper
        isFullScreenPage={isFullScreenPage}
      >
        {children}
      </StyledPageWrapper>
    </React.Fragment>
  )
};

export default withRouter(withBlockchainContext(AppWrapper));
