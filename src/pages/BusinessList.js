import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { actionCreators as businessesActionCreators } from "../store/Businesses";


import {bindActionCreators} from 'redux';
import DataTable from "../components/DataTable"


class BusinessList extends Component {
 
  componentWillMount() {
    this.props.actions.getBusinesses()
    }
    
    render(){
  
        return (  <Paper>
          <DataTable data = {this.props.businesses} dataType = {this.props.dataType}/>
     </Paper> );
    }
}

BusinessList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  businesses: PropTypes.array,
  dataType: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  actions: PropTypes.shape({
    getBusinesses: PropTypes.func.isRequired
  })
};

const mapStateToProps = state => ({
  isLoading: state.businesses.isLoading,
  businesses: state.businesses.value,
  dataType: state.businesses.dataType,
  isError: state.businesses.isError,
  errorMessage: state.businesses.errorMessage 
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getBusinesses: businessesActionCreators.getBusinesses
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessList);