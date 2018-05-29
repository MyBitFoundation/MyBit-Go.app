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
    const { assets: loading } = this.props.state.loading;
    const { assets } = this.props.state;

    return (
      <div>
        {loading && (
          <LoadingPage
            message="Loading categories"
            hasBackButton={false}
          />
        )}
        {!loading && (
          <div className="ExplorePage grid">
            {renderCategories(getCategories(assets), this.props.clickHandler)}
          </div>
        )}
      </div>
    );
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
