import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import ComponentLoadingIndicator from "../components/ComponentLoadingIndicator"

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
  container: {
    marginTop: theme.spacing.unit * 6,
  }
});

class AnimalDetails extends Component {


  render() {
    const { classes } = this.props;
    const animal = this.props.animal
    var view;
    if(this.props.isLoading){
        view = <ComponentLoadingIndicator />
    } else {
        view = <>
        <Paper className={classes.container}>
        <ProfileHeader/>
        </Paper>
        <Paper className={classes.container}>
        <AnimalCertificateList/>
        </Paper>
        <Paper className={classes.container}>
        <AnimalVaccinationList/>
        </Paper>
        <Paper className={classes.container}>
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
        animal: state.animal,
        isError: state.animal.isError,
        errorMessage: state.animal.errorMessage 
    });

    export default compose(
        withStyles(styles),
        connect(mapStateToProps)
      )(AnimalDetails);

