import React from 'react';
import PropTypes from 'prop-types';
import '../styles/AppSidebar.css';
import NavigationOption from './NavigationOption';

const AppSidebar = ({ clickHandler }) => {
  const menuOptions = [
    { name: 'Explore' },
    { name: 'List Asset' },
    { name: 'Saved Assets' },
    { name: 'My Portfolio' },
    { name: 'Staking' },
    { name: 'Exchange Asset' },
    { name: 'Transaction History' },
    { name: 'FAQ & Tutorials' },
  ];

  const sidebarMenu = menuOptions.map(menuItem => (
    <NavigationOption
      key={menuItem.name}
      name={menuItem.name}
      clickHandler={
        !clickHandler ? name => console.log('Clicked ', name) : clickHandler
      }
    />
  ));

  return <div className="col-3 AppSidebar">{sidebarMenu}</div>;
};

AppSidebar.propTypes = {
  clickHandler: PropTypes.func,
};

AppSidebar.defaultProps = {
  clickHandler: undefined,
};

export default AppSidebar;
