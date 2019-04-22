import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

import theme from '../theme/theme'
import compose from 'recompose/compose';
import ProfileHeader from '../components/ProfileHeader';
// import AnimalVaccinationList from '../components/AnimalVaccinationList';
 import BusinessRequirementsCertificateList from '../components/BusinessRequirementsCertificateList';
// import AnimalFormList from '../components/AnimalFormList';
import ComponentLoadingIndicator from "../components/ComponentLoadingIndicator"
import { fetchBusinessByIdAction } from "../store/Business";
import { bindActionCreators } from 'redux';


const styles = theme => ({
  avatar: {
    height: "50%",
    width: "50%"
  },
  container: {
    marginTop: theme.spacing.unit * 6,
  }
});

class BusinessDetails extends React.Component {


  render() {
    const { classes } = this.props;
    const business = this.props.business
    var view;
    if(this.props.isLoading){
        view = <ComponentLoadingIndicator />
    } else {
        view = <>
        <Paper className={classes.container}>
        {/* <ProfileHeader/> */}
        <p>POOOOOOOOOOPPP</p>
        </Paper>
        <Paper className={classes.container}>
        {/* <BusinessRequirementsCertificateList/> */}
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
   
    const mapDispatchToProps = dispatch => {
      return {
          actions: bindActionCreators(
              {
                  fetchBusinessByIdAction: fetchBusinessByIdAction
              },
              dispatch
          )
      };
  };
    export default compose(
        withStyles(styles),
        connect(mapStateToProps, mapDispatchToProps)
      )(BusinessDetails);

