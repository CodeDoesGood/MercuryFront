/* eslint-disable quotes,react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';

import _ from 'lodash';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  displayName: {},
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleText: {
    fontWeight: 'bold',
  },
  phoneText: {
    textDecoration: 'none',
    color: 'black',
  },
  profileCentre: {
    margin: ' auto',
    textAlign: 'center',
  },
  avatar: {
    margin: '0 auto',
    marginTop: theme.spacing.unit * 5,
    textAlign: 'center',
    width: theme.spacing.unit * 15,
    height: theme.spacing.unit * 15,
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
        .catch(() => {
        });
    }
  }

  render() {
    const { classes, profile } = this.props;

    return (
      <div>
        <div className={classes.root}>
          <div className={classes.profileCentre}>
            <Avatar
              alt={profile.name}
              src={profile.picture_url === '' ? '/components/images/placeholder.png' : profile.picture_url}
              className={classes.avatar}
            />
            <Typography variant="headline">{profile.name}</Typography>
            <Typography variant="headline">
              {profile.developer_level === '' ? 'Volunteer' : profile.developer_level}
            </Typography>
            <Button
              rel="noopener"
              target="_blank"
              href={`https://www.linkedin.com/in/${profile.linked_in_id === '' ? 'CodeDoesGood' : profile.linked_in_id}/`}
            >
              <Icon className="fab fa-linkedin" />
            </Button>
            <Button
              rel="noopener"
              target="_blank"
              href={`https://www.twitter.com/${profile.twitter_id === '' ? 'CodeDoesGood' : profile.twitter_id}/`}
            >
              <Icon className="fab fa-twitter" />
            </Button>
            <Button
              rel="noopener"
              target="_blank"
              href={`slack://user?team=CodeDoesGood&id=${profile.slack_id === '' ? 'CodeDoesGood' : profile.slack_id}/`}
            >
              <Icon className="fab fa-slack" />
            </Button>
            <Button
              rel="noopener"
              target="_blank"
              href={`https://www.github.com/${profile.github_id === '' ? 'CodeDoesGood' : profile.github_id}/`}
            >
              <Icon className="fab fa-github" />
            </Button>
            <Typography variant="subheading" component="div">
              <span className={classes.titleText} datatype="tel">Phone: </span>
              <a className={classes.phoneText} href={`tel:${profile.email}`}>
                {profile.phone === '' ? 'unknown' : profile.phone}
              </a>
            </Typography>
            <Typography variant="subheading" component="div">
              <span className={classes.titleText}>Email: </span>
              <a className={classes.phoneText} href={`mailto:${profile.email}`}>
                {profile.email === '' ? 'unknown' : profile.email}
              </a>
            </Typography>
          </div>
          <Grid container spacing={24}>
            <Grid item xs>
              <div>
                <Typography variant="headline" component="div" className={classes.paper}>about</Typography>
                <Typography variant="body2" component="p" className={classes.paper}>
                  {profile.about === '' ? 'No about' : profile.about}
                </Typography>
              </div>
            </Grid>
            <Grid item xs>
              <Typography variant="headline" component="p" className={classes.paper}>skills</Typography>
              <Typography variant="body2" component="p" className={classes.paper}>
                We currently don't track skills
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="headline" component="p" className={classes.paper}>projects</Typography>
              <Typography variant="body2" component="p" className={classes.paper}>
                We currently don't support tracking user projects
              </Typography>
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
    twitter_id: PropTypes.string,
    linked_in_id: PropTypes.string,
    location: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    position: PropTypes.string,
    slack_id: PropTypes.string,
    timezone: PropTypes.string,
    username: PropTypes.string,
    picture_url: PropTypes.string,
    verified: PropTypes.number,
    volunteer_id: PropTypes.number,
    volunteer_status: PropTypes.string,
  }).isRequired,
  updateVolunteerProfile: PropTypes.func.isRequired,
};

export default withStyles(styles)(Profile);
