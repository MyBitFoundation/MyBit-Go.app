/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
// TODO: Fix the JSX linting errors
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../styles/ExplorePage.css';
import { debug } from '../../constants';

const cryptocurrencyAtm = require('../../images/category-cryptocurrency-atm.png');
const solarEnergy = require('../../images/category-solar-energy.png');

const categoriesInfo = [
  {
    image: cryptocurrencyAtm,
    path: 'crypto-currency-atm',
    name: 'Cryptocurrency ATM',
  },
  {
    image: solarEnergy,
    path: 'solar-energy',
    name: 'Solar Energy',
  },
  {
    image: cryptocurrencyAtm,
    path: 'crypto-currency-atm2',
    name: 'Cryptocurrency ATM',
  },
  {
    image: solarEnergy,
    path: 'solar-energy2',
    name: 'Solar Energy',
  },
];

const renderCategories = (categories, clickHandler) => categories.map(category => (
  <Link
    to={`/explore/${category.path}`}
    href={`/explore/${category.path}`}
    key={category.path}
    className="col-3_md-4_sm-6_xs-12 ExplorePage__category"
  >
    <div
      className="ExplorePage__image-container"
      onClick={
        clickHandler || debug(`Going to: ${category.path}`)
      }
      style={{ backgroundImage: `url(${category.image})` }}
    >
      <p className="ExplorePage__category-name">{category.name}</p>
    </div>
  </Link>
));


const ExplorePage =
  ({ clickHandler }) =>
    <div className="ExplorePage grid">{renderCategories(categoriesInfo, clickHandler)}</div>;

ExplorePage.propTypes = {
  clickHandler: PropTypes.func,
};

ExplorePage.defaultProps = {
  clickHandler: () => {},
};


export default ExplorePage;
