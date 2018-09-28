/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Row from 'antd/lib/row';
import 'antd/lib/row/style';
import Col from 'antd/lib/col';
import 'antd/lib/col/style';

import '../../styles/ExplorePage.css';
import { debug } from '../../constants';
import { getPrettyCategoryName, getImageForCategory } from '../../util/helpers';
import LoadingPage from './LoadingPage';

const getCategories = assets =>
  [...new Set(assets.map(asset => asset.category))].map(category => ({
    image: getImageForCategory(category),
    path: category,
    name: getPrettyCategoryName(category)
  }));

const renderCategories = (categories, clickHandler) => (
  <div>
    {categories.map(category => (
      <Col span={6} className="ExplorePage__container">
        <Link
          to={`/explore/${category.path}`}
          href={`/explore/${category.path}`}
          key={category.path}
          className="ExplorePage__category"
        >
          <div
            className="ExplorePage__image-container"
            onClick={clickHandler || debug(`Going to: ${category.path}`)}
            style={{ backgroundImage: `url(${category.image})` }}
          >
            <p className="ExplorePage__category-name">{category.name}</p>
          </div>
        </Link>
      </Col>
    ))}
  </div>
);

class ExplorePage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { loading } = this.props;
    if (loading.assets) {
      return <LoadingPage message="Loading categories" />;
    }
    return (
      <Row className="ExplorePage">
        {renderCategories(
          getCategories(this.props.assets),
          this.props.clickHandler
        )}
      </Row>
    );
  }
}

ExplorePage.propTypes = {
  clickHandler: PropTypes.func,
  loading: PropTypes.shape({ params: PropTypes.object }).isRequired,
  assets: PropTypes.arrayOf(PropTypes.object).isRequired
};

ExplorePage.defaultProps = {
  clickHandler: () => {}
};

export default ExplorePage;
