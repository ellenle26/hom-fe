import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateOwnerRoute = ({ ...rest }) => {
  const user = useSelector((state) => state.auth.user);
  if (user && user.authLevel === "owner") {
    console.log("abcdefg", user.authLevel);
    return <Route {...rest} />;
  }
  delete rest.component;
  return <Route {...rest} render={(props) => <Redirect to="/login" />} />;
};

export default PrivateOwnerRoute;
