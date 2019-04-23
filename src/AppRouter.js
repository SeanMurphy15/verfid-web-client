
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

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

const AppRouter = () => (
      <Router>
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
        </Router>
  )
  
  export default AppRouter