import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {
  return (
    <header className="Header">
      <div>
        <Navigation totalProjects={props.totalProjects} authentication={props.authentication} />
      </div>
    </header>
  );
}

Header.propTypes = {
  authentication: PropTypes.shape({
    username: PropTypes.string,
    result: PropTypes.bool,
  }).isRequired,
  totalProjects: PropTypes.number.isRequired,
};
