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
  >
    <Icon component={item.icon} />
    <Link
      key={`${item.url}mobileMenu`}
      href={item.url}
    >
        {item.name}
    </Link>
  </StyledMobileNavigationLink>
)

export default MobileNavigation;
