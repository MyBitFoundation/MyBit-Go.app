import PropTypes from 'prop-types';
import Link from 'next/link';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import 'antd/lib/menu/style/index.css';
import 'antd/lib/icon/style/index.css';
import StyledNavigationBar from './styledNavigationBar';

const NavigationBar = ({ currentPath, items }) => {
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
    <StyledNavigationBar>
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
