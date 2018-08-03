import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'carbon-components-react';
import { Link } from 'react-router-dom';
import { debug } from '../constants';

const CategoryBackButton = ({ category }) => (
  <Link
    to={`/explore/${category.toLowerCase()}`}
    href={`/explore/${category.toLowerCase()}`}
  >
    <Button
      kind="secondary"
      className="AssetDetailsPage__back-button"
      onClick={debug('Clicked to go back')}
    >
      BACK
    </Button>
  </Link>
);

CategoryBackButton.propTypes = {
  category: PropTypes.string.isRequired
};

export default CategoryBackButton;
