
import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import AppNavigation from './components/AppNavigation';
import AppFooter from './components/AppFooter';
import { connect } from 'react-redux';
import withRoot from './theme/withRoot'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const AnimalList = lazy(() => import('./pages/AnimalList'));
const AnimalDetails = lazy(() => import('./pages/AnimalDetails'));
const BusinessList = lazy(() => import('./pages/BusinessList'));
const BusinessRequirementList = lazy(() => import('./pages/BusinessRequirementList'));
const BusinessRequirementDetails = lazy(() => import('./pages/BusinessRequirementDetails'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  appContent: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    padding: '48px 36px 0',
    background: '#eaeff1',
    flexDirection: 'column',
    marginTop: "64px"
  }
});

class App extends React.Component {
  
  render() {
    
    const { classes } = this.props;

    return (            

        <div className={classes.root}>
              <Router>
          <AppNavigation/>
          <div className={classes.appContent}>
            <main className={classes.mainContent}>
            <Suspense fallback={<p>Loading...</p>}>
                <Switch>
                    <Route exact path={"/"} component={AnimalList} />
                    <Route exact path={"/signin"} component={SignIn} />
                    <Route exact path={"/signup"} component={SignUp} />
                    <Route exact path={"/terms"} component={Terms} />
                    <Route exact path={"/privacy"} component={Privacy} />
                    <Route exact path={"/forgotpassword"} component={ForgotPassword} />
                    <Route exact path={"/animallist"} component={AnimalList} />
                    <Route exact path={"/animaldetails"} component={AnimalDetails} />
                    <Route exact path={"/businesslist"} component={BusinessList} />
                    <Route exact path={"/businessrequirementlist"} component={BusinessRequirementList} />
                    <Route exact path={"/businessrequirementdetails"} component={BusinessRequirementDetails} />
                    </Switch>
            </Suspense>
            <AppFooter />
            </main>
          </div>
          </Router>
        </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(state => state)
)(withRoot(App));