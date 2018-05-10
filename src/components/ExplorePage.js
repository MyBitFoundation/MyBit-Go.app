import React from 'react';
import '../styles/ExplorePage.css';
import { debug } from '../constants';

export const ExplorePage = ({ clickHandler }) => {
  const categoriesInfo = [
    {
      image: require('../images/category-cryptocurrency-atm.png'),
      path: '/crypto-currency-atm',
      name: 'Cryptocurrency ATM',
    },
    {
      image: require('../images/category-solar-energy.png'),
      path: '/solar-energy',
      name: 'Solar Energy',
    },
    {
      image: require('../images/category-cryptocurrency-atm.png'),
      path: '/crypto-currency-atm2',
      name: 'Cryptocurrency ATM',
    },
    {
      image: require('../images/category-solar-energy.png'),
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
