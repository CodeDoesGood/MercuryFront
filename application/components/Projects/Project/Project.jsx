import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { TableCell, TableRow } from 'material-ui/Table';

export default class Project extends React.Component {
  constructor(props) {
    super(props);

    const { project } = this.props;

    this.title = _.defaultTo(project.title, '');
    this.status = _.defaultTo(project.status, '');
    this.project_category = _.defaultTo(project.project_category, '');
    this.platforms = _.defaultTo(project.platforms, '');
    this.last_activity = _.defaultTo(project.last_activity, '');
  }

  render() {
    return (
      <TableRow>
        <TableCell>{this.title}</TableCell>
        <TableCell>{this.status}</TableCell>
        <TableCell>{this.project_category}</TableCell>
        <TableCell>{this.platforms}</TableCell>
        <TableCell>{this.last_activity}</TableCell>
      </TableRow>
    );
  }
}

Project.propTypes = {
  project: PropTypes.shape().isRequired,
};
