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
import { actionCreators as animalActionCreators } from "../store/Animal";
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

class ProfileHeader extends Component {


  render() {
    const { classes } = this.props;
    const animal = this.props.animal

    return (

          <div mb="44px">
            <Grid container>
              <Grid item xs={4}>
                <Avatar className={classes.avatar}
                  src={animal.imageUrl}
                />
              </Grid>
              <Grid className={classes.detailContainer} item xs={8}>
                <div mb="20px">
                  <Grid container alignItems="center">
                    <Typography variant="h4">
                      {animal.name}
                    </Typography>
                  </Grid>
                </div>
                <div mb="20px">
                  <Grid container spacing={40}>
                    <Grid item>
                      <Typography variant="subtitle1">
                        <b>Age:</b> {animal.age}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                      <b>Gender:</b> {animal.gender}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                      <b>Breed:</b> {animal.breed}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                      <b>Color:</b> {animal.color}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                <Typography variant="subtitle1">
                <b>Owned since:</b> {animal.ownedSince}
                </Typography>
                <Typography variant="subtitle1">
                <b>Last Edited:</b> {animal.lastEditDate}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="body1">
                {animal.note}
                </Typography>
          </div>
    );
  }
}

ProfileHeader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    animal: PropTypes.object,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    // actions: PropTypes.shape({
    //   getAnimalById: PropTypes.func.isRequired
    // })
};

const mapStateToProps = state => ({
        isLoading: state.animal.isLoading,
        animal: state.animal.value,
        isError: state.animal.isError,
        errorMessage: state.animal.errorMessage 
    });

    export default compose(
        withStyles(styles),
        connect(mapStateToProps)
      )(ProfileHeader);

