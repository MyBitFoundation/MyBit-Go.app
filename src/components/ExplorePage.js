/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
// TODO: Fix the JSX linting errors
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ExplorePage.css';
import { debug } from '../constants';

const cryptocurrencyAtm = require('../images/category-cryptocurrency-atm.png');
const solarEnergy = require('../images/category-solar-energy.png');

const ExplorePage = ({ clickHandler }) => {
  const categoriesInfo = [
    {
      image: cryptocurrencyAtm,
      path: '/crypto-currency-atm',
      name: 'Cryptocurrency ATM',
    },
    {
      image: solarEnergy,
      path: '/solar-energy',
      name: 'Solar Energy',
    },
    {
      image: cryptocurrencyAtm,
      path: '/crypto-currency-atm2',
      name: 'Cryptocurrency ATM',
    },
    {
      image: solarEnergy,
      path: '/solar-energy2',
      name: 'Solar Energy',
    },
  ];

  const categories = categoriesInfo.map(category => (
    <div
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
    </div>
  ));

  return <div className="ExplorePage grid">{categories}</div>;
};

ExplorePage.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};


export default ExplorePage;
