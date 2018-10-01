import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { debug } from '../constants';

const CategoryBackButton = ({ category }) => {
  let tempCategoryFix;
  if (category === 'Real Estate (Storage)') {
    tempCategoryFix = 'realestatestorage';
  } else if (category === 'Real Estate (Co-Working)') {
    tempCategoryFix = 'realestatecoworking';
  } else if (category === 'Energy') {
    tempCategoryFix = 'solarenergy';
  } else {
    tempCategoryFix = category.replace(/ /g, '').toLowerCase();
  }
  return (
    <Link
      to={`/explore/${tempCategoryFix}`}
      href={`/explore/${tempCategoryFix}`}
    >
      <Button
        type="secondary"
        className="AssetDetailsPage__back-button"
        onClick={debug('Clicked to go back')}
      >
        BACK
      </Button>
    </Link>
  );
};

CategoryBackButton.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryBackButton;
