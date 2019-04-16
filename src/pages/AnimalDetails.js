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
import ProfileHeader from '../components/ProfileHeader';
import AnimalVaccinationList from '../components/AnimalVaccinationList';
import AnimalCertificateList from '../components/AnimalCertificateList';
import AnimalFormList from '../components/AnimalFormList';


const styles = theme => ({
  avatar: {
    height: "50%",
    width: "50%"
  },
  detailContainer: {
    marginTop: theme.spacing.unit * 6,
  }
});

class AnimalDetails extends Component {


  render() {
    const { classes } = this.props;
    const animal = this.props.animal
    let view;
    if(this.props.animal == undefined){
        view = <p>Loading...</p>
    } else {
        view = <>
        <Paper>
        <ProfileHeader/>
        </Paper>
        <Paper>
        <AnimalCertificateList/>
        </Paper>
        <Paper>
        <AnimalVaccinationList/>
        </Paper>
        <Paper>
        <AnimalFormList/>
        </Paper>
        </>
    }

    return (

       <>{view}</>
    );
  }
}

AnimalDetails.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    animal: PropTypes.object,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
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
      )(AnimalDetails);

