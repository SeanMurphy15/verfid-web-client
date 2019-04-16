import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '../theme/custom-elements/TextField'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import RefreshIcon from '@material-ui/icons/Refresh';
import { actionCreators as vaccinationsActionCreators } from "../store/Vaccinations";
import * as formActions from '../actions/formActions';
import * as certificateActions from '../actions/certificateActions';
import ComponentLoadingIndicator from "./ComponentLoadingIndicator"
import { bindActionCreators } from 'redux';
import { ListSubheader, Link } from '@material-ui/core';

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
    }
});

class AnimalVaccinationList extends Component {

    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };


    componentWillMount() {
        this.props.actions.getVaccinationsByAnimalId("v2--LcXqGdRRcnrpQD9wC8d")
    }

    render() {

        const vaccinations = this.props.vaccinations || []
        const { classes } = this.props;
        const { expanded } = this.state;

        let finalView;

        if (this.props.isLoading) {

            finalView = <ComponentLoadingIndicator />
        } else {

            finalView = <div className={classes.list}>
                <ListSubheader>
                    <Typography variant="h6">
                        Vaccinations
  </Typography>
                </ListSubheader>
                {vaccinations.map(vaccination => (
                    <div className={classes.listIem} key={vaccination.id}>

                        <ListItem>

                            <ExpansionPanel expanded={expanded === vaccination.id} onChange={this.handleChange(vaccination.id)}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Avatar>
                                        <LocalHospitalIcon />
                                    </Avatar>
                                    <Typography className={classes.heading}>{vaccination.details.title}</Typography>
                                    <Typography className={classes.secondaryHeading}> Type: {vaccination.details.vaccinationType}</Typography>
                                    <Typography className={classes.secondaryHeading}> Status: {vaccination.status}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        {vaccination.details.description}
                                    </Typography>
                                </ExpansionPanelDetails>
                                <Divider />
                                <ExpansionPanelActions>
                                    <Button size="small" color="primary">
                                        Review Info
          </Button>
                                    <Button size="small" color="primary">
                                        Save
          </Button>
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                        </ListItem>

                    </div>
                ))}
            </div>
        }

        return (

            <>{finalView}</>

        );

    }
}

AnimalVaccinationList.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    vaccinations: PropTypes.array,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    actions: PropTypes.shape({
        getVaccinationsByAnimalId: PropTypes.func.isRequired
    })
};

const mapStateToProps = state => ({
    isLoading: state.vaccinations.isLoading,
    vaccinations: state.vaccinations.value,
    isError: state.vaccinations.isError,
    errorMessage: state.vaccinations.errorMessage
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                getVaccinationsByAnimalId: vaccinationsActionCreators.getVaccinationsByAnimalId
            },
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AnimalVaccinationList));