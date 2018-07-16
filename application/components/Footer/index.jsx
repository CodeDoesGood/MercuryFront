import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
});

const Footer = (props) => {
  const { classes } = props;

  return <footer className={classes.root}>footer</footer>;
};

Footer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Footer);
