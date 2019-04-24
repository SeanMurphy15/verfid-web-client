import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progressSpinner: {
    color: theme.palette.secondary.main,
    marginLeft: '50%',
    marginTop: '25%'
  }
});

function ComponentLoadingIndicator(props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progressSpinner}/>
    </div>
  );
}

ComponentLoadingIndicator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComponentLoadingIndicator);