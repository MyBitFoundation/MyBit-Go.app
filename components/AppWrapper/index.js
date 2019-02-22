import { withRouter } from 'next/router'
import AppHeader from 'components/AppHeader';
import NavigationBar from 'ui/NavigationBar';
import PageWrapper from './pageWrapper';
import {
  navbarOptions,
} from 'constants';

const AppWrapper = React.memo(({
  children,
  router,
  isFullScreenPage,
  handleMobileMenuState,
}) => {

  const {
    route: currentPath,
  } = router;

  return (
    <React.Fragment>
      <AppHeader
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

export default withRouter(AppWrapper);
