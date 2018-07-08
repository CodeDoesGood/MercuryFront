import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import { withSnackbar } from '../Utilities/SnackbarWrapper';

import TemporaryDrawer from './TemporaryDrawer';
import SignOutBox from './SignOutBox';
import HelpBox from './HelpBox';

const styles = (theme) => ({
  root: {
    color: 'white',
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50,
  },
  menuIcon: {
    marginLeft: -(theme.spacing.unit * 2),
    color: 'white',
  },
});

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNotifications: false,
      showSignOut: false,
      showSideDraw: false,
      invalidhelpMessage: false,
      notificationCount: 0,
    };

    this.getWelcomeMessage = this.getWelcomeMessage.bind(this);
    this.submitHelpMessage = this.submitHelpMessage.bind(this);
    this.showNotifications = this.showNotifications.bind(this);
    this.showSignOutBox = this.showSignOutBox.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getWelcomeMessage() {
    const time = new Date();
    const currentHour = time.getHours();
    const name = this.props.profile.name.split(' ')[0];

    if (currentHour < 12) return `Morning, ${name}`;
    if (currentHour < 18) return `Afternoon, ${name}`;
    return `Evening, ${name}`;
  }

  /**
   * Notificaitons are based on a state, adjusting the state will display the
   * notifications for the user.
   */
  showNotifications() {
    this.setState({
      showNotifications: !this.state.showNotifications,
    });
  }

  /**
   * Displays the overlay for the sign out page.
   */
  showSignOutBox() {
    this.setState({
      showSignOut: !this.state.showSignOut,
    });
  }

  signOut() {}

  /**
   * Adds a help message into the firebase help route, this route stores
   * the message, name, email and timestamp of user sending the help message
   */

  handleDrawerChange = () => {
    this.setState({
      showSideDraw: !this.state.showSideDraw,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static" color="primary" className={classes.root}>
          <TemporaryDrawer
            open={this.state.showSideDraw}
            onClose={this.handleDrawerChange}
            profile={this.props.profile}
            url={this.state.avatarAddress}
            signOutClick={this.showSignOutBox}
            showHelpBox={this.props.showHelpBox}
            notificationCount={this.state.notificationCount}
          />
          <Toolbar>
            <SignOutBox
              onClose={this.showSignOutBox}
              onSignOut={this.signOut}
              open={this.state.showSignOut}
              name={this.props.profile.name}
            />
            <HelpBox
              handleSubmit={this.submitHelpMessage}
              error={this.state.invalidhelpMessage}
              handleClose={this.props.showHelpBox}
              open={this.props.displayHelp}
              minLength={constants.HELP_MESSAGE.MIN}
              maxLength={constants.HELP_MESSAGE.MAX}
            />
            <IconButton className={classes.menuIcon} onClick={this.handleDrawerChange}>
              <Icon>menu</Icon>
            </IconButton>
            <Typography variant="body2" color="inherit" className={classes.flex}>
              {this.getWelcomeMessage()}
            </Typography>
            <Typography component="div" color="inherit">
              <div>UniGoals</div>
              {this.props.version}
            </Typography>
            <Link href="/" to="/">
              <img src="/components/resources/images/logo.svg" alt="logo" className={classes.logo} />
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navigation.propTypes = {
  displayHelp: PropTypes.bool.isRequired,
  showHelpBox: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  version: PropTypes.string.isRequired,
  removeProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    auth: PropTypes.bool,
    name: PropTypes.string,
    picture: PropTypes.string,
    email: PropTypes.string,
    course_university: PropTypes.string,
    given_name: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    go: PropTypes.func,
  }).isRequired,
  snackbar: PropTypes.shape({
    showMessage: PropTypes.func,
  }).isRequired,
};

Navigation.defaultProps = {};

export default withStyles(styles)(withSnackbar()(Navigation));
