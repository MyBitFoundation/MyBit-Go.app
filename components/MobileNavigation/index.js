import Link from 'next/link';
import {
  Icon,
} from 'antd';
import MobileNavigationLink from './mobileNavigationLink';
import MobileNavigationText from './mobileNavigationText';

const MobileNavigation = ({
  items,
  currentPath,
  handleMobileMenuState,
}) => items(currentPath).map(item =>
  <MobileNavigationLink
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
  </MobileNavigationLink>
)

export default React.memo(MobileNavigation);
