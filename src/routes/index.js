import React from "react";
import { Route, Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
// import PrivateOwnerRoute from "./PrivateOwnerRoute";
// import PrivateStaffRoute from "./PrivateStaffRoute";
// import StaffRoute from "./StaffRoute";
// import OwnerRoute from "./OwnerRoute";
// import NotFoundpage from "../components/NotFoundpage";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={PublicRoute} />
      {/* <PrivateOwnerRoute path="/owner" component={OwnerRoute} />
      <PrivateStaffRoute path="/staff" component={StaffRoute} /> */}
    </Switch>
  );
};

export default Routes;
