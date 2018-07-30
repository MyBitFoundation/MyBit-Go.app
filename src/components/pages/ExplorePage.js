/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../styles/ExplorePage.css';
import { debug } from '../../constants';
import { getPrettyCategoryName, getImageForCategory } from '../../util/helpers';
import LoadingPage from './LoadingPage';

const getCategories =
    assets =>
      [...new Set(assets.map(asset => asset.category))]
        .map(category => ({
          image: getImageForCategory(category),
          path: category,
          name: getPrettyCategoryName(category),
        }));

const renderCategories = (categories, clickHandler) => (
  <div className="ExplorePage__container">
    {categories.map(category => (
      <Link
        to={`/explore/${category.path}`}
        href={`/explore/${category.path}`}
        key={category.path}
        className="ExplorePage__category"
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
      ))
    }
  </div>
);


class ExplorePage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { state } = this.props;
    if (state.loading.assets) {
      return <LoadingPage message="Loading categories" />;
    }
    return (<div className="ExplorePage">{renderCategories(getCategories(state.assets), this.props.clickHandler)}</div>);
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
