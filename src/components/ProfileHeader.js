import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import compose from 'recompose/compose';
import { connect } from 'react-redux';


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

class ProfileHeader extends Component {


  render() {
    const { classes } = this.props;
    const animal = this.props.animal

    return (

      <Card className={classes.card}>
      <CardContent>
      <CardMedia
          className={classes.media}
          image={animal.imageUrl}
          title={animal.name}
        />
        <Typography variant="h5" component="h2">
          {animal.name}
        </Typography>
        <Typography className={classes.subTitle} color="textSecondary">
        {animal.species}
        </Typography>
        <Typography component="p">
          {animal.note}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
    );
  }
}

ProfileHeader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    animal: PropTypes.object,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
};

const mapStateToProps = state => ({
        isLoading: state.animal.isLoading,
        animal: state.animal.value,
        isError: state.animal.isError,
        errorMessage: state.animal.errorMessage 
    });

    export default compose(
        withStyles(styles),
        connect(mapStateToProps)
      )(ProfileHeader);

