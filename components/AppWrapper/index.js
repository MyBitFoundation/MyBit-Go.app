import { withRouter } from 'next/router'
import AppHeader from '../AppHeader';
import NavigationBar from '../UI/NavigationBar';
import Theme from '../UI/Theme';
import { withBlockchainContext } from '../Blockchain'
import StyledPageWrapper from './styledPageWrapper';
import {
  navbarOptions,
} from '../../constants';

const AppWrapper = ({
  blockchainContext,
  children,
  router,
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
      />
      <NavigationBar
        items={navbarOptions}
        currentPath={currentPath}
      />
      <StyledPageWrapper>
        {children}
      </StyledPageWrapper>
    </React.Fragment>
  )
};

export default withRouter(withBlockchainContext(AppWrapper));
