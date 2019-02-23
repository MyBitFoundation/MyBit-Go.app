import Address from 'ui/Address';
import Balance from 'components/Balance';
import StyledMobileAccountInfo from './styledMobileAccountInfo';
import StyledMobileAccountInfoBalance from './styledMobileAccountInfoBalance';
import StyledMobileAccountInfoNoAccount from './styledMobileAccountInfoNoAccount';
import StyledMobileAccountCircle from './styledMobileAccountCircle';
import { withMetamaskContext } from 'components/MetamaskChecker';

const MobileAccountInfo = ({
  metamaskContext,
}) =>  {
  const{
    user,
    isReadOnlyMode,
  } = metamaskContext;

  const addressToRender = (!isReadOnlyMode && user.address) ? (
    <Address
      {...user}
      isLeft
      isMobile
    />
  ) : (
    <StyledMobileAccountInfoNoAccount>
      <StyledMobileAccountCircle />
      <span>No account loaded</span>
    </StyledMobileAccountInfoNoAccount>
  )

  return (
    <StyledMobileAccountInfo>
      {addressToRender}
      <StyledMobileAccountInfoBalance>
        <Balance
          {...user.balances}
          isMobile
          noInfo={isReadOnlyMode || !user.address}
        />
      </StyledMobileAccountInfoBalance>
    </StyledMobileAccountInfo>
  )
}

export default withMetamaskContext(MobileAccountInfo);
