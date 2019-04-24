import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import PetsIcon from '@material-ui/icons/Pets';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  thirdHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    marginLeft: 35,
  },
  button: {
    size: "medium",
    color: 'inherit',
  },
  icon: {
    color: 'inherit',
    marginRight: 15
}
});

class BusinessSpeciesRequirementList extends React.Component {

  state = {
    expanded: null,
};

handleChange = panel => (event, expanded) => {
    this.setState({
        expanded: expanded ? panel : false,
    });
};

  handleNavigation = (requirement) => {
    this.props.actions.storeSelectedBusinessRequirementAction(requirement)
    this.props.history.push("/businessrequirementdetails");
  };

  render() {
    const { classes } = this.props;
    const business = this.props.business
    const requirements = this.props.business.requirements
    const { expanded } = this.state;

    var view;
    if (this.props.isLoading) {
      view = <ComponentLoadingIndicator />
    } else {
      view =             <div className={classes.root}>
      <Typography variant="h6">Requirements</Typography>
      {Object.keys(requirements).map(requirement => (
          <ExpansionPanel expanded={expanded === requirement} onChange={this.handleChange(requirement)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <PetsIcon className={classes.icon}/>
                  <Typography className={classes.heading}>{requirement}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                  <Typography>
                      {requirement.description}
                  </Typography>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
              <Button className={classes.button} onClick={() => { this.handleNavigation(requirements[requirement]) }}>More Info</Button>
              </ExpansionPanelActions>
          </ExpansionPanel>
      ))}
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

