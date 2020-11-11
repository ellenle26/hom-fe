import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../components/HomePage";
import NotFoundpage from "../components/NotFoundpage";
import LoginPage from "../containers/LoginPage";
import SignupPage from "../containers/SignupPage";
import PrivateRoute from "./PrivateRoute";
import MePage from "../containers/MePage";
import PrivateOwnerRoute from "./PrivateOwnerRoute";
import PrivateStaffRoute from "./PrivateStaffRoute";
import OwnerRoute from "./OwnerRoute";
import StaffRoute from "./StaffRoute";
import RoomList from "../containers/RoomList";
import BookingPage from "../containers/BookingPage";
import EventPage from "../containers/EventPage";
import AboutUs from "../components/AboutUs";

const PublicRoute = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={SignupPage} />
      <Route exact path="/rooms" component={RoomList} />
      <Route exact path="/events" component={EventPage} />
      <Route exact path="/about" component={AboutUs} />
      <PrivateRoute exact path="/bookings/user" component={BookingPage} />
      <PrivateRoute exact path="/me" component={MePage} />
      <PrivateOwnerRoute path="/owner" component={OwnerRoute} />
      <PrivateStaffRoute path="/staff" component={StaffRoute} />
      <Route component={NotFoundpage} />
    </Switch>
  );
};

export default PublicRoute;
