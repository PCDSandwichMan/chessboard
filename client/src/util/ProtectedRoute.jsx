import React from "react";
// - Util
import { tokenIsValid } from "../util/helpers";
// - Http
import { Route, Redirect } from "react-router";

// - Redirect to home if missing login token or expired
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        token && tokenIsValid(token) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;
