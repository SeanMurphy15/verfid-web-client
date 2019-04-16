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
import { actionCreators as formsActionCreators } from "../store/Forms";
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

class AnimalFormList extends Component {

    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };


    componentWillMount() {
        this.props.actions.getFormsByAnimalId("v2--LcXqGdRRcnrpQD9wC8d")
    }

    render() {

        const forms = this.props.forms || []
        const { classes } = this.props;
        const { expanded } = this.state;

        let finalView;

        if (this.props.isLoading) {

            finalView = <ComponentLoadingIndicator />
        } else {

            finalView = <div className={classes.list}>
                <ListSubheader>
                    <Typography variant="h6">
                        Forms
  </Typography>
                </ListSubheader>
                {forms.map(form => (
                    <div className={classes.listIem} key={form.id}>

                        <ListItem>

                            <ExpansionPanel expanded={expanded === form.id} onChange={this.handleChange(form.id)}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Avatar>
                                        <LocalHospitalIcon />
                                    </Avatar>
                                    <Typography className={classes.heading}>{form.details.title}</Typography>
                                    <Typography className={classes.secondaryHeading}> Type: {form.details.formType}</Typography>
                                    <Typography className={classes.secondaryHeading}> Status: {form.status}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        {form.details.description}
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

AnimalFormList.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    forms: PropTypes.array,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    actions: PropTypes.shape({
        getFormsByAnimalId: PropTypes.func.isRequired
    })
};

const mapStateToProps = state => ({
    isLoading: state.forms.isLoading,
    forms: state.forms.value,
    isError: state.forms.isError,
    errorMessage: state.forms.errorMessage
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                getFormsByAnimalId: formsActionCreators.getFormsByAnimalId
            },
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AnimalFormList));