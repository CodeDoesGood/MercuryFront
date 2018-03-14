import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import _ from 'lodash';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  displayName: {
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  phoneText: {
    fontWeight: 'bold',
  },
  profileCentre: {
    margin: ' auto',
    textAlign: 'center',
  },
});

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    if (!this.props.authentication.result) {
      this.props.history.push('/');
    }

    if (_.isNil(this.props.profile.username)) {
      this.props.volunteer.getProfile()
        .then(profile => this.props.updateVolunteerProfile(profile.content.volunteer))
        .catch(() => {});
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div>Profile</div>
        <div className={classes.root}>
          <div className={classes.profileCentre}>
            <Typography variant="headline">{this.props.profile.username}</Typography>
            <Typography variant="headline">{this.props.profile.developer_level === '' ? 'Volunteer' : this.props.profile.developer_level}</Typography>
            <Typography variant="subheading" component="div"><span className={classes.phoneText}>Cell Phone: </span>{this.props.profile.phone === '' ? '(333) 333-3333' : this.props.profile.phone}</Typography>
            <Typography variant="subheading" component="div"><span className={classes.phoneText}>Home Phone: </span>{this.props.profile.phone === '' ? '(4444) 4444-44444' : this.props.profile.phone}</Typography>
          </div>
          <Grid container spacing={24}>
            <Grid item xs>
              <div>
                <Typography variant="headline" component="div" className={classes.paper}>about</Typography>
                <Typography variant="body2" component="p" className={classes.paper}>{this.props.profile.about}</Typography>
              </div>
            </Grid>
            <Grid item xs>
              <Typography variant="headline" component="p" className={classes.paper}>skills</Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="headline" component="p" className={classes.paper}>projects</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  volunteer: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
  authentication: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  profile: PropTypes.shape({
    about: PropTypes.string,
    developer_level: PropTypes.string,
    email: PropTypes.string,
    github_id: PropTypes.string,
    linked_in_id: PropTypes.string,
    location: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    position: PropTypes.string,
    slack_id: PropTypes.string,
    timezone: PropTypes.string,
    username: PropTypes.string,
    verified: PropTypes.number,
    volunteer_id: PropTypes.number,
    volunteer_status: PropTypes.string,
  }).isRequired,
  updateVolunteerProfile: PropTypes.func.isRequired,
};

export default withStyles(styles)(Profile);
