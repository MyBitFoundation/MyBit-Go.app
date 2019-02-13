import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Menu,
  Icon,
} from 'antd';
import StyledNavigationBar from './styledNavigationBar';

const NavigationBar = ({
  currentPath,
  items,
  show,
  hideAt,
}) => {
  const navBarOptions = items(currentPath).map(menuItem => (
    <Menu.Item key={menuItem.name} disabled={menuItem.disabled} className={menuItem.selected && 'ant-menu-item-selected'}>
      <Link
        href={menuItem.url || '/'}
      >
        <div>
          <Icon component={menuItem.icon} />
          {menuItem.name}
        </div>
      </Link>
    </Menu.Item>
  ));

  return (
    <StyledNavigationBar
      show={show}
      hideAt={hideAt}
    >
      <Menu
        mode="horizontal"
        className="AppNavigationBar"
        key={currentPath}
      >
        {navBarOptions}
      </Menu>
    </StyledNavigationBar>
  );
};

NavigationBar.propTypes = {
  currentPath: PropTypes.string.isRequired,
};


export default NavigationBar;
