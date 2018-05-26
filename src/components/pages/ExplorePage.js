import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../styles/ExplorePage.css';
import { debug } from '../../constants';

const cryptocurrencyAtm = require('../../images/category-cryptocurrency-atm.png');
const solarEnergy = require('../../images/category-solar-energy.png');

const categoriesInfo = [
  {
    image: solarEnergy,
    path: 'coffee-machines',
    name: 'Coffee Machines',
  },
  {
    image: cryptocurrencyAtm,
    path: 'crypto-currency-atm',
    name: 'Cryptocurrency ATM\'s',
  },
  {
    image: solarEnergy,
    path: 'solar-energy',
    name: 'Solar Energy',
  },
  {
    image: cryptocurrencyAtm,
    path: 'miscellaneous',
    name: 'Miscellaneous',
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


class ExplorePage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { state } = this.props;
    if (!state.assets.length) {
      return <div>Loading...</div>;
    }
    return (<div className="ExplorePage grid">{renderCategories(categoriesInfo, this.props.clickHandler)}</div>);
  }
}


ExplorePage.propTypes = {
  clickHandler: PropTypes.func,
  state: PropTypes.shape().isRequired,
};

ExplorePage.defaultProps = {
  clickHandler: () => {},
};


export default ExplorePage;
