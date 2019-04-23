import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

import theme from '../theme/theme'
import compose from 'recompose/compose';
 import BusinessCertificateList from '../components/BusinessCertificateList';
 import BusinessVaccinationList from '../components/BusinessVaccinationList';
 import BusinessFormList from '../components/BusinessFormList';
import ComponentLoadingIndicator from "../components/ComponentLoadingIndicator"
import { fetchBusinessByIdAction } from "../store/Business";
import { bindActionCreators } from 'redux';
import BusinessProfileHeader from '../components/BusinessProfileHeader';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  avatar: {
    height: "50%",
    width: "50%"
  },
  container: {
    marginTop: theme.spacing.unit * 6,
  }
});

class BusinessRequirementDetails extends React.Component {

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const business = this.props.business

    var view;
    if(this.props.isLoading){
        view = <ComponentLoadingIndicator />
    } else {
        view = <>
        <Paper className={classes.container}>
        <BusinessProfileHeader/>
        </Paper>
        <Paper className={classes.container}>
        <BusinessCertificateList/>
        </Paper>
        <Paper className={classes.container}>
        <BusinessVaccinationList/>
        </Paper>
        <Paper className={classes.container}>
        <BusinessFormList/>
        </Paper>
        </>
    }

    return (

       <>{view}</>
    );
  }
}

BusinessRequirementDetails.propTypes = {
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
      )(BusinessRequirementDetails);
