import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

import theme from '../theme/theme'
import compose from 'recompose/compose';
import ProfileHeader from '../components/ProfileHeader';
// import AnimalVaccinationList from '../components/AnimalVaccinationList';
// import AnimalCertificateList from '../components/AnimalCertificateList';
// import AnimalFormList from '../components/AnimalFormList';


const styles = theme => ({
  avatar: {
    height: "50%",
    width: "50%"
  },
  container: {
    marginTop: theme.spacing.unit * 6,
  }
});

class BusinessDetails extends Component {


  render() {
    const { classes } = this.props;
    const business = this.props.business
    let view;
    if(this.props.business == undefined){
        view = <p>Loading...</p>
    } else {
        view = <>
        <Paper className={classes.container}>
        {/* <ProfileHeader/> */}
        </Paper>
        <Paper className={classes.container}>
        {/* <BusinessCertificateList/> */}
        </Paper>
        <Paper className={classes.container}>
        {/* <BusinessVaccinationList/> */}
        </Paper>
        <Paper className={classes.container}>
        {/* <BusinessFormList/> */}
        </Paper>
        </>
    }

    return (

       <>{view}</>
    );
  }
}

BusinessDetails.propTypes = {
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
      )(BusinessDetails);

