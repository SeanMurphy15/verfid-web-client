import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

import compose from 'recompose/compose';
import ComponentLoadingIndicator from "../components/ComponentLoadingIndicator"
import { fetchAnimalByIdAction } from "../store/Animal";
import { fetchAnimalsByUserIdAction } from "../store/Animals";
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ListSubheader, Link } from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';

const styles = theme => ({
  list: {
      width: '100%',
      height: '100%'
  },
  listItem: {
      display: 'inline',
  },
  root: {
      width: '100%',
  },
  heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
      lineHeight: 2.5,
      paddingLeft: 5,

  },
  secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
  },
  button : {
    color : 'inherit',
    size: "small"
  }
});

class AnimalList extends React.Component {

  state = {
    expanded: null,
};

  handleListItemClick = (event, id) => {
    this.props.actions.fetchAnimalByIdAction(id)
    this.props.history.push("/animaldetails");
  };

  componentWillMount(){

    this.props.actions.fetchAnimalsByUserIdAction("v1-LchQkgi7CoT-LyB2fKk")
  }

handleChange = panel => (event, expanded) => {
    this.setState({
        expanded: expanded ? panel : false,
    });
};

handleNavigation(id) {
  this.props.actions.fetchAnimalByIdAction(id)
  this.props.history.push("/animaldetails");
};

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    const animals = this.props.animals || []
    

    var view;
    if (this.props.isLoading) {
      view = <ComponentLoadingIndicator />
    } else {
      view =  <List className={classes.list}>
      <ListSubheader>
          <Typography variant="h6">
              Animals
</Typography>
      </ListSubheader>
      {animals.map(animal => (

              <ListItem className={classes.listIem} >

                  <ExpansionPanel expanded={expanded === animal.id} onChange={this.handleChange(animal.id)}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Avatar alt="animalImage" src={animal.imageUrl} />

                          <Typography className={classes.heading}>{animal.name}</Typography>
                          <Typography className={classes.secondaryHeading}> Breed: {animal.breed}</Typography>
                          <Typography className={classes.secondaryHeading}> Gender: {animal.gender}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                          <Typography>
                              {animal.note}
                          </Typography>
                      </ExpansionPanelDetails>
                      <Divider />
                      <ExpansionPanelActions>
                          <Button className={classes.button} onClick={() => { this.handleNavigation(animal.id) }}>Review Info</Button>
                      </ExpansionPanelActions>
                  </ExpansionPanel>
              </ListItem>
      ))}
  </List>
    }

    return (

      <>{view}</>
    );
  }
}

AnimalList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  animals: PropTypes.array,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  actions: PropTypes.shape({
    fetchAnimalByIdAction: PropTypes.func.isRequired,
    fetchAnimalsByUserIdAction: PropTypes.func.isRequired

  })
};

const mapStateToProps = state => ({
  isLoading: state.animal.isLoading,
  animals: state.animals.value,
  isError: state.animal.isError,
  errorMessage: state.animal.errorMessage
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchAnimalByIdAction: fetchAnimalByIdAction,
        fetchAnimalsByUserIdAction: fetchAnimalsByUserIdAction
      },
      dispatch
    )
  };
};
export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(AnimalList));

