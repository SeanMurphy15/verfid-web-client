import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

import theme from '../theme/theme'
import compose from 'recompose/compose';
import ComponentLoadingIndicator from "../components/ComponentLoadingIndicator"
import { storeSelectedBusinessRequirementAction } from "../store/Business";
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

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

class BusinessSpeciesRequirementList extends React.Component {


  handleListItemClick = (event, requirement) => {
    this.props.actions.storeSelectedBusinessRequirementAction(requirement)
    this.props.history.push("/businessrequirementdetails");
  };

  render() {
    const { classes } = this.props;
    const business = this.props.business
    const requirements = this.props.business.requirements

    var view;
    if (this.props.isLoading) {
      view = <ComponentLoadingIndicator />
    } else {
      view = <div className={classes.root}>
        <List>
          {Object.keys(requirements).map(
            species => (
              <ListItem
                button
                onClick={event => this.handleListItemClick(event, requirements[species])}
              >
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText primary={species}/>
              </ListItem>
            ),
            this,
          )}
        </List>
      </div>
    }

    return (

      <>{view}</>
    );
  }
}

BusinessSpeciesRequirementList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  business: PropTypes.object,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  actions: PropTypes.shape({
    storeSelectedBusinessRequirementAction: PropTypes.func.isRequired
  })
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
        storeSelectedBusinessRequirementAction: storeSelectedBusinessRequirementAction
      },
      dispatch
    )
  };
};
export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(BusinessSpeciesRequirementList));

