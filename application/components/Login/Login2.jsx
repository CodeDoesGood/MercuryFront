import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles/index';
import TextField from 'material-ui/TextField';
import FormControl from 'material-ui/Form/FormControl';
import Typography from 'material-ui/Typography';
import Fade from 'material-ui/transitions/Fade';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { LinearProgress } from 'material-ui/Progress';

import * as routePaths from '../Application/routePaths';

const styles = theme => ({
  bottomTextWrapper: {
    opacity: '0.8',
    padding: theme.spacing.unit,
  },
  loginTitle: {
    textAlign: 'center',
    opacity: '0.7',
    padding: theme.spacing.unit,
  },
  bottomText: {
    color: '#f57a23',
    textDecoration: 'none',
  },
  formControl: {
    width: '85%',
    background: '#fff',
  },
  forgotButton: {
    textTransform: 'none',
  },
  loginButton: {
    color: 'white',
  },
  textField: {
    marginBottom: theme.spacing.unit * 2,
  },

  loginWrapper: {
    height: '60%',
    margin: `${theme.spacing.unit * 10}px auto`,
    textAlign: 'center',
    [theme.breakpoints.down('xl')]: {
      width: '20%',
      MaxWidth: '20%',
    },
    [theme.breakpoints.down('lg')]: {
      width: '30%',
      MaxWidth: '30%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '60%',
      MaxWidth: '60%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      MaxWidth: '90%',
    },
  },
});

class Login extends React.Component {
  constructor() {
    super();

    this.login = this.login.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleLoginError = this.handleLoginError.bind(this);

    this.state = {
      // This is related to when the login client validation fails and we need to let the user know
      // what form section they failed on
      usernameValidationFailed: false,
      passwordValidationFailed: false,

      // this is related to loading and displaying error messages
      message: '',
      error: false,
      loading: 0,
      isLoading: false,
    };
  }

  componentWillMount() {
    this.props.history.push('/');
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.login(e);
    }
  }

  login(e) {
    e.preventDefault();

    this.setState({
      loading: this.state.loading + 25,
      isLoading: true,
      usernameValidationFailed: false,
      passwordValidationFailed: false,
    });

    const username = this.usernameRef.value;
    const password = this.passwordRef.value;
    const { volunteer } = this.props.client;

    this.usernameRef.value = '';
    this.passwordRef.value = '';

    volunteer.authenticate(username, password)
      .then((result) => {
        this.props.client.setUtil('TOKEN', result.content.token);
        this.props.authenticating(result.content);
        this.setState({ message: result.message, error: false, loading: this.state.loading += 25 });
        return volunteer.getCompleteProfile();
      })
      .then((profile) => {
        this.setState({ loading: this.state.loading + 50, isLoading: false });
        this.props.updateVolunteerProfile(profile.content.volunteer);
        this.props.history.push('/');
      })
      .catch(error => this.handleLoginError(error));
  }

  handleLoginError(error) {
    if (!_.isNil(error.failed_verify) && error.failed_verify) {
      this.setState({
        message: (
          <span>
                {error.description} Resend verification code?
                <div role="button" tabIndex={0} onKeyPress={this.resendVerification} onClick={this.resendVerification}>Click here</div>
              </span>),
        error: true,
        loading: 0,
        isLoading: false,
        usernameValidationFailed: true,
        passwordValidationFailed: true,
      });
    } else {
      this.setState({
        message: error.description,
        error: true, loading: 0,
        usernameValidationFailed: true,
        passwordValidationFailed: true,
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.loginWrapper} elevation={1}>
        <Fade in={this.state.isLoading} unmountOnExit>
          <LinearProgress color="primary" variant="determinate" value={this.state.loading} />
        </Fade>
        <Typography component="div" variant="headline" className={classes.loginTitle}>CDG Volunteer Sign In</Typography>
        <FormControl
          className={classes.formControl}
        >
          <TextField
            required
            id="username"
            label="username"
            placeholder="username"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            className={classes.textField}
            error={this.state.usernameValidationFailed}
            inputRef={(ref) => {
              this.usernameRef = ref;
            }}
          />
          <TextField

            required
            id="password"
            label="password"
            placeholder="password"
            type="password"
            className={classes.textField}
            error={this.state.passwordValidationFailed}
            inputRef={(ref) => {
              this.passwordRef = ref;
            }}
          />
          <Button type="submit" onClick={this.login} variant="raised" className={classes.loginButton} color="primary">
            Sign In
          </Button>
        </FormControl>
        <div>
          <div className={classes.bottomTextWrapper}>
            <Button variant="flat" color="primary" className={classes.forgotButton}>
              <Typography
                href={routePaths.forgotten}
                component="a"
                variant="subheading"
                className={classes.bottomText}
              >
                Forgot my username / password
              </Typography>
            </Button>
            <Button variant="flat" color="primary" className={classes.forgotButton}>
              <Typography
                href={routePaths.register}
                component="a"
                variant="subheading"
                className={classes.bottomText}
              >
                Register
              </Typography>
            </Button>
          </div>
        </div>
      </Paper>
    );
  }
}

Login.propTypes = {
  client: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  authenticating: PropTypes.func.isRequired,
  updateVolunteerProfile: PropTypes.func.isRequired,
};

export default withStyles(styles)(Login);
