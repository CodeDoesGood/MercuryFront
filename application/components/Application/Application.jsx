import { BrowserRouter as Router, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';
import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import * as routePaths from './routePaths';

import { SnackbarProvider } from '../Utilities/SnackbarWrapper';
import { PropsRoute, PrivateRoute } from '../Routes';

import FourOfour from '../404';
import Footer from '../Footer';
import Login from '../Login/Login';
import Navigation from '../Navigation';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(2, 50, 119)',
    }, // This is just green.A700 as hex.
    secondary: {
      main: 'rgb(0, 221, 124)',
    }, // Purple and green play nicely together.
  },
});

export default class Application extends React.Component {
  constructor(props) {
    super(props);

    this.routePaths = routePaths;
    this.history = createBrowserHistory();
  }

  shouldRenderComponent = (component) => {
    const { profile } = this.props;

    if (profile.auth.result) {
      return component;
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
          {this.shouldRenderComponent(<Navigation />)}
          <Router>
            {/* we do this here because it allows us to have a sticky footer */}
            <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
              <div style={{ flex: '1' }}>
                <Switch>
                  <PropsRoute exact path="/" component={Login} {...this.props} />
                  <PrivateRoute exact component={FourOfour} {...this.props} />
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
  version: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    auth: {
      result: PropTypes.bool,
    },
  }).isRequired,
};

Application.defaultProps = {};
