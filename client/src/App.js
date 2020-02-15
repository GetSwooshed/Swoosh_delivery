import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import Profile from './views/Profile';
import MapView from './views/Map';
import Login from './views/Login'

const App = () => (
  <Switch>
    <AuthRoute exact path='/' component={Profile} />
    <AuthRoute exact path='/map' component={MapView} />
    <Route exact path='/login' component={Login} />
  </Switch>
)

export default App;
