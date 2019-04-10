import Address from 'ui/Address';
import Balance from 'components/Balance';
import MobileAccountInfoBalance from './mobileAccountInfoBalance';
import MobileAccountInfoNoAccount from './mobileAccountInfoNoAccount';
import MobileAccountCircle from './mobileAccountCircle';
import { withMetamaskContext } from 'components/MetamaskContext';

const MobileAccountInfo = ({
  metamaskContext,
}) =>  {
  const{
    user,
    isReadOnlyMode,
  } = metamaskContext;
  const balance = user.avgBalance || null;

  const addressToRender = (!isReadOnlyMode && user.address) ? (
    <Address
      {...user}
      isLeft
      isMobile
    />
  ) : (
    <MobileAccountInfoNoAccount>
      <MobileAccountCircle />
      <span>No account loaded</span>
    </MobileAccountInfoNoAccount>
  )

  return (
    <div>
      {addressToRender}
      <MobileAccountInfoBalance>
        <Balance
          balance={balance}
          isMobile
          noInfo={isReadOnlyMode || !user.address}
        />
      </MobileAccountInfoBalance>
    </div>
  )
}

export default withMetamaskContext(MobileAccountInfo);
