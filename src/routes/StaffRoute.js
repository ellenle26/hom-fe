import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Tabs } from "antd";
import BookAtCounter from "../containers/staff/BookAtCounter";
import RoomStatus from "../containers/staff/RoomStatus";
import NavBar from "../containers/NavBar";
import Footer from "../components/Footer";

const StaffRoute = () => {
  const history = useHistory();
  const { TabPane } = Tabs;
  const callback = (key) => {
    history.push(`/staff/${key}`);
  };
  return (
    <>
      <NavBar />
      <Tabs
        defaultActiveKey="profile"
        onChange={callback}
        centered
        style={{ marginTop: "20px" }}
      >
        <TabPane tab="Bookings" key="bookings"></TabPane>
        <TabPane tab="Rooms" key="rooms"></TabPane>
      </Tabs>
      <Switch>
        <Route exact path="/staff/bookings" component={BookAtCounter} />
        <Route exact path="/staff/rooms" component={RoomStatus} />
      </Switch>
      <Footer />
    </>
  );
};

export default StaffRoute;
