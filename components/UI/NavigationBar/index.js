import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Menu,
  Icon,
} from 'antd';
import NavigationBarWrapper from './navigationBarWrapper';

const NavigationBar = ({
  currentPath,
  items,
}) => {
  const navBarOptions = items(currentPath).map(menuItem => {
    const linkContent = (
      <div>
        <Icon component={menuItem.icon} />
        {menuItem.name}
      </div>
    )
    return (
    <Menu.Item key={menuItem.name} disabled={menuItem.disabled} className={menuItem.selected && 'ant-menu-item-selected'}>
      {menuItem.external && (
        <a
          href={menuItem.url}
        >
          {linkContent}
        </a>
      )}
      {!menuItem.external && (
        <Link
          href={menuItem.url || '/'}
        >
          {linkContent}
        </Link>
      )}
    </Menu.Item>
  )});

  return (
    <NavigationBarWrapper>
      <Menu
        mode="horizontal"
        className="AppNavigationBar"
        key={currentPath}
      >
        {navBarOptions}
      </Menu>
    </NavigationBarWrapper>
  );
};

export default NavigationBar;
