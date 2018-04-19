import React from 'react';
import '../styles/ExplorePage.css';
import { debug } from '../constants';

export const ExplorePage = ({ clickHandler }) => {
  const categoriesInfo = [
    {
      image: require('../images/category-cryptocurrency-atm.png'),
      path: '/crypto-currency-atm'
    },
    {
      image: require('../images/category-solar-energy.png'),
      path: '/solar-energy'
    },
    {
      image: require('../images/category-cryptocurrency-atm.png'),
      path: '/crypto-currency-atm2'
    },
    {
      image: require('../images/category-solar-energy.png'),
      path: '/solar-energy2'
    }
  ];

  const categories = categoriesInfo.map(category => (
    <div key={category.path} className="col-center ExplorePage__category">
      <img
        src={category.image}
        onClick={
          clickHandler ? clickHandler : debug(`Going to: ${category.path}`)
        }
      />
    </div>
  ));

  return <div className="ExplorePage grid-center">{categories}</div>;
};
