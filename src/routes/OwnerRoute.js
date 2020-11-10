import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import OwnerPage from "../containers/owner/OwnerPage";
import RoomsPage from "../containers/owner/RoomsPage";
import AddRoomPage from "../containers/owner/AddRoomPage";
import BookingStatus from "../containers/owner/BookingStatus";
import EventManagement from "../containers/owner/EventManagement";
import AddEventPage from "../containers/owner/AddEventPage";
import GeneralPage from "../containers/owner/GeneralPage";
import { Tabs } from "antd";
import NavBar from "../containers/NavBar";

const StaffRoute = () => {
  const history = useHistory();
  const { TabPane } = Tabs;
  const callback = (key) => {
    history.push(`/owner/${key}`);
  };
  return (
    <>
      <NavBar />
      <Tabs
        defaultActiveKey="users"
        onChange={callback}
        centered
        style={{ marginTop: "20px" }}
      >
        <TabPane tab="User" key="users"></TabPane>
        <TabPane tab="Rooms" key="rooms"></TabPane>
        <TabPane tab="Events" key="events"></TabPane>
        <TabPane tab="Bookings" key="bookings"></TabPane>
        <TabPane tab="General" key="general"></TabPane>
      </Tabs>
      <Switch>
        <Route exact path="/owner/users" component={OwnerPage} />
        <Route exact path="/owner/rooms" component={RoomsPage} />
        <Route exact path="/owner/rooms/add" component={AddRoomPage} />
        <Route exact path="/owner/bookings" component={BookingStatus} />
        <Route exact path="/owner/events" component={EventManagement} />
        <Route exact path="/owner/events/add" component={AddEventPage} />
        <Route exact path="/owner/general" component={GeneralPage} />
      </Switch>
    </>
  );
};

export default StaffRoute;
