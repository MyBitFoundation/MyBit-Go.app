import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Achievements.css';

const Achievements = props => (
  <ol className="Achievements">
    {props.achievements.map(milestone => (
      <li key={milestone.endpoint} className="Achievements__list-item">
        <div className="Achievements__list-item--wrapper">
          <b className="Achievements__list-item--title">{milestone.title}</b>
          <span className="Achievements__list-item--description">
            {milestone.description}
          </span>
        </div>
      </li>
    ))}
  </ol>
);

Achievements.propTypes = {
  achievements: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Achievements;
