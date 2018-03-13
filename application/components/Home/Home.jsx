import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import Notifications from './Notifications/Notifications';
import Announcements from './Announcements/Announcements';

const style = require('./home.less');

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.displayWelcomeMessage = this.displayWelcomeMessage.bind(this);
    this.displayNotifications = this.displayNotifications.bind(this);
    this.displayAnnouncements = this.displayAnnouncements.bind(this);
  }

  /**
   * Returns the jsx for displaying all current announcements
   */
  displayAnnouncements() {
    return (
      <div className={style.announcements}>
        <span className={style.announcementsTitle}>Announcements</span>
        <Announcements
          volunteer={this.props.volunteer}
          announcements={this.props.announcements}
          updateAnnouncements={this.props.updateAnnouncements}
        />
      </div>
    );
  }

  /**
   * Returns the jsx to display the notifications if the user is authenticated
   */
  displayNotifications() {
    if (this.props.authentication.result) {
      return (
        <div className={style.notifications}>
          <span className={style.notificationsTitle}>Notifications</span>
          <Notifications
            volunteer={this.props.volunteer}
            notifications={this.props.notifications}
            updateNotifications={this.props.updateNotifications}
          />
        </div>
      );
    }
    return null;
  }

  displayWelcomeMessage() {
    const currentHour = new Date().getHours();
    const username = (this.props.authentication.result) ? this.props.authentication.username : 'Volunteer';

    if (currentHour < 12) {
      return (<div className={style.welcomeMessage}>Good Morning, {username}</div>);
    } else if (currentHour < 18) {
      return (<div className={style.welcomeMessage}>Good Afternoon, {username}</div>);
    }
    return (<div className={style.welcomeMessage}>Good Evening, {username}</div>);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={style.homeTitle}>Volunteer Home</div>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Grid item xs={12}>
                <Typography className={classes.text} compnent="span">
                  Announcements
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>Announcement</Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>Announcement</Paper>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.text} compnent="span">
                Notifications
              </Typography>
              <Grid item xs={12}>
                <Paper className={classes.paper}>Notifications</Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>Notifications</Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>Notifications</Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  authentication: PropTypes.shape({
    username: PropTypes.string,
    result: PropTypes.bool,
  }).isRequired,
  volunteer: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
  updateAnnouncements: PropTypes.func.isRequired,
  updateNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  announcements: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default withStyles(styles)(Home);
