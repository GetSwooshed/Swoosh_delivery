import React from 'react';
import { Route, Redirect } from "react-router-dom";
{/* <Route
    {...rest}
    render={props =>
      localStorage.user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  /> */}

const AuthRoute = ({ component: Component, ...rest }) => (
  
  <Route
    {...rest}
    render={props => <Component {...props} />}
  />
);

export default AuthRoute;