import React, {Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import Profile from './views/Profile';
import Login from './views/Login'

class Router extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <AuthRoute exact path='/' component={Profile} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </Fragment>
    )
  }
}

export default Router