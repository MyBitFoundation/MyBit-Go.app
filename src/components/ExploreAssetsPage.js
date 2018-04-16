import React from 'react';
import '../styles/ExploreAssetsPage.css';
import { Asset } from './Asset';

export const ExploreAssetsPage = ({ clickHandler }) => {
  const assetsInfo = [
    {
      image: require('../images/Solar Panel.png'),
      path: '/crypto-currency-atm',
      funded: '1000',
      goal: '4000',
      city: 'Lisbon',
      country: 'Portugal',
      name: 'Solar Powered Bench'
    },
    {
      image: require('../images/Solar Panel 2.png'),
      path: '/solar-energy',
      funded: '2000',
      goal: '4000',
      city: 'Lisbon',
      country: 'Portugal',
      name: 'Solar Powered Bench'
    },
    {
      image: require('../images/bitcoin-atm-4-2.png'),
      path: '/crypto-currency-atm',
      funded: '3000',
      goal: '4000',
      city: 'Lisbon',
      country: 'Portugal',
      name: 'Bitcoin ATM'
    },
    {
      image: require('../images/bitcoin-atm-4-2.png'),
      path: '/solar-energy',
      funded: '4000',
      goal: '4000',
      city: 'Lisbon',
      country: 'Portugal',
      name: 'Bitcoin ATM'
    }
  ];

  let assets = [];
  let counter = 1;

  for (const key of Object.keys(assetsInfo)) {
    let asset = assetsInfo[key];
    assets.push(
      <Asset
        key={counter}
        clickHandler={clickHandler}
        funded={asset.funded}
        goal={asset.goal}
        image={asset.image}
        path={asset.path}
        includeBackButton={counter === 1}
        city={asset.city}
        country={asset.country}
        name={asset.name}
      />
    );
    counter++;
  }

  return <div className="exploreAssetsPage grid-center">{assets}</div>;
};
