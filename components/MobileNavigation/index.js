import Link from 'next/link';
import {
  Icon,
} from 'antd';
import StyledMobileNavigationLink from './styledMobileNavigationLink';
import StyledMobileNavigationText from './styledMobileNavigationText';

const MobileNavigation = ({
  items,
  currentPath,
  handleMobileMenuState,
}) => items(currentPath).map(item =>
  <StyledMobileNavigationLink
    selected={item.selected}
    onClick={() => handleMobileMenuState(false)}
    key={item.name}
  >
    <Icon component={item.icon} />
    <Link
      key={`${item.url}mobileMenu`}
      href={item.url}
    >
      <a>{item.name}</a>
    </Link>
  </StyledMobileNavigationLink>
)

export default React.memo(MobileNavigation);
