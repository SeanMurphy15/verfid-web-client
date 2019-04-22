import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { actionCreators as animalsActionCreators } from "../store/Animals";


import {bindActionCreators} from 'redux';
import DataTable from "../components/DataTable"


class AnimalList extends Component {
 
  componentWillMount() {
    this.props.actions.getAnimalsByUserId("v1-LchQkgi7CoT-LyB2fKk")
    }
    
    render(){
  
        return (  <Paper>
          <DataTable data = {this.props.animals} dataType = {this.props.dataType}/>
     </Paper> );
    }
}

AnimalList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  animals: PropTypes.array,
  dataType: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  actions: PropTypes.shape({
    getAnimalsByUserId: PropTypes.func.isRequired
  })
};

const mapStateToProps = state => ({
  isLoading: state.animals.isLoading,
  animals: state.animals.value,
  dataType: state.animals.dataType,
  isError: state.animals.isError,
  errorMessage: state.animals.errorMessage 
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getAnimalsByUserId: animalsActionCreators.getAnimalsByUserId
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimalList);