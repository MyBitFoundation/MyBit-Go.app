/* eslint-disable function-paren-newline */

import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Dropdown, Checkbox, Button } from 'antd';
import styled from 'styled-components';

import '../styles/CategoryFilter.css';

const mainFilters = 4;

const FilterButton = styled(Button)`
  text-shadow: none;
  background-color: ${props => ((props.type === 'primary') ? '#fff' : '#fff')}; 
  color: ${props => ((props.type === 'primary') ? '#1890ff' : 'rgba(0, 0, 0, 0.65)')}; 
  border-color: ${props => ((props.type === 'primary') ? '#1890ff ' : '#d9d9d9')};  

  &:hover {
    background-color: #1890ff;
    color: #fff;
    border-color: #1890ff;
  }

  
  &:focus-within {
    color: none;
    background-color: none;
    border-color: none;
  }

  &:focus {
    background-color: ${props => ((props.type === 'primary') ? '#fff' : '#fff')}; 
    color: ${props => ((props.type === 'primary') ? '#1890ff' : 'rgba(0, 0, 0, 0.65)')}; 
    border-color: ${props => ((props.type === 'primary') ? '#1890ff ' : '#d9d9d9')};  
  }
`;


const CategoryFilter = ({ filters, setFilterState }) => {
  const mobileDropDownToRender = [];
  const buttonsToRender = [];
  let dropdownToRender;

  Object.keys(filters).forEach((key, index) => {
    if (index > mainFilters - 1) return;
    const filterState = filters[key];
    buttonsToRender.push(
      <FilterButton
        key={key}
        type={filterState ? 'primary' : ''}
        onClick={() => setFilterState(key, !filterState)}
      >
        {key}
      </FilterButton>,
    );
    mobileDropDownToRender.push(
      <Menu.Item key={key}>
        <Checkbox
          onChange={event => setFilterState(key, event.target.checked)}
          checked={filterState}
        >
          {key}
        </Checkbox>
      </Menu.Item>,
    );
  });

  const menu = content => (
    <Menu onClick={() => {}}>
      {content}
    </Menu>
  );

  if (Object.keys(filters).length > mainFilters) {
    const checkBoxesToRender = [];
    Object.keys(filters).forEach((key, index) => {
      if (index <= mainFilters - 1) return;
      const filterState = filters[key];
      const checkBox = (
        <Checkbox
          onChange={event => setFilterState(key, event.target.checked)}
          checked={filterState}
        >
          {key}
        </Checkbox>
      );
      const menuItem = (
        <Menu.Item key={key}>
          {checkBox}
        </Menu.Item>
      );
      checkBoxesToRender.push(menuItem);
      mobileDropDownToRender.push(menuItem);
    });

    dropdownToRender = (
      <Dropdown overlay={menu(checkBoxesToRender)}>
        <Button>
          More <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }

  return (
    <React.Fragment>
      <div className="CategoryFilter CategoryFilter--is-desktop">
        {buttonsToRender}
        {dropdownToRender}
      </div>
      <div className="CategoryFilter CategoryFilter--is-mobile">
        <Dropdown overlay={menu(mobileDropDownToRender)}>
          <span>Categories <Icon type="down" /></span>
        </Dropdown>
      </div>
    </React.Fragment>
  );
};

CategoryFilter.propTypes = {
  setFilterState: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    params: PropTypes.shape({}),
  }).isRequired,
};


export default CategoryFilter;
