import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

import { withSnackbar } from '../Utilities/SnackbarWrapper';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return <div className={classes.root}>login</div>;
  }
}

Login.propTypes = {
  classes: PropTypes.shape().isRequired,
};

Login.defaultProps = {};

export default withStyles(styles)(withSnackbar()(Login));
