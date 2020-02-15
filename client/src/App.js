import React, {Fragment} from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import Navbar from './components/Navbar';
import Profile from './views/Profile';
import MapView from './views/Map';
import Login from './views/Login'

const App = () => (
  <>
    <Navbar />
    <Switch>
      <AuthRoute exact path='/' component={() => <Redirect to="/profile" />} />
      <AuthRoute exact path='/profile' component={Profile} />
      <AuthRoute exact path='/map' component={MapView} />
      <Route exact path='/login' component={Login} />
    </Switch>
  </>
)

export default App;
