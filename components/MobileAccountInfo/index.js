import Address from 'ui/Address';
import Balance from 'components/Balance';
import StyledMobileAccountInfo from './styledMobileAccountInfo';
import StyledMobileAccountInfoBalance from './styledMobileAccountInfoBalance';
import StyledMobileAccountInfoNoAccount from './styledMobileAccountInfoNoAccount';
import StyledMobileAccountCircle from './styledMobileAccountCircle';

const MobileAccountInfo = ({
  user,
  isReadOnlyMode,
}) =>  {

  const addressToRender = !isReadOnlyMode ? (
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
          {...user}
          isMobile
          noInfo={isReadOnlyMode}
        />
      </StyledMobileAccountInfoBalance>
    </StyledMobileAccountInfo>
  )
}

export default MobileAccountInfo;
