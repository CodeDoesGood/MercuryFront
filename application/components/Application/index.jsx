import { BrowserRouter as Router, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';
import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { SnackbarProvider } from '../Utilities/SnackbarWrapper';
import { PropsRoute, PrivateRoute } from '../Routes';

// import Profile from '../Profile';
// import FourOfour from '../404';
// import Notifications from '../Notifications/Notifications';
// import Footer from '../Footer';
import Navigation from '../Navigation';
import Login from '../Login';
// import Years from '../Home/Years';
// import Year from '../Home/Year';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F6511D',
    }, // This is just green.A700 as hex.
    secondary: {
      main: '#00A6ED',
    }, // Purple and green play nicely together.
  },
});

export default class Application extends React.Component {
  constructor(props) {
    super(props);

    // this.routePaths = routePaths;
    this.history = createBrowserHistory();
  }

  shouldRenderComponent = (component) => {
    if (this.props.profile.auth) {
      return component;
    }
    return <div />;
  };
  shouldRenderNavigation = () => {
    if (this.props.profile.auth) {
      return <Navigation history={this.history} version={this.props.version} />;
    }
    return <div />;
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider
          snackbarProps={{
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
          }}
        >
          <Router>
            {/* we do this here because it allows us to have a sticky footer */}
            <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
              <div style={{ flex: '1' }}>
                {this.shouldRenderComponent(<Navigation history={this.history} version={this.props.version} />)}
                <Switch>
                  <PropsRoute exact path="/" component={Login} {...this.props} />
                  {/* <PropsRoute exact path="/login" component={Login} {...this.props} />
                  <PrivateRoute exact path="/home" component={Years} {...this.props} />
                  <PrivateRoute exact path="/notifications" component={Notifications} {...this.props} />
                  <PrivateRoute
                    exact
                    path="/profile"
                    component={Profile}
                    profile={this.props.profile}
                    updateProfile={this.props.updateProfile}
                    removeProfile={this.props.removeProfile}
                  />
                  <PrivateRoute exact path="/settings" component={Years} {...this.props} />
                  <PrivateRoute exact path="/year/:yearIndex" component={Year} {...this.props} />
                  <PrivateRoute exact component={FourOfour} {...this.props} /> */}
                </Switch>
              </div>
              {this.shouldRenderComponent(<Footer />)}
            </div>
          </Router>
        </SnackbarProvider>
      </MuiThemeProvider>
    );
  }
}

Application.propTypes = {
  // displayHelp: PropTypes.bool.isRequired,
  // showHelpBox: PropTypes.func.isRequired,
  // version: PropTypes.string.isRequired,
  // updateNotifications: PropTypes.func.isRequired,
  // updateYearTitle: PropTypes.func.isRequired,
  // updateProfile: PropTypes.func.isRequired,
  // removeProfile: PropTypes.func.isRequired,
  // updateYears: PropTypes.func.isRequired,
  // profile: PropTypes.shape().isRequired,
  // removeNotification: PropTypes.func.isRequired,
  // removeYear: PropTypes.func.isRequired,
  // removeUnitRow: PropTypes.func.isRequired,
  // insertUnitRow: PropTypes.func.isRequired,
  // insertNewYear: PropTypes.func.isRequired,
  // updateRowContent: PropTypes.func.isRequired,
  // updateUnitTitle: PropTypes.func.isRequired,
  // addUnitTable: PropTypes.func.isRequired,
  // removeUnitTable: PropTypes.func.isRequired,
  // notifications: PropTypes.shape().isRequired,
  // years: PropTypes.shape({}),
};

Application.defaultProps = {
  // years: {},
};
