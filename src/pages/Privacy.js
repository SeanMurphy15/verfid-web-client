
import Markdown from 'markdown-to-jsx';
import { render } from 'react-dom';
import Typography from '@material-ui/core/Typography';
import { fetchPrivacyReferenceAction } from "../store/Privacy";
import ComponentLoadingIndicator from "../components/ComponentLoadingIndicator"
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
import { Document, Page, pdfjs} from 'react-pdf';

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

export class Privacy extends React.Component {

  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  componentWillMount() {
    this.props.actions.fetchPrivacyReferenceAction()
  }

  render() {
    
    const { pageNumber, numPages } = this.state;
    const { classes } = this.props;
    const privacy = this.props.privacy
    const isLoading = this.props.isLoading
    const isError = this.props.isError

    var view;

    if (isLoading == true) {
      view = <ComponentLoadingIndicator />
    } else if (isLoading == false && privacy == null) {
      view = <p>Empty...</p>
    } else if (isLoading == false && isError == true){
      view = <p>{this.props.errorMessage}</p>
    } else {
      view = <Paper>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Privacy
      </Typography>
      <Document
          file="https://firebasestorage.googleapis.com/v0/b/verfid-services-database-dev.appspot.com/o/verfid-business-associate-agreement-sean-murphy-signed.pdf?alt=media&token=6944475a-5b80-492a-bc0c-a9b203a44ed6"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
    </Paper>
    }

    return (
      <>{view}</>
    )
  }
}

Privacy.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  privacy: PropTypes.object,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  actions: PropTypes.shape({
    fetchPrivacyReferenceAction: PropTypes.func.isRequired
  })
};

const mapStateToProps = state => ({
  isLoading: state.privacy.isLoading,
  privacy: state.privacy.value,
  isError: state.privacy.isError,
  errorMessage: state.privacy.errorMessage
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchPrivacyReferenceAction: fetchPrivacyReferenceAction
      },
      dispatch
    )
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Privacy);


 
