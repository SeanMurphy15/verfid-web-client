import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { actionCreators as businessActionCreators } from "../store/Animal";
import Paper from '@material-ui/core/Paper';
import Fab from "@material-ui/core/Fab";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import theme from '../theme/theme'
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    card: {
        width: "100%",
      },
      media: {
        height: 50,
        width: 50,
      },
      subTitle : {
        marginBottom: 12
      }
});

class BusinessProfileHeader extends Component {


  render() {
    const { classes } = this.props;
    const business = this.props.business.value

    return (

        <Card className={classes.card}>
        <CardContent>
        <CardMedia
            className={classes.media}
            image={business.imageUrl}
            title={business.name}
          />
          <Typography variant="h5" component="h2">
            {business.name}
          </Typography>
          <Typography className={classes.subTitle} color="textSecondary">
          {business.address.city}
          </Typography>
          <Typography component="p">
            {business.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Run Animal Check</Button>
        </CardActions>
      </Card>
    );
  }
}

BusinessProfileHeader.propTypes = {
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

    export default compose(
        withStyles(styles),
        connect(mapStateToProps)
      )(BusinessProfileHeader);

