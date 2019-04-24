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
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import { bindActionCreators } from 'redux';
import { ListSubheader, Link } from '@material-ui/core';

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

class AnimalCertificateList extends Component {

    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };


    render() {

        const certificates = this.props.animal.certificates
        const { classes } = this.props;
        const { expanded } = this.state;

        return (

            <div className={classes.root}>
                <Typography variant="h6">Certificates</Typography>
                {certificates.map(certificate => (
                    <ExpansionPanel expanded={expanded === certificate.id} onChange={this.handleChange(certificate.id)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <CardMembershipIcon className={classes.icon}/>
                            <Typography className={classes.heading}>{certificate.reference.title}</Typography>
                            <Typography className={classes.secondHeading}>{certificate.reference.subTitle}</Typography>
                            <Typography className={classes.thirdHeading}>{certificate.reference.type}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                {certificate.reference.description}
                            </Typography>
                        </ExpansionPanelDetails>
                        <Divider />
                        <ExpansionPanelActions>
                            <Button className={classes.button}> Check Status </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                ))}
            </div>
        );
    }
}

AnimalCertificateList.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    animal: PropTypes.object,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
};

const mapStateToProps = state => ({
    isLoading: state.animal.isLoading,
    animal: state.animal,
    isError: state.animal.isError,
    errorMessage: state.animal.errorMessage
});

export default connect(mapStateToProps)(withStyles(styles)(AnimalCertificateList));