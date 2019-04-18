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
import { actionCreators as businessActionCreators } from "../store/Business";
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

class BusinessRequirementsCertificateList extends Component {

    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };


    componentWillMount() {
       // this.props.actions.getBusinessRequirementsCertificateDetailsByIds(["v2--LcXqGdRRcnrpQD9wC8d"])
    }

    render() {

        const business = this.props.business || []
        const { classes } = this.props;
        const { expanded } = this.state;

        let finalView = <div>yoyoyoyo</div>;

//         if (this.props.business == undefined) {

//             finalView = <ComponentLoadingIndicator />
//         } else {

//             finalView = <div className={classes.list}>
//                 <ListSubheader>
//                     <Typography variant="h6">
//                         yo
//   </Typography>
//                 </ListSubheader>
//                 {business.certificateDetails.map(certificate => (
//                     <div className={classes.listIem} key={certificate.id}>

//                         <ListItem>

//                             <ExpansionPanel expanded={expanded === certificate.id} onChange={this.handleChange(certificate.id)}>
//                                 <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//                                     <Avatar>
//                                         <LocalHospitalIcon />
//                                     </Avatar>
//                                     <Typography className={classes.heading}>{certificate.details.title}</Typography>
//                                     <Typography className={classes.secondaryHeading}> Type: {certificate.details.certificateType}</Typography>
//                                     <Typography className={classes.secondaryHeading}> Status: {certificate.status}</Typography>
//                                 </ExpansionPanelSummary>
//                                 <ExpansionPanelDetails>
//                                     <Typography>
//                                         {certificate.details.description}
//                                     </Typography>
//                                 </ExpansionPanelDetails>
//                                 <Divider />
//                                 <ExpansionPanelActions>
//                                     <Button size="small" color="primary">
//                                         Review Info
//           </Button>
//                                     <Button size="small" color="primary">
//                                         Save
//           </Button>
//                                 </ExpansionPanelActions>
//                             </ExpansionPanel>
//                         </ListItem>

//                     </div>
//                 ))}
//             </div>
//        }

        return (

            {finalView}

        );

    }
}

BusinessRequirementsCertificateList.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    business: PropTypes.object,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    actions: PropTypes.shape({
       // getBusinessRequirementsCertificateDetailsByIds: PropTypes.func.isRequired
    })
};

const mapStateToProps = state => ({
    isLoading: state.business.isLoading,
    business: state.business.value,
    isError: state.business.isError,
    errorMessage: state.business.errorMessage
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
              //  getBusinessRequirementsCertificateDetailsByIds: businessActionCreators.getBusinessRequirementsCertificateDetailsByIds
            },
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BusinessRequirementsCertificateList));