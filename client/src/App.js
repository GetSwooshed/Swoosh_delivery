import React, {Fragment} from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Profile from './views/Profile';
import MapView from './views/Map';
import Login from './views/Login'
import Marker from './views/Marker';

const App = () => (
<<<<<<< HEAD
  <>
    {/* <Navbar />
    <Switch>
      <AuthRoute exact path='/' component={() => <Redirect to="/profile" />} />
      <AuthRoute exact path='/profile' component={Profile} />
      <AuthRoute exact path='/map' component={MapView} />
      <Route exact path='/login' component={Login} />
    </Switch> */}
    <Marker />
  </>
=======
  <Switch>
    <AuthRoute exact path='/' component={() => <Redirect to="/profile" />} />
    <AuthRoute exact path='/profile' component={Profile} />
    <AuthRoute exact path='/map' component={MapView} />
    <Route exact path='/login' component={Login} />
  </Switch>
>>>>>>> acfd93411d939f038e23ae4206592f697d347e61
)

export default App;
