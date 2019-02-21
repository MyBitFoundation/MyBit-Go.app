/* eslint-disable function-paren-newline */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Button,
  Checkbox,
  Dropdown,
  Icon,
  Menu,
} from 'antd';
import StyledFilterButton from './styledFilterButton';
import StyledCategoryFilter from './styledCategoryFilter';
import StyledCategoryFilterDesktop from './styledCategoryFilterDesktop';
import StyledCategoryFilterMobile from './styledCategoryFilterMobile';

const mainFilters = 4;

const createFilterButton = (key, filterState, setFilterState) => (
  <StyledFilterButton
    key={key}
    type={filterState ? 'primary' : ''}
    onClick={() => setFilterState(key, !filterState)}
  >
    {key}
  </StyledFilterButton>
)

const createCheckbox = (key, filterState, setFilterState) => (
  <Menu.Item key={key}>
    <Checkbox
      onChange={event => setFilterState(key, event.target.checked)}
      checked={filterState}
    >
      {key}
    </Checkbox>
  </Menu.Item>
)

const CategoryFilter = ({
  allFilters,
  selectedFilters,
  setFilterState,
  breakpoints,
  subFilters,
  sortByFilterSelected,
  handleCheckedSortBy,
}) => {
  const mobileDropDownToRender = [];
  const buttonsToRender = [];
  const checkBoxesToRender = [];

  for(let i = 0; i < allFilters.length; i++){
    const filterName = allFilters[i];
    const filterState = selectedFilters.includes(filterName);
    let checkBoxTmp = createCheckbox(filterName, filterState, setFilterState);
    if (i > mainFilters - 1){
      checkBoxesToRender.push(checkBoxTmp);
    } else {
      buttonsToRender.push(createFilterButton(filterName, filterState, setFilterState));
    }
    mobileDropDownToRender.push(checkBoxTmp);
  };

  const menu = content => (
    <Menu onClick={() => {}}>
      {content}
    </Menu>
  );

  const dropdownToRender = checkBoxesToRender.length > 0 && (
    <Dropdown overlay={menu(checkBoxesToRender)}>
      <Button>
        More <Icon type="down" />
      </Button>
    </Dropdown>
  );

  const subfiltersCheckboxes = subFilters.map(filter => createCheckbox(filter.name, filter.name === sortByFilterSelected, handleCheckedSortBy));

  const subfiltersToRender = (
    <Dropdown overlay={menu(subfiltersCheckboxes)}>
      <Button>
        Sort By <Icon type="down" />
      </Button>
    </Dropdown>
  );

  return (
    <StyledCategoryFilter
      breakpoints={breakpoints}
    >
      <StyledCategoryFilterDesktop
        breakpoints={breakpoints}
      >
        {buttonsToRender}
        {dropdownToRender}
        {subfiltersToRender}
      </StyledCategoryFilterDesktop>
      <StyledCategoryFilterMobile
        breakpoints={breakpoints}
      >
        <Dropdown overlay={menu(mobileDropDownToRender)}>
          <Button>
            Categories <Icon type="down" />
          </Button>
        </Dropdown>
        {subfiltersToRender}
      </StyledCategoryFilterMobile>
    </StyledCategoryFilter>
  );
};

CategoryFilter.propTypes = {
  setFilterState: PropTypes.func.isRequired,
  selectedFilters: PropTypes.shape({
    params: PropTypes.shape({}),
  }).isRequired,
};


export default React.memo(CategoryFilter);
