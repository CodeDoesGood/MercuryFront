import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Badge from 'material-ui/Badge';
import { Link } from 'react-router-dom';
import Icon from 'material-ui/Icon';

import * as routes from '../Application/routePaths';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  paddingAbove: {
    paddingTop: theme.spacing.unit * 3,
  },
  navButton: {
    color: 'white',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
});

function Navigation(props) {
  const { classes } = props;

  if (props.authentication.result) {
    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary" className={classes.paddingAbove}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>&lt; CodeDoesGood /&gt;</Typography>
            <Link href to={routes.home}><Button className={classes.navButton}>Home</Button></Link>
            <Badge color="primary" badgeContent={2} className={classes.margin}>
              <Link href to={routes.projects}><Button className={classes.navButton}>Projects</Button></Link>
            </Badge>
            <Button className={classes.navButton}>Community</Button>
            <Link href to={routes.contactUs}><Button className={classes.navButton}>Contact</Button></Link>
            <Link href to={routes.myProfile}>
              <Button className={classes.navButton}><Icon className={classes.icon}>person</Icon>{props.authentication.username}</Button>
            </Link>
            <Link href to={routes.signOut}><Button className={classes.navButton}>Sign out</Button></Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary" className={classes.paddingAbove}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>&lt; CodeDoesGood /&gt;</Typography>
          <Link href to={routes.home}><Button className={classes.navButton}>Home</Button></Link>
          <Badge color="primary" badgeContent={props.totalProjects} className={classes.margin}>
            <Link href to={routes.projects}><Button className={classes.navButton}>Projects</Button></Link>
          </Badge>
          <Button className={classes.navButton}>Community</Button>
          <Link href to={routes.contactUs}><Button className={classes.navButton}>Contact</Button></Link>
          <Link href to={routes.login}><Button className={classes.navButton}>Login</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navigation.propTypes = {
  authentication: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Navigation);
