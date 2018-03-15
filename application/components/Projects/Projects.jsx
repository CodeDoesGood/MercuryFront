import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import Project from './Project/Project';

const styles = theme => ({
  root: {
    maxWidth: '75%',
    margin: '0 auto',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.projectTables = this.projectTables.bind(this);

    this.props.projectsClient.getActive()
      .then(projects => this.props.updateProjects(projects.content.projects));
  }

  projectTables() {
    const { projects } = this.props;

    if (_.isNil(projects[0])) {
      return (<Project project={{ title: 'No projects' }} />);
    }

    return _.map(projects, (project, index) => (<Project project={project} key={index} />));
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Platforms</TableCell>
              <TableCell>Latest Activity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.projectTables()}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

Projects.propTypes = {
  updateProjects: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  projectsClient: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Projects);
