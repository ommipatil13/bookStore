import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const {user} = isAuthenticated();

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        user && user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/admin/dashboard",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
