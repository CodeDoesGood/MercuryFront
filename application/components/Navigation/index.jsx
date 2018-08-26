import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { withSnackbar } from '../Utilities/SnackbarWrapper';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
    fontFamily: 'Rubik',
    fontWeight: '400',
    '-webkit-font-smoothing': 'antialiased',
    textTransform: 'uppercase',
    fontSize: '14px',
    lineHeight: '17px',
  },
  logo: {
    flexGrow: 1,
    fontFamily: 'Rubik',
    fontWeight: '100',
    textTransform: 'uppercase',
    lineHeight: '17px',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static" color="primary" className={classes.root}>
          <Toolbar>
            <IconButton className={classes.logo} color="inherit">
              &lt; CodeDoesGood /&gt;
            </IconButton>
            <Button color="inherit" className={classes.flex}>
              Home
            </Button>
            <Button color="inherit" className={classes.flex}>
              Projects
            </Button>
            <Button color="inherit" className={classes.flex}>
              Community
            </Button>
            <Button color="inherit" className={classes.flex}>
              Contact
            </Button>
            <Button color="inherit" className={classes.flex}>
              User
            </Button>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

Navigation.defaultProps = {};

export default withStyles(styles)(withSnackbar()(Navigation));
