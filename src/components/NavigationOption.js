import React from 'react';

export const NavigationOption = ({
  name,
  icon,
  clickHandler,
  selectable,
  selected
}) => (
  <div
    className={'col AppNavigationBar__option-col'}
    onClick={selectable ? () => clickHandler(name) : undefined}
  >
    <div
      className={`AppNavigationBar__option ${selected &&
        'AppNavigationBar__option--selected'} ${selectable &&
        'AppNavigationBar__option--selectable'}`}
    >
      <img className="AppNavigationBar__option-img" src={icon} />
      <p className="AppNavigationBar__option-text">{name}</p>
    </div>
  </div>
);
