
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import  ComponentLoadingIndicator from "./components/ComponentLoadingIndicator"
// import  AnimalList from "./pages/AnimalList"
// import  AnimalDetails from "./pages/AnimalDetails"
// import  BusinessList from "./pages/BusinessList"
// import  BusinessDetails from "./pages/BusinessDetails"

const AnimalList = lazy(() => import('./pages/AnimalList'));
const AnimalDetails = lazy(() => import('./pages/AnimalDetails'));
const BusinessList = lazy(() => import('./pages/BusinessList'));
const BusinessDetails = lazy(() => import('./pages/BusinessDetails'));
// const SignIn = lazy(() => import('./pages/SignIn'));
// const SignUp = lazy(() => import('./pages/SignUp'));
// const Terms = lazy(() => import('./pages/Terms'));
// const Privacy = lazy(() => import('./pages/Privacy'));
// const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));

const AppRouter = () => (
      <Router>
                <Suspense fallback={<p>Loading...</p>}>
                <Switch>
                    <Route exact path={"/"} component={BusinessList} />
                    <Route exact path={"/animallist"} component={AnimalList} />
                    <Route exact path={"/animallist"} component={AnimalList} />
                    <Route exact path={"/animaldetails"} component={AnimalDetails} />
                    <Route exact path={"/businesslist"} component={BusinessList} />
                    <Route exact path={"/businessdetails"} component={BusinessDetails} />
                    </Switch>
            </Suspense>
        </Router>
  )
  
  export default AppRouter