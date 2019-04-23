import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { actionCreators as businessActionCreators } from "../store/Animal";
import Paper from '@material-ui/core/Paper';
import Fab from "@material-ui/core/Fab";
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import theme from '../theme/theme'
import compose from 'recompose/compose';


const styles = theme => ({
  avatar: {
    height: "75%",
    width: "75%"
  },
  detailContainer: {
    marginTop: theme.spacing.unit * 6,
  }
});

class BusinessProfileHeader extends Component {


  render() {
    const { classes } = this.props;
    const business = this.props.business.value

    return (

          <div mb="44px">
            <Grid container>
              <Grid item xs={4}>
                <Avatar className={classes.avatar}
                  src={business.imageUrl}
                />
              </Grid>
              <Grid className={classes.detailContainer} item xs={8}>
                <div mb="20px">
                  <Grid container alignItems="center">
                    <Typography variant="h4">
                      {business.name}
                    </Typography>
                  </Grid>
                </div>
                <div mb="20px">
                  <Grid container spacing={40}>
                    <Grid item>
                      <Typography variant="subtitle1">
                        <b>Email:</b> {business.email}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                      <b>Phone Number:</b> {business.phoneNumberPrimary}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                      <b>Website:</b> {business.website}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                      <b>Location:</b> {business.address.city} + {business.address.state}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
            <Typography variant="body1">
                {business.description}
                </Typography>
          </div>
    );
  }
}

BusinessProfileHeader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    business: PropTypes.object,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
};

const mapStateToProps = state => ({
        isLoading: state.business.isLoading,
        business: state.business,
        isError: state.business.isError,
        errorMessage: state.business.errorMessage 
    });

    export default compose(
        withStyles(styles),
        connect(mapStateToProps)
      )(BusinessProfileHeader);

