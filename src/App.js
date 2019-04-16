
import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from './components/Navigator';
import Header from './components/Header';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import withRoot from './theme/withRoot'
import theme from './theme/theme'

const AnimalList = lazy(() => import('./pages/AnimalList'));
const AnimalDetails = lazy(() => import('./pages/AnimalDetails'));
const BusinessList = lazy(() => import('./pages/BusinessList'));
const BusinessDetails = lazy(() => import('./pages/BusinessDetails'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));


const drawerWidth = 256;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    padding: '48px 36px 0',
    background: '#eaeff1',
  },
};

class App extends React.Component {
  
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    
    const { classes } = this.props;

    return (
        <div className={classes.root}>
          <CssBaseline />
          <nav className={classes.drawer}>
            <Hidden smUp implementation="js">
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
              />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Navigator PaperProps={{ style: { width: drawerWidth } }} />
            </Hidden>
          </nav>
          <div className={classes.appContent}>
            <Header onDrawerToggle={this.handleDrawerToggle} />
            <main className={classes.mainContent}>
            <Router>
                    <Suspense fallback={<div>Loading....</div>}>
                        <div className="App">
                            <div>
                                <Switch>
                                    <Route exact path="/">
                                        <AnimalList />
                                    </Route>
                                    <Route exact path="/animaldetails">
                                        <AnimalDetails />
                                    </Route>
                                    <Route exact path="/businesslist">
                                        <BusinessList />
                                    </Route>
                                    <Route exact path="/businessdetails">
                                        <BusinessDetails />
                                    </Route>
                                    <Route exact path="/signup">
                                        <SignUp/>
                                    </Route>
                                    <Route exact path="/signin">
                                        <SignIn/>
                                    </Route>
                                    <Route exact path="/privacy">
                                        <Privacy/>
                                    </Route>
                                    <Route exact path="/terms">
                                        <Terms />
                                    </Route>
                                    <Route exact path="/forgotpassword">
                                        <ForgotPassword />
                                    </Route>
                                    <Redirect to="/" />
                                </Switch>
                            </div>
                        </div>
                    </Suspense>
                </Router>
            </main>
          </div>
        </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));